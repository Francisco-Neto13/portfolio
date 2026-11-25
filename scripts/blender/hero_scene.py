"""
Cena do hero: um setup de mesa (mesa, monitor, teclado, mouse, luminária, PC) com um roteiro de câmera.

Roteiro (240 frames):
  1-30     entrada automática: a cena em penumbra, a luminária acende, as fans ligam, a câmera se aproxima
  31-75    a câmera vai até a luminária e passa rente à cúpula acesa
  76-120   desce à mesa: o teclado de perto, depois o mouse
  121-165  sobe para o PC: o vidro e as fans de perto, contornando o gabinete
  166-190  vira e centraliza no monitor (a tela acende)
  191-240  mergulha na tela até ela ocupar o quadro inteiro (último frame sem bordas)

A tela mostra assets/screen.png: a seção que vem depois do hero, para o mergulho emendar nela.
Modelos importados (créditos em docs/hero-3d-plan.md; as pastas ficam fora do git):
  assets/pc/        "PC [model]" de Meilov, Sketchfab Standard (renderizar sim, redistribuir não)
  assets/keyboard/  "Mechanical keyboard" de virtualtimecapsule, CC-BY-4.0
  assets/mouse/     "Razer Mouse" de Fred Drabble, CC-BY-4.0

Dois temas, mesma câmera: o escuro (padrão: à noite, as luzes acendem) e o claro (`--light`:
o dia clareia, a persiana abre). Com `--light`, as saídas vão para as pastas com sufixo -light.

Teste (frames-chave em baixa resolução, em renders/test/):
  blender -b -P scripts/blender/hero_scene.py -- --test
Versão intermediária (todos os frames em 1280x720, WebP, em renders/preview/):
  blender -b -P scripts/blender/hero_scene.py -- --preview
Render completo (em renders/frames/):
  blender -b -P scripts/blender/hero_scene.py
Para abrir a cena e ajustar à mão:
  blender -P scripts/blender/hero_scene.py -- --open
"""

import math
import os
import sys

import bpy
import numpy as np
from mathutils import Matrix, Vector

# ---------------------------------------------------------------------------------------------
# Parâmetros
# ---------------------------------------------------------------------------------------------

# Paleta do site (styles/palettes.css).
BG = "#08060f"
# O AgX muda os tons: esta é a cor linear que sai exatamente #08060f na imagem final.
# Medida renderizando o fundo e corrigindo até o pixel bater. Se trocar BG, meça de novo.
BG_AGX = (0.004799, 0.003223, 0.008107)
WALL = "#120d20"           # parede: só aparece onde a luz bate; no escuro, vira BG
DESK = "#1c1531"           # tampo
DESK_EDGE = "#0e0a1a"      # pés e laterais
DEVICE = "#17121f"         # monitor, base, teclado
METAL = "#2a2340"          # luminária
VIOLET = "#8b5cf6"         # --light-violet
MAGENTA = "#d946ef"        # --light-magenta
ACCENT = "#c4b5fd"         # --color-accent
LAMP_LIGHT = "#fff1e4"     # luz da luminária: branco levemente quente, o contraste com o roxo

FRAMES = 240
# Final (o que vai para o site): nítido nas telas de notebook e desktop sem pesar a página.
# 1600x900 a 78% deu 6 MB nos 240 frames; 1920x1080 passaria de 11 MB com pouco ganho visível
# (a cena já tem profundidade de campo). Mais amostras = menos granulado = arquivos menores.
RESOLUTION = (1600, 900)
SAMPLES = 40               # amostras do EEVEE no render final
FILE_FORMAT = "WEBP"       # final e preview: WEBP; o teste sai em PNG
WEBP_QUALITY = 78

TEST_FRAME_LIST = (1, 30, 60, 100, 140, 180, 210, 240)
TEST_RESOLUTION = (640, 360)
TEST_SAMPLES = 16

# Versão intermediária para testar no site: todos os frames, menor e mais rápida que a final.
PREVIEW_RESOLUTION = (1280, 720)
PREVIEW_SAMPLES = 24

DESK_SIZE = (3.0, 1.0)     # largo e fundo o bastante para as bordas e os pés ficarem fora do quadro

# Linha do tempo, em frames.
INTRO_END = 30             # 1-30 tocam sozinhos no carregamento
LAMP_ON = (6, 18)          # a luminária liga (com uma piscada no começo)
RGB_ON = (12, 28)          # fans, RGB do PC, teclado, mouse e a fita de luz atrás do monitor
SCREEN_ON = (168, 188)     # a tela sai do standby quando a câmera vira para o monitor

# Câmera: (frame, posição da câmera, ponto para onde ela olha). Entre os pontos, curvas suaves.
# O último plano (o mergulho que termina na tela cheia) é calculado em dive_end().
LENS_MM = 35
FSTOP = 2.8                # foco acompanha o ponto observado: fundo suave nos planos fechados
SHOTS = [
    (1, (-0.55, -1.25, 0.62), (0.12, 0.15, 0.28)),     # penumbra: o conjunto inteiro, já de perto
    (30, (-0.45, -1.02, 0.56), (0.08, 0.15, 0.30)),    # fim da entrada: leve aproximação
    (52, (-0.80, -0.46, 0.60), (-0.52, 0.16, 0.50)),   # indo para a luminária
    (70, (-0.72, -0.18, 0.46), (-0.50, 0.20, 0.54)),   # a cúpula acesa de perto
    (86, (-0.42, -0.50, 0.24), (-0.05, -0.13, 0.03)),  # descendo para a mesa
    (100, (-0.30, -0.40, 0.12), (0.0, -0.15, 0.02)),   # o teclado de perto, rente às teclas
    (112, (0.08, -0.40, 0.10), (0.25, -0.14, 0.02)),   # desliza pelo teclado até o mouse
    (126, (0.30, -0.42, 0.28), (0.72, 0.16, 0.24)),    # sobe e segue para o PC
    (142, (0.42, -0.12, 0.32), (0.85, 0.22, 0.24)),    # o vidro e as fans de perto
    (158, (0.62, -0.28, 0.36), (0.85, 0.22, 0.24)),    # contorna o PC
    (175, (0.32, -0.88, 0.44), (0.04, 0.18, 0.36)),    # vira para o monitor
    (190, (0.04, -0.98, 0.38), (0.0, 0.186, 0.36)),    # centralizado: o monitor inteiro no quadro
    (215, (0.02, -0.72, 0.37), (0.0, 0.186, 0.36)),    # começa o mergulho
]
SCREEN_FILL = 0.99         # último frame: o quadro mostra 99% da largura da tela (sem bordas)

LAMP_POWER = 70            # W no pico
SHADE_GLOW = 0.12          # W da luz dentro da cúpula: só um reflexo, mais que isso vira disco branco
RIM_POWER = 6              # rim light roxa por trás: desenha os contornos na penumbra
FILL_POWER = 3             # luz fraca da frente: a cena já aparece antes de acender

# Tela: em standby, um brilho roxo mínimo; ligada, o print da próxima seção.
SCREEN_W = 0.66
SCREEN_H = SCREEN_W * 9 / 16   # 16:9, igual ao print: no fim, o quadro mostra a imagem sem distorcer
SCREEN_STANDBY = "#0f0b1d"
SCREEN_BRIGHTNESS = 1.4    # o AgX comprime os claros: 1,0 deixa o print apagado

