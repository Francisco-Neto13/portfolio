import { useEffect, useMemo, useState } from "react";
import { useAnimationControls } from "framer-motion";

type ScrollDirection = "up" | "down";

export function useDirectionalReveal(hiddenY: number, duration = 0.65) {
  const controls = useAnimationControls();
  const [direction, setDirection] = useState<ScrollDirection>("down");

  const hiddenState = useMemo(() => ({ opacity: 0, y: hiddenY }), [hiddenY]);
  const visibleState = useMemo(() => ({ opacity: 1, y: 0 }), []);

  useEffect(() => {
    controls.set(hiddenState);
  }, [controls, hiddenState]);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setDirection(currentY > lastY ? "down" : "up");
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onViewportEnter = () => {
    if (direction === "down") {
      controls.start({
        ...visibleState,
        transition: { duration, ease: "easeOut" },
      });
      return;
    }

    controls.set(visibleState);
  };

  const onViewportLeave = () => {
    if (direction === "up") {
      controls.set(hiddenState);
    }
  };

  return {
    controls,
    hiddenState,
    onViewportEnter,
    onViewportLeave,
  };
}