# PC à direita do monitor, com o vidro virado para a câmera.
PC_POSITION = (0.85, 0.22) # centro da base sobre a mesa (x, y)
PC_YAW = 125               # graus: no modelo, o vidro fica no +Y; com 125, ele encara a frente da mesa
PC_HEIGHT = 0.46           # m
PC_DROP = ("platform", "Pc_wire")  # base de exposição e cabo de força do modelo: fora da cena
PC_CASE = "#0c0a10"        # preto fosco
PC_GLASS = "#2a2438"       # vidro levemente fumê
PC_RGB = VIOLET            # todo o RGB usa a cor da fita de luz atrás do monitor
PC_RGB_STRENGTH = 2.0      # faixas, pump e memórias: quanto mais forte, mais o AgX dessatura para lavanda
PC_FAN_STRENGTH = 1.0      # fans: plástico escuro + emissão moderada = anel roxo com as pás visíveis
PC_FAN_BASE = "#2a2438"
PC_GLOW_POWER = 6          # W da luz dentro do gabinete: o RGB refletindo na mesa
PC_WALL_POWER = 4          # W da luz que sobe do topo do gabinete para a parede

# Teclado (fotogrametria rosa com adesivos embaixo): endireitado pela própria malha, escurecido
# para a paleta, com um brilho RGB por baixo das teclas.
KEYBOARD_POSITION = (0.0, -0.16)
KEYBOARD_LENGTH = 0.30     # m (teclado 60%)
KEYBOARD_FLIP = False      # True gira 180°: use se a barra de espaço sair virada para o monitor
KEYBOARD_SATURATION = 0.25 # 1 = rosa original; baixo = cinza com as legendas ainda legíveis
KEYBOARD_VALUE = 0.32      # brilho da textura
KEYBOARD_GLOW = 4.0        # força da retroiluminação RGB entre as teclas
# O fundo entre as teclas não é plano: o teclado tem perfil inclinado. Medido fileira por fileira,
# ele sobe de ~19,5 mm na frente a ~26,8 mm atrás (acima da base): 22,6 mm no centro, +0,1 m por m.
# A luz acende até BAND_FULL acima desse fundo e apaga até BAND_END (os topos ficam ~10 mm acima).
KEYBOARD_FLOOR = 0.0226    # m acima da base, no centro do teclado
KEYBOARD_FLOOR_SLOPE = 0.1 # m de altura por m em direção ao fundo (trás)
KEYBOARD_BAND_FULL = 0.0015
KEYBOARD_BAND_END = 0.006
KEYBOARD_RIM = 0.009       # m: largura da borda da carcaça, que não acende (senão vira uma faixa por fora)
KEYCAP_MIN_HEIGHT = 0.006  # m acima do fundo: daí para cima é topo de tecla (separa uma tecla da outra)
KEYCAP_MAX_FIX = 0.004     # m: correção máxima por tecla (a fotogrametria errou até ~3 mm)

# Mouse: sem o cabo (wireless), com o anel da roda na cor do RGB.
MOUSE_POSITION = (0.25, -0.15)
MOUSE_LENGTH = 0.125       # m
MOUSE_DROP = ("Box001_08",)  # o cabo
MOUSE_GLOW = 3.0

DESK_MAT_Z = 0.003         # topo do mousepad

# Bloom suave nas luzes (nó Glare do compositor).
GLARE_THRESHOLD = 0.8
GLARE_STRENGTH = 0.35
GLARE_SIZE = 0.6

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
# Print da seção depois do hero, 1920x1080, tema escuro, sem o header (ele fica por cima no site).
SCREEN_IMAGE = os.path.join(ROOT, "scripts", "blender", "assets", "screen.png")
PC_MODEL = os.path.join(ROOT, "scripts", "blender", "assets", "pc", "scene.gltf")
KEYBOARD_MODEL = os.path.join(ROOT, "scripts", "blender", "assets", "keyboard", "scene.gltf")
MOUSE_MODEL = os.path.join(ROOT, "scripts", "blender", "assets", "mouse", "scene.gltf")
OUT_TEST = os.path.join(ROOT, "renders", "test")
OUT_PREVIEW = os.path.join(ROOT, "renders", "preview")
OUT_FINAL = os.path.join(ROOT, "renders", "frames")

# Tema da cena. O escuro é o padrão (os valores acima); `-- --light` aplica LIGHT por cima deles.
THEME = "dark"
VIEW_TRANSFORM = "AgX"     # no escuro, segura as luzes fortes; no claro, "Standard" dá branco de verdade
WORLD = BG_AGX             # fundo e luz ambiente do mundo
FILL_COLOR = ACCENT
WALL_EMISSION = BG_AGX     # no escuro, a parede sem luz vira o fundo do site; no claro, não emite
DESK_MAT = "#140f22"
BULB_GLOW = 14             # emissão da lâmpada acesa
RGB_SCALE = 1.0            # multiplica o RGB do PC, teclado e mouse
LED_SCALE = 1.0            # multiplica a fita de luz atrás do monitor
DAYLIGHT = False           # sol entrando pela persiana (só no claro)

# Modo claro: "o dia clareia". Mesma câmera e mesmo tempo; a entrada é a persiana abrindo.
SUN_DIRECTION = (0.8, 0.35, -0.5)  # de onde para onde a luz anda: da esquerda, do alto, pela frente
SUN_COLOR = "#fff3e3"
SUN_STRENGTH = 3.2         # no Standard, a parede clara ao sol chega perto do branco sem estourar
SUN_ANGLE = 1.5            # graus: tamanho aparente do sol (listras da persiana nítidas)
SKY = (0.92, 0.92, 0.96)   # céu (linear): luz ambiente quase neutra (azulada demais lavava a cena)
SKY_STRENGTH = (0.06, 0.32)  # de manhã cedo (persiana fechada) para o dia aberto; o sol manda
BLINDS_OPEN = (4, 26)      # frames em que as lâminas giram
BLINDS_ANGLE = (0, 72)     # graus: fechada (bloqueia o sol) para aberta (listras de luz)
BLINDS_DISTANCE = 2.4      # m antes da mesa, no caminho do sol (fora do quadro da câmera)
BLINDS_COUNT = 44
BLINDS_SPACING = 0.055
BLINDS_SLAT = 0.065        # largura da lâmina: maior que o espaçamento, fechada não passa luz
BLINDS_LENGTH = 3.0

LIGHT = dict(
    THEME="light",
    BG="#f8f6ff",
    VIEW_TRANSFORM="Standard",
    WORLD=SKY,
    FILL_COLOR="#ffffff",
    WALL="#ece7f6",
    WALL_EMISSION=None,
    DESK="#e2dcec",
    DESK_EDGE="#cfc8dc",
    DESK_MAT="#2b2540",    # mousepad escuro: contraste com a mesa clara e as teclas
    LAMP_POWER=0,          # de dia a luminária fica apagada
    SHADE_GLOW=0,
    BULB_GLOW=0,
    RIM_POWER=0,
    FILL_POWER=4,
    RGB_SCALE=0.55,        # o RGB das peças continua, mas de dia não domina
    LED_SCALE=0.1,         # luzes coloridas que pintam a parede: sem o AgX, mais que isso estoura
    SCREEN_IMAGE=os.path.join(ROOT, "scripts", "blender", "assets", "screen-light.png"),
    SCREEN_STANDBY="#14121a",
    SCREEN_BRIGHTNESS=1.0, # no Standard, 1,0 mostra o print com as cores exatas
    GLARE_THRESHOLD=1.4,   # de dia, só o que passa do branco brilha (lâmpadas e RGB)
    DAYLIGHT=True,
    OUT_TEST=os.path.join(ROOT, "renders", "test-light"),
    OUT_PREVIEW=os.path.join(ROOT, "renders", "preview-light"),
    OUT_FINAL=os.path.join(ROOT, "renders", "frames-light"),
)

MONITOR_CENTER = Vector((0.0, 0.2, 0.36))
SCREEN_PLANE_Y = MONITOR_CENTER.y - 0.0135

# ---------------------------------------------------------------------------------------------
# Utilitários
# ---------------------------------------------------------------------------------------------


def linear(hex_color, alpha=1.0):
    """Hex sRGB para a cor linear que o Blender usa nos shaders."""
    h = hex_color.lstrip("#")
    out = []
    for i in (0, 2, 4):
        c = int(h[i : i + 2], 16) / 255
        out.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    return (*out, alpha)


def keys(target, path, points):
    """Anima `target.path` com pares (frame, valor)."""
    for frame, value in points:
        setattr(target, path, value)
        target.keyframe_insert(path, frame=frame)


def ramp(target, path, span, start, end):
    """Fica em `start` até span[0], vai a `end` até span[1] e fica lá."""
    keys(target, path, [(1, start), (span[0], start), (span[1], end), (FRAMES, end)])


def try_set(obj, attr, value):
    # Nomes de opções mudam entre versões do Blender: o que não existir fica no padrão.
    if hasattr(obj, attr):
        setattr(obj, attr, value)


def material(name, color, roughness=0.5, metallic=0.0, emission=None, strength=0.0):
    """`emission` aceita hex ou uma cor linear (r, g, b)."""
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = linear(color)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if emission:
        bsdf.inputs["Emission Color"].default_value = linear(emission) if isinstance(emission, str) else (*emission, 1)
        bsdf.inputs["Emission Strength"].default_value = strength
    return mat


def emission_socket(mat):
    return mat.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"]


def assign(obj, mat):
    obj.data.materials.clear()
    obj.data.materials.append(mat)
    return obj


def bevel(obj, width, segments=1):
    mod = obj.modifiers.new("Bevel", "BEVEL")
    mod.width = width
    mod.segments = segments
    mod.limit_method = "ANGLE"
    return obj


def box(name, size, location, mat, bevel_width=0.0, segments=1):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = size
    bpy.ops.object.transform_apply(scale=True)
    if bevel_width:
        bevel(obj, bevel_width, segments)
    return assign(obj, mat)


def rod(name, start, end, radius, mat, vertices=24):
    """Cilindro ligando dois pontos."""
    a, b = Vector(start), Vector(end)
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=(b - a).length, location=(a + b) / 2)
    obj = bpy.context.active_object
    obj.name = name
    obj.rotation_euler = (b - a).to_track_quat("Z", "Y").to_euler()
    bpy.ops.object.shade_smooth()
    return assign(obj, mat)


def point_at(obj, target):
    """Luzes e cones apontam no -Z local."""
    direction = Vector(target) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def area_light(name, location, target, size, color, energy=0.0):
    data = bpy.data.lights.new(name, "AREA")
    data.shape = "RECTANGLE"
    data.size, data.size_y = size
    data.color = linear(color)[:3]
    data.energy = energy
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    point_at(obj, target)
    return obj


def point_light(name, location, color, radius, energy=0.0):
    data = bpy.data.lights.new(name, "POINT")
    data.color = linear(color)[:3]
    data.shadow_soft_size = radius
    data.energy = energy
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    return obj


def world_bounds(objects):
    points = [obj.matrix_world @ Vector(corner) for obj in objects for corner in obj.bound_box]
    low = Vector([min(p[i] for p in points) for i in range(3)])
    high = Vector([max(p[i] for p in points) for i in range(3)])
    return low, high


# ---------------------------------------------------------------------------------------------
# Cena
# ---------------------------------------------------------------------------------------------


def setup_scene(mode):
    """`mode`: "test", "preview" ou "final"."""
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.frame_start, scene.frame_end = 1, FRAMES

    engines = [item.identifier for item in scene.render.bl_rna.properties["engine"].enum_items]
    scene.render.engine = "BLENDER_EEVEE" if "BLENDER_EEVEE" in engines else "BLENDER_EEVEE_NEXT"
    eevee = scene.eevee
    try_set(eevee, "taa_render_samples", {"test": TEST_SAMPLES, "preview": PREVIEW_SAMPLES}.get(mode, SAMPLES))
    # Reflexos com ray tracing (vidro, tampo, monitor) e luz rebatida das superfícies que emitem.
    try_set(eevee, "use_raytracing", True)
    try_set(eevee, "ray_tracing_method", "SCREEN")
    try_set(eevee, "use_fast_gi", True)
    try_set(eevee, "use_shadows", True)

    res = {"test": TEST_RESOLUTION, "preview": PREVIEW_RESOLUTION}.get(mode, RESOLUTION)
    scene.render.resolution_x, scene.render.resolution_y = res
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = False

    # AgX segura as luzes fortes sem estourar para branco. O fundo usa BG_AGX para sair no hex exato.
    scene.view_settings.view_transform = VIEW_TRANSFORM
    scene.view_settings.look = "None"

    fmt = "PNG" if mode == "test" else FILE_FORMAT
    scene.render.image_settings.file_format = fmt
    if fmt == "WEBP":
        scene.render.image_settings.quality = WEBP_QUALITY
    scene.render.image_settings.color_mode = "RGB"

    world = bpy.data.worlds.new("World")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes["Background"]
    bg.inputs["Color"].default_value = (*WORLD, 1)
    bg.inputs["Strength"].default_value = 1.0
    return scene


def setup_compositor(scene):
    """Bloom suave: só o que passa de GLARE_THRESHOLD brilha; o fundo fica intacto."""
    tree = bpy.data.node_groups.new("Bloom", "CompositorNodeTree")
    scene.compositing_node_group = tree
    try_set(scene.render, "use_compositing", True)
    layers = tree.nodes.new("CompositorNodeRLayers")
    glare = tree.nodes.new("CompositorNodeGlare")
    glare.inputs["Type"].default_value = "Bloom"
    glare.inputs["Quality"].default_value = "High"
    glare.inputs["Threshold"].default_value = GLARE_THRESHOLD
    glare.inputs["Strength"].default_value = GLARE_STRENGTH
    glare.inputs["Size"].default_value = GLARE_SIZE
    tree.interface.new_socket(name="Image", in_out="OUTPUT", socket_type="NodeSocketColor")
    output = tree.nodes.new("NodeGroupOutput")
    tree.links.new(layers.outputs["Image"], glare.inputs["Image"])
    tree.links.new(glare.outputs["Image"], output.inputs["Image"])


def build_room():
    # No escuro, a parede emite o próprio fundo: onde a luz não chega, ela some no fundo do site.
    # No claro, ela só recebe a luz do dia.
    wall_mat = material("Wall", WALL, roughness=0.9, emission=WALL_EMISSION, strength=1.0)
    box("Wall", (8, 0.05, 5), (0, 0.55, 1.2), wall_mat)
    floor_mat = material("Floor", BG, roughness=0.9, emission=WALL_EMISSION, strength=1.0)
    box("Floor", (8, 8, 0.05), (0, 0, -0.76), floor_mat)


def build_daylight():
    """
    Modo claro: o sol entra pela esquerda passando por uma persiana fora do quadro. A persiana não
    aparece na câmera nem em reflexos, só projeta as listras. Devolve (lâminas, mundo) para animar.
    """
    d = Vector(SUN_DIRECTION).normalized()
    data = bpy.data.lights.new("Sun", "SUN")
    data.color = linear(SUN_COLOR)[:3]
    data.energy = SUN_STRENGTH
    data.angle = math.radians(SUN_ANGLE)
    sun = bpy.data.objects.new("Sun", data)
    bpy.context.collection.objects.link(sun)
    sun.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()

    # Base da persiana: x = comprimento da lâmina (horizontal), y = empilhamento, z = direção do sol.
    u = Vector((-d.y, d.x, 0)).normalized()
    v = d.cross(u).normalized()
    blinds = bpy.data.objects.new("Blinds", None)
    bpy.context.collection.objects.link(blinds)
    basis = Matrix((u, v, d)).transposed().to_4x4()
    basis.translation = Vector((0, 0.15, 0.35)) - d * BLINDS_DISTANCE
    blinds.matrix_world = basis
    slat_mat = material("Slat", "#f2eee8", roughness=0.6)
    slats = []
    for k in range(BLINDS_COUNT):
        bpy.ops.mesh.primitive_cube_add(size=1)
        slat = bpy.context.active_object
        slat.name = f"Slat{k}"
        slat.scale = (BLINDS_LENGTH, BLINDS_SLAT, 0.003)
        assign(slat, slat_mat)
        slat.parent = blinds
        slat.location = (0, (k - BLINDS_COUNT / 2) * BLINDS_SPACING, 0)
        for attr in ("visible_camera", "visible_glossy", "visible_diffuse", "visible_transmission"):
            try_set(slat, attr, False)
        slats.append(slat)
    return slats, bpy.context.scene.world.node_tree.nodes["Background"]


def build_desk():
    top = material("DeskTop", DESK, roughness=0.5)
    edge = material("DeskEdge", DESK_EDGE, roughness=0.7)
    w, d = DESK_SIZE
    box("DeskTop", (w, d, 0.04), (0, 0.0, -0.02), top, bevel_width=0.006)
    for x in (-w / 2 + 0.05, w / 2 - 0.05):
        box(f"DeskLeg{x}", (0.04, d - 0.1, 0.72), (x, 0.0, -0.4), edge, bevel_width=0.004)


def build_monitor():
    body = material("Device", DEVICE, roughness=0.35, metallic=0.2)

    w, h = SCREEN_W, SCREEN_H
    center = MONITOR_CENTER
    box("MonitorPanel", (w + 0.02, 0.025, h + 0.02), center, body, bevel_width=0.006, segments=3)
    box("MonitorNeck", (0.05, 0.03, 0.26), (0, 0.24, 0.13), body, bevel_width=0.004, segments=2)
    box("MonitorBase", (0.24, 0.16, 0.012), (0, 0.2, 0.006), body, bevel_width=0.004, segments=2)

    # Tela: o print como emissão. Desligada, é vidro preto; ligada, a próxima seção do site.
    screen = bpy.data.materials.new("Screen")
    screen.use_nodes = True
    nodes, links = screen.node_tree.nodes, screen.node_tree.links
    bsdf = nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = linear("#050409")
    bsdf.inputs["Roughness"].default_value = 0.18
    tex = nodes.new("ShaderNodeTexImage")
    if os.path.exists(SCREEN_IMAGE):
        tex.image = bpy.data.images.load(SCREEN_IMAGE)
    # "Wake" vai do standby (fator 0) ao print (fator 1).
    wake = nodes.new("ShaderNodeMix")
    wake.name = "Wake"
    wake.data_type = "RGBA"
    color_in = [s for s in wake.inputs if s.type == "RGBA"]
    color_in[0].default_value = linear(SCREEN_STANDBY)
    links.new(tex.outputs["Color"], color_in[1])
    links.new(next(s for s in wake.outputs if s.type == "RGBA"), bsdf.inputs["Emission Color"])
    bsdf.inputs["Emission Strength"].default_value = 1.0

    bpy.ops.mesh.primitive_plane_add(size=1, location=(center.x, SCREEN_PLANE_Y, center.z))
    plane = bpy.context.active_object
    plane.name = "Screen"
    plane.scale = (w, h, 1)
    plane.rotation_euler = (math.radians(90), 0, 0)
    assign(plane, screen)

    # A tela também ilumina o teclado e a mesa: uma luz de área do tamanho dela.
    glow = area_light("ScreenLight", center + Vector((0, -0.03, 0)), center + Vector((0, -1, -0.2)), (w, h), ACCENT)
    return screen, glow


def build_desk_mat():
    """Mousepad: quebra o tampo liso e dá escala ao teclado e ao mouse."""
    felt = material("DeskMat", DESK_MAT, roughness=0.95)
    box("DeskMat", (0.8, 0.32, DESK_MAT_Z), (0.08, -0.17, DESK_MAT_Z / 2), felt, bevel_width=0.0015)


def import_model(path, drop=()):
    """Importa um glTF, descarta os objetos cujo nome começa com `drop` e devolve (raiz, malhas)."""
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path)
    new = [obj for obj in bpy.data.objects if obj not in before]
    unwanted = [obj for obj in new if drop and obj.name.startswith(drop)]
    keep = [obj for obj in new if obj not in unwanted]
    for obj in unwanted:
        bpy.data.objects.remove(obj, do_unlink=True)
    bpy.context.view_layer.update()
    root = next(obj for obj in keep if obj.parent is None)
    return root, [obj for obj in keep if obj.type == "MESH"]


def mesh_points(meshes):
    """Vértices de todas as malhas, em coordenadas do mundo (numpy, N x 3)."""
    chunks = []
    for obj in meshes:
        count = len(obj.data.vertices)
        local = np.empty(count * 3, dtype=np.float64)
        obj.data.vertices.foreach_get("co", local)
        local = np.c_[local.reshape(count, 3), np.ones(count)]
        chunks.append(local @ np.array(obj.matrix_world).T)
    return np.vstack(chunks)[:, :3]


def place(root, meshes, rotation, length, position, length_axis=0):
    """
    Aplica `rotation` (Matrix 3x3), escala para que a extensão no eixo `length_axis` vire `length`
    metros e assenta a peça sobre o mousepad, centrada em `position` (x, y).
    """
    points = mesh_points(meshes) @ np.array(rotation).T
    low, high = points.min(axis=0), points.max(axis=0)
    scale = length / (high[length_axis] - low[length_axis])
    center = (low + high) / 2
    offset = Vector((position[0], position[1], DESK_MAT_Z)) - Vector((center[0], center[1], low[2])) * float(scale)
    root.matrix_world = Matrix.Translation(offset) @ Matrix.Scale(scale, 4) @ rotation.to_4x4() @ root.matrix_world
    bpy.context.view_layer.update()
    return Vector(((high[0] - low[0]) * scale, (high[1] - low[1]) * scale, (high[2] - low[2]) * scale))


def base_points(points, cols=12, rows=5):
    """O ponto mais baixo de cada célula do miolo da base (sem as bordas arredondadas)."""
    x, y, z = points[:, 0], points[:, 1], points[:, 2]
    xs, ys = np.linspace(x.min(), x.max(), cols + 1), np.linspace(y.min(), y.max(), rows + 1)
    base = []
    for i in range(1, cols - 1):
        for j in range(1, rows - 1):
            cell = (x >= xs[i]) & (x < xs[i + 1]) & (y >= ys[j]) & (y < ys[j + 1])
            if cell.any():
                base.append(points[cell][np.argmin(z[cell])])
    return np.array(base)


def base_minima(points):
    return base_points(points)[:, 2]


def level_base(points):
    """
    Rotação que deixa a base de uma malha na horizontal. O eixo de menor variância não basta numa
    fotogrametria: a base escaneada sai inclinada e a peça fica apoiada num canto só.
    Ajusta um plano aos pontos mais baixos do miolo da base e o endireita.
    """
    base = base_points(points)
    # z = a·x + b·y + c pelos mínimos quadrados; a normal do plano é (-a, -b, 1).
    a, b, _ = np.linalg.lstsq(np.c_[base[:, 0], base[:, 1], np.ones(len(base))], base[:, 2], rcond=None)[0]
    normal = Vector((-a, -b, 1.0)).normalized()
    return normal.rotation_difference(Vector((0, 0, 1))).to_matrix()


def even_keycaps(meshes, center):
    """
    Nivela os topos das teclas. Na fotogrametria, algumas teclas saíram ~3 mm mais altas que as
    vizinhas. Faz um mapa de altura (1 mm), separa cada tecla pelos vãos, compara o topo dela com o
    perfil esperado (um plano ajustado a todas) e rebaixa só a tecla, comprimindo da base ao topo:
    os vãos e a carcaça não se mexem, então a malha não rasga.
    """
    cx, cy = center
    points = mesh_points(meshes)
    x, y, z = points.T
    floor = DESK_MAT_Z + KEYBOARD_FLOOR + KEYBOARD_FLOOR_SLOPE * (y - cy)
    res = 0.001
    ix = ((x - x.min()) / res).astype(int)
    iy = ((y - y.min()) / res).astype(int)
    w, h = ix.max() + 1, iy.max() + 1
    height = np.full((h, w), -1.0)
    np.maximum.at(height, (iy, ix), z - floor)
    keycap = height > KEYCAP_MIN_HEIGHT  # bem acima do fundo: topo de tecla, não vão

    # Componentes conexas (vizinhança de 4): cada uma é uma tecla.
    label = np.zeros((h, w), dtype=np.int32)
    count = 0
    for sy, sx in zip(*np.nonzero(keycap)):
        if label[sy, sx]:
            continue
        count += 1
        stack = [(sy, sx)]
        label[sy, sx] = count
        while stack:
            cyy, cxx = stack.pop()
            for ny, nx in ((cyy + 1, cxx), (cyy - 1, cxx), (cyy, cxx + 1), (cyy, cxx - 1)):
                if 0 <= ny < h and 0 <= nx < w and keycap[ny, nx] and not label[ny, nx]:
                    label[ny, nx] = count
                    stack.append((ny, nx))

    # Topo e centro de cada tecla (descarta respingos pequenos).
    keys = []
    for k in range(1, count + 1):
        ky, kx = np.nonzero(label == k)
        if len(ky) < 40:
            continue
        keys.append((k, kx.mean(), ky.mean(), np.percentile(height[ky, kx], 90)))
    keys = np.array(keys)
    # Perfil esperado: plano pelos topos, refeito sem as teclas que fogem dele.
    A = np.c_[keys[:, 1], keys[:, 2], np.ones(len(keys))]
    keep = np.ones(len(keys), dtype=bool)
    for _ in range(3):
        coef = np.linalg.lstsq(A[keep], keys[keep, 3], rcond=None)[0]
        resid = keys[:, 3] - A @ coef
        keep = np.abs(resid) < max(0.0006, 1.5 * np.std(resid[keep]))
    offset = np.zeros(count + 1)
    offset[keys[:, 0].astype(int)] = np.clip(resid, -KEYCAP_MAX_FIX, KEYCAP_MAX_FIX)

    # Cada vértice de tecla desce (ou sobe) proporcional à altura dele acima do fundo.
    vertex_key = label[iy, ix]
    rel = z - floor
    top = np.maximum(height[iy, ix], 1e-4)
    weight = np.clip(rel / top, 0.0, 1.0) * (rel > 0.001)
    dz = -offset[vertex_key] * weight
    start = 0
    for obj in meshes:
        n = len(obj.data.vertices)
        world = np.c_[points[start : start + n] + np.c_[np.zeros(n), np.zeros(n), dz[start : start + n]], np.ones(n)]
        local = world @ np.array(obj.matrix_world.inverted()).T
        obj.data.vertices.foreach_set("co", local[:, :3].ravel())
        obj.data.update()
        start += n
    moved = np.abs(offset[1:]) > 0.0005
    print(f"[hero] teclado: {len(keys)} teclas, {int(moved.sum())} niveladas (desvio máx. antes: {np.abs(resid).max() * 1000:.1f} mm)")


def import_keyboard():
    """
    Teclado de fotogrametria: vem de cabeça para baixo e torto. A malha diz como endireitar:
    o eixo mais fino é a altura (teclas para cima) e o mais longo é o comprimento.
    Devolve o socket do brilho RGB por baixo.
    """
    if not os.path.exists(KEYBOARD_MODEL):
        print(f"[hero] teclado não encontrado em {KEYBOARD_MODEL}")
        return []
    root, meshes = import_model(KEYBOARD_MODEL)
    points = mesh_points(meshes)
    centered = points - points.mean(axis=0)
    _, vectors = np.linalg.eigh(np.cov(centered.T))  # autovetores em ordem crescente de variância
    up, length = Vector(vectors[:, 0]), Vector(vectors[:, 2])
    # No arquivo original as teclas apontam para -Z (os adesivos ficam na base, virada para +Z).
    if up.z > 0:
        up = -up
    length = (length - up * length.dot(up)).normalized()
    if KEYBOARD_FLIP:
        length = -length
    side = up.cross(length)
    rotation = Matrix((length, side, up))  # linhas: a nova base (x = comprimento, z = para cima)
    rotation = level_base(points @ np.array(rotation).T) @ rotation
    size = place(root, meshes, rotation, KEYBOARD_LENGTH, KEYBOARD_POSITION)
    # `place` assenta pelo ponto mais baixo, que numa fotogrametria é uma saliência isolada e deixa
    # o resto da base no ar. Assenta pela altura típica da base: a saliência afunda no mousepad.
    seated = mesh_points(meshes)
    base_z = np.median(base_minima(seated))
    root.matrix_world = Matrix.Translation((0, 0, DESK_MAT_Z - base_z)) @ root.matrix_world
    bpy.context.view_layer.update()
    even_keycaps(meshes, KEYBOARD_POSITION)

    # Textura original (rosa) escurecida e dessaturada, num material que reage à luz da cena.
    image = next((n.image for m in meshes for s in m.material_slots if s.material for n in s.material.node_tree.nodes if n.type == "TEX_IMAGE" and n.image), None)
    mat = bpy.data.materials.new("KeyboardScan")
    mat.use_nodes = True
    nodes, links = mat.node_tree.nodes, mat.node_tree.links
    bsdf = nodes["Principled BSDF"]
    bsdf.inputs["Roughness"].default_value = 0.55
    if image:
        tex = nodes.new("ShaderNodeTexImage")
        tex.image = image
        tone = nodes.new("ShaderNodeHueSaturation")
        tone.inputs["Saturation"].default_value = KEYBOARD_SATURATION
        tone.inputs["Value"].default_value = KEYBOARD_VALUE
        links.new(tex.outputs["Color"], tone.inputs["Color"])
        links.new(tone.outputs["Color"], bsdf.inputs["Base Color"])
    for obj in meshes:
        obj.data.materials.clear()
        obj.data.materials.append(mat)

    # Retroiluminação RGB entre as teclas: emite só no fundo entre elas (pela altura) e só no miolo
    # (longe da carcaça). Nada fica embaixo do teclado: a sombra de contato no mousepad continua lá.
    def node(kind, **inputs):
        n = nodes.new(kind)
        for key, value in inputs.items():
            n.inputs[key].default_value = value
        return n

    def math(operation, a, b=None):
        n = nodes.new("ShaderNodeMath")
        n.operation = operation
        for i, value in enumerate((a, b)):
            if value is None:
                continue
            if isinstance(value, (int, float)):
                n.inputs[i].default_value = value
            else:
                links.new(value, n.inputs[i])
        return n.outputs["Value"]

    def falloff(value, full, end):
        """1 até `full`, 0 a partir de `end`, suave no meio."""
        n = node("ShaderNodeMapRange", **{"From Min": full, "From Max": end, "To Min": 1.0, "To Max": 0.0})
        n.interpolation_type = "SMOOTHSTEP"
        links.new(value, n.inputs["Value"])
        return n.outputs["Result"]

    position = nodes.new("ShaderNodeNewGeometry").outputs["Position"]
    split = nodes.new("ShaderNodeSeparateXYZ")
    links.new(position, split.inputs["Vector"])
    cx, cy = KEYBOARD_POSITION
    hx, hy = size.x / 2 - KEYBOARD_RIM, size.y / 2 - KEYBOARD_RIM
    # Altura acima do fundo entre as teclas, que sobe da frente para trás (KEYBOARD_FLOOR_SLOPE).
    floor = math("ADD", math("MULTIPLY", math("SUBTRACT", split.outputs["Y"], cy), KEYBOARD_FLOOR_SLOPE), DESK_MAT_Z + KEYBOARD_FLOOR)
    band = falloff(math("SUBTRACT", split.outputs["Z"], floor), KEYBOARD_BAND_FULL, KEYBOARD_BAND_END)
    inside_x = falloff(math("ABSOLUTE", math("SUBTRACT", split.outputs["X"], cx)), hx - 0.004, hx)
    inside_y = falloff(math("ABSOLUTE", math("SUBTRACT", split.outputs["Y"], cy)), hy - 0.004, hy)
    level = node("ShaderNodeValue")
    level.name = "Backlight"
    level.outputs["Value"].default_value = 0.0
    mask = math("MULTIPLY", math("MULTIPLY", band, inside_x), inside_y)
    links.new(math("MULTIPLY", mask, level.outputs["Value"]), bsdf.inputs["Emission Strength"])
    bsdf.inputs["Emission Color"].default_value = linear(PC_RGB)
    print(f"[hero] teclado: {sum(len(o.data.polygons) for o in meshes)} polígonos, {size.x:.3f} x {size.y:.3f} x {size.z:.3f} m")
    return [(level.outputs["Value"], KEYBOARD_GLOW)]


def import_mouse():
    """Mouse sem o cabo, de frente para o monitor, sobre o mousepad. Devolve o socket do anel aceso."""
    if not os.path.exists(MOUSE_MODEL):
        print(f"[hero] mouse não encontrado em {MOUSE_MODEL}")
        return []
    root, meshes = import_model(MOUSE_MODEL, MOUSE_DROP)
    # No modelo, a frente (onde saía o cabo) é o +X: girando 90°, ela aponta para o monitor (+Y).
    rotation = Matrix.Rotation(math.radians(90), 3, "Z")
    size = place(root, meshes, rotation, MOUSE_LENGTH, MOUSE_POSITION, length_axis=1)
    glowing = []
    for mat in {s.material for obj in meshes for s in obj.material_slots if s.material}:
        bsdf = mat.node_tree.nodes.get("Principled BSDF") if mat.use_nodes else None
        if bsdf and bsdf.inputs["Emission Strength"].default_value > 0:
            # O anel verde da roda vira a cor do RGB e acende junto com o resto.
            bsdf.inputs["Emission Color"].default_value = linear(PC_RGB)
            bsdf.inputs["Emission Strength"].default_value = 0.0
            glowing.append((bsdf.inputs["Emission Strength"], MOUSE_GLOW))
    print(f"[hero] mouse: {sum(len(o.data.polygons) for o in meshes)} polígonos, {size.x:.3f} x {size.y:.3f} x {size.z:.3f} m")
    return glowing


def build_lamp():
    """Luminária de braço. Mais segmentos que o resto: a câmera passa bem perto dela."""
    metal = material("Lamp", METAL, roughness=0.3, metallic=0.8)
    bulb = material("Bulb", "#ffffff", roughness=0.2, emission=LAMP_LIGHT, strength=0.0)

    # Atrás e à esquerda do monitor: a cúpula não passa na frente da tela.
    base = (-0.62, 0.36, 0.0)
    elbow = (-0.6, 0.42, 0.5)
    head = (-0.5, 0.2, 0.56)
    target = (-0.2, -0.12, 0.0)

    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=0.075, depth=0.022, location=(base[0], base[1], 0.011))
    lamp_base = assign(bpy.context.active_object, metal)
    lamp_base.name = "LampBase"
    bevel(lamp_base, 0.004, 2)
    rod("LampArmLow", (base[0], base[1], 0.02), elbow, 0.009, metal)
    rod("LampArmHigh", elbow, head, 0.009, metal)
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=12, radius=0.016, location=elbow)
    joint = assign(bpy.context.active_object, metal)
    joint.name = "LampJoint"
    bpy.ops.object.shade_smooth()

    # Cúpula: cone aberto apontado para a mesa.
    bpy.ops.mesh.primitive_cone_add(vertices=64, radius1=0.085, radius2=0.03, depth=0.13, end_fill_type="NOTHING", location=head)
    shade = bpy.context.active_object
    shade.name = "LampShade"
    point_at(shade, target)
    bpy.ops.object.shade_smooth()
    # Por fora, o metal; por dentro (a casca que o Solidify gera), um esmalte claro que pega a luz.
    assign(shade, metal)
    shade.data.materials.append(material("LampInner", "#b9adcf", roughness=0.35))
    thick = shade.modifiers.new("Thick", "SOLIDIFY")
    thick.thickness = 0.004
    thick.material_offset = 1

    direction = (Vector(target) - Vector(head)).normalized()
    # A lâmpada sai um pouco da boca da cúpula: de cima, a câmera vê ela acesa.
    bulb_pos = Vector(head) + direction * 0.062
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=16, radius=0.026, location=bulb_pos)
    lamp_bulb = assign(bpy.context.active_object, bulb)
    lamp_bulb.name = "LampBulb"
    bpy.ops.object.shade_smooth()
    # A luz fica dentro da lâmpada: se a esfera fizer sombra, a mesa não recebe nada.
    try_set(lamp_bulb, "visible_shadow", False)

    data = bpy.data.lights.new("LampLight", "SPOT")
    data.color = linear(LAMP_LIGHT)[:3]
    data.spot_size = math.radians(95)
    data.spot_blend = 0.55
    data.shadow_soft_size = 0.03
    data.energy = 0.0
    light = bpy.data.objects.new("LampLight", data)
    bpy.context.collection.objects.link(light)
    light.location = bulb_pos + direction * 0.02
    point_at(light, target)

    # Luz pequena dentro da cúpula: sem ela, o interior fica preto chapado.
    inner_light = point_light("LampInnerLight", bulb_pos, LAMP_LIGHT, 0.02)

    # Aro aceso na boca da cúpula: de cima a câmera não vê a lâmpada, mas vê o aro brilhando.
    bpy.ops.mesh.primitive_torus_add(major_radius=0.083, minor_radius=0.004, major_segments=64, minor_segments=8, location=Vector(head) + direction * 0.064)
    lip = bpy.context.active_object
    lip.name = "LampLip"
    lip.rotation_euler = direction.to_track_quat("Z", "Y").to_euler()
    bpy.ops.object.shade_smooth()
    assign(lip, bulb)
    try_set(lip, "visible_shadow", False)
    return bulb, light, inner_light


def build_back_glow():
    """Fita de LED atrás do monitor, pintando a parede de roxo."""
    violet = area_light("GlowViolet", (-0.12, 0.3, 0.38), (-0.4, 0.55, 0.6), (0.4, 0.05), VIOLET)
    magenta = area_light("GlowMagenta", (0.14, 0.3, 0.38), (0.45, 0.55, 0.5), (0.4, 0.05), MAGENTA)
    return violet, magenta


def build_ambient():
    """Penumbra: rim light roxa por trás (contornos) e uma luz fraca da frente (volumes)."""
    area_light("Rim", (0.0, 0.42, 1.0), (0.0, -1.0, 0.15), (2.0, 0.4), VIOLET, RIM_POWER)
    area_light("Fill", (-0.6, -1.6, 1.2), (0.1, 0.1, 0.25), (1.5, 1.0), FILL_COLOR, FILL_POWER)


def style_pc_material(mat):
    """
    Refaz os materiais do modelo pela paleta. Devolve (socket de emissão, pico) para o que acende.
    Nomes vêm do glTF: confira com o modelo se trocar de arquivo.
    """
    bsdf = mat.node_tree.nodes.get("Principled BSDF") if mat.use_nodes else None
    if not bsdf:
        return None
    inputs = bsdf.inputs
    name = mat.name

    if name.startswith("RGB_") or name == "fan_white":
        fan = name == "fan_white"
        # Apagado, é plástico escuro, não rosa. Base clara somada à emissão estoura para branco.
        inputs["Base Color"].default_value = linear(PC_FAN_BASE if fan else "#1a1426")
        inputs["Roughness"].default_value = 0.5
        inputs["Metallic"].default_value = 0.0
        inputs["Emission Color"].default_value = linear(PC_RGB)
        inputs["Emission Strength"].default_value = 0.0
        return inputs["Emission Strength"], PC_FAN_STRENGTH if fan else PC_RGB_STRENGTH

    if name == "PC.glas":
        # Vidro: escuro e transparente de frente, mais opaco e espelhado de lado (efeito Fresnel).
        nodes, links = mat.node_tree.nodes, mat.node_tree.links
        inputs["Base Color"].default_value = linear(PC_GLASS)
        inputs["Metallic"].default_value = 0.0
        inputs["Roughness"].default_value = 0.02
        inputs["IOR"].default_value = 1.5
        facing = nodes.new("ShaderNodeLayerWeight")
        facing.inputs["Blend"].default_value = 0.3
        ramp_node = nodes.new("ShaderNodeMapRange")
        ramp_node.inputs["To Min"].default_value = 0.14
        ramp_node.inputs["To Max"].default_value = 0.75
        links.new(facing.outputs["Facing"], ramp_node.inputs["Value"])
        links.new(ramp_node.outputs["Result"], inputs["Alpha"])
        try_set(mat, "surface_render_method", "DITHERED")
        return None

    if name == "Pc_Motherboard_gold":
        # Dourado puxaria laranja: vira metal neutro.
        inputs["Base Color"].default_value = linear("#8d8599")
        return None

    if name == "PC._grey":
        inputs["Roughness"].default_value = 0.3
        return None

    # O resto (gabinete, plásticos, placa) vira preto fosco.
    inputs["Base Color"].default_value = linear(PC_CASE)
    inputs["Metallic"].default_value = 0.2
    inputs["Roughness"].default_value = 0.6
    return None


def import_pc():
    """Importa o modelo, descarta a base e o cabo, escala, posiciona e acerta os materiais."""
    if not os.path.exists(PC_MODEL):
        print(f"[hero] modelo do PC não encontrado em {PC_MODEL}: a cena sai sem PC")
        return [], []

    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=PC_MODEL)
    new = [obj for obj in bpy.data.objects if obj not in before]
    drop = [obj for obj in new if obj.name.startswith(PC_DROP)]
    keep = [obj for obj in new if obj not in drop]
    for obj in drop:
        bpy.data.objects.remove(obj, do_unlink=True)

    root = next(obj for obj in keep if obj.parent is None)
    meshes = [obj for obj in keep if obj.type == "MESH"]
    bpy.context.view_layer.update()
    low, high = world_bounds(meshes)

    # pivot (posição, giro, escala) -> offset (base no centro, no chão) -> raiz do glTF.
    pivot = bpy.data.objects.new("PC", None)
    offset = bpy.data.objects.new("PCOffset", None)
    for empty in (pivot, offset):
        bpy.context.collection.objects.link(empty)
    offset.parent = pivot
    root.parent = offset
    offset.location = (-(low.x + high.x) / 2, -(low.y + high.y) / 2, -low.z)
    pivot.scale = [PC_HEIGHT / (high.z - low.z)] * 3
    pivot.rotation_euler = (0, 0, math.radians(PC_YAW))
    pivot.location = (*PC_POSITION, 0)

    glowing = []
    for mat in {slot.material for obj in meshes for slot in obj.material_slots if slot.material}:
        styled = style_pc_material(mat)
        if styled:
            glowing.append(styled)
    for obj in meshes:
        if any(slot.material and slot.material.name == "PC.glas" for slot in obj.material_slots):
            # O vidro não bloqueia a luz de dentro.
            try_set(obj, "visible_shadow", False)

    # O RGB refletindo: uma luz dentro do gabinete (mesa e monitor) e uma subindo do topo (parede).
    bpy.context.view_layer.update()
    low, high = world_bounds(meshes)
    center = (low + high) / 2
    glow = point_light("PCGlow", center, PC_RGB, 0.12)
    top = area_light("PCWallGlow", (center.x, center.y, high.z + 0.03), (center.x, 0.55, 0.9), (0.3, 0.2), PC_RGB)
    print(f"[hero] PC: {sum(len(o.data.polygons) for o in meshes)} polígonos, {len(meshes)} malhas, {len(glowing)} materiais que acendem")
    return glowing, [(glow.data, PC_GLOW_POWER), (top.data, PC_WALL_POWER)]


def dive_end():
    """Último plano: de frente para a tela, à distância em que ela enche o quadro (sem bordas)."""
    half_width = SCREEN_W * SCREEN_FILL / 2
    distance = half_width / (18 / LENS_MM)  # sensor de 36 mm: meia largura de 18 mm
    aim = Vector((MONITOR_CENTER.x, SCREEN_PLANE_Y, MONITOR_CENTER.z))
    return (FRAMES, aim - Vector((0, distance, 0)), aim)


def build_camera(scene):
    aim = bpy.data.objects.new("Aim", None)
    scene.collection.objects.link(aim)
    data = bpy.data.cameras.new("Camera")
    data.lens = LENS_MM
    data.sensor_fit = "HORIZONTAL"
    data.sensor_width = 36
    data.clip_start = 0.01
    data.dof.use_dof = True
    data.dof.focus_object = aim  # o foco acompanha o que a câmera está olhando
    data.dof.aperture_fstop = FSTOP
    cam = bpy.data.objects.new("Camera", data)
    scene.collection.objects.link(cam)
    scene.camera = cam
    track = cam.constraints.new("TRACK_TO")
    track.target = aim
    track.track_axis = "TRACK_NEGATIVE_Z"
    track.up_axis = "UP_Y"
    return cam, aim


def animate_camera(cam, aim):
    """Curvas suaves entre os planos, começando e terminando devagar. Sem ultrapassar os pontos:
    com tangente livre, a câmera passava do alvo na virada do PC para o monitor."""
    shots = SHOTS + [dive_end()]
    for frame, position, target in shots:
        cam.location = position
        cam.keyframe_insert("location", frame=frame)
        aim.location = target
        aim.keyframe_insert("location", frame=frame)
    for obj in (cam, aim):
        for curve in fcurves_of(obj):
            for point in curve.keyframe_points:
                point.interpolation = "BEZIER"
                point.handle_left_type = point.handle_right_type = "AUTO_CLAMPED"
            curve.update()


def fcurves_of(obj):
    """F-curves de um objeto, nas APIs antiga (action.fcurves) e nova (camadas/slots)."""
    action = obj.animation_data.action
    if hasattr(action, "fcurves") and len(action.fcurves):
        return list(action.fcurves)
    curves = []
    for layer in getattr(action, "layers", []):
        for strip in layer.strips:
            for bag in strip.channelbags:
                curves.extend(bag.fcurves)
    return curves


def animate(lamp_bulb, lamp_light, inner_light, screen, screen_light, glows, pc, desk_rgb, daylight=None):
    lo, hi = LAMP_ON
    # A piscada de lâmpada ligando: acende, cai, firma.
    flicker = [(1, 0), (lo, 0), (lo + 2, 0.7), (lo + 4, 0.15), (lo + 6, 0.85), (hi, 1), (FRAMES, 1)]
    keys(lamp_light.data, "energy", [(f, v * LAMP_POWER) for f, v in flicker])
    keys(emission_socket(lamp_bulb), "default_value", [(f, v * BULB_GLOW) for f, v in flicker])
    keys(inner_light.data, "energy", [(f, v * SHADE_GLOW) for f, v in flicker])

    # Fans, RGB do PC, do teclado e do mouse, e a fita de luz atrás do monitor.
    pc_sockets, pc_lights = pc
    for socket, peak in pc_sockets + desk_rgb:
        ramp(socket, "default_value", RGB_ON, 0, peak * RGB_SCALE)
    for data, peak in pc_lights:
        ramp(data, "energy", RGB_ON, 0, peak * LED_SCALE)
    for glow, peak in zip(glows, (9, 6)):
        ramp(glow.data, "energy", RGB_ON, 0, peak * LED_SCALE)

    # Modo claro: a persiana abre e o céu clareia.
    if daylight:
        slats, sky = daylight
        closed, opened = (math.radians(a) for a in BLINDS_ANGLE)
        for slat in slats:
            ramp(slat, "rotation_euler", BLINDS_OPEN, Vector((closed, 0, 0)), Vector((opened, 0, 0)))
        ramp(sky.inputs["Strength"], "default_value", BLINDS_OPEN, *SKY_STRENGTH)

    # A tela sai do standby quando a câmera vira para ela.
    wake = next(s for s in screen.node_tree.nodes["Wake"].inputs if s.type == "VALUE")
    ramp(wake, "default_value", SCREEN_ON, 0, 1)
    ramp(emission_socket(screen), "default_value", SCREEN_ON, 1, SCREEN_BRIGHTNESS)
    ramp(screen_light.data, "energy", SCREEN_ON, 0.1, 6)


def render(scene, mode):
    if mode == "test":
        os.makedirs(OUT_TEST, exist_ok=True)
        for frame in TEST_FRAME_LIST:
            scene.frame_set(frame)
            scene.render.filepath = os.path.join(OUT_TEST, f"frame_{frame:04d}")
            bpy.ops.render.render(write_still=True)
            print(f"[hero] frame {frame} -> {scene.render.filepath}.png")
    else:
        out = OUT_PREVIEW if mode == "preview" else OUT_FINAL
        os.makedirs(out, exist_ok=True)
        scene.render.filepath = os.path.join(out, "frame_")
        bpy.ops.render.render(animation=True)


def main():
    args = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    mode = "test" if "--test" in args else "preview" if "--preview" in args else "final"
    if "--light" in args:
        globals().update(LIGHT)

    scene = setup_scene(mode)
    setup_compositor(scene)
    build_room()
    daylight = build_daylight() if DAYLIGHT else None
    build_desk()
    screen, screen_light = build_monitor()
    build_desk_mat()
    desk_rgb = import_keyboard() + import_mouse()
    bulb, lamp_light, inner_light = build_lamp()
    glows = build_back_glow()
    build_ambient()
    pc = import_pc()
    cam, aim = build_camera(scene)
    animate_camera(cam, aim)
    animate(bulb, lamp_light, inner_light, screen, screen_light, glows, pc, desk_rgb, daylight)

    if "--open" in args:
        return
    render(scene, mode)


main()
