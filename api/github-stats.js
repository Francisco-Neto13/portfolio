export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const token = process.env.GITHUB_TOKEN;
        const username = "Francisco-Neto13";

        if (!token) {
            return res.status(500).json({ error: "Token não encontrado!" });
        }

        const now = new Date();
        const lastYear = new Date();
        lastYear.setFullYear(now.getFullYear() - 1);

        const gqlRes = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                    query($username: String!, $from: DateTime!, $to: DateTime!) {
                        user(login: $username) {
                            contributionsCollection(from: $from, to: $to) {
                                totalCommitContributions
                                restrictedContributionsCount
                                contributionCalendar {
                                    totalContributions
                                }
                            }
                            repositories(privacy: PUBLIC, first: 100, ownerAffiliations: OWNER) {
                                totalCount
                            }
                        }
                    }
                `,
                variables: {
                    username,
                    from: lastYear.toISOString(),
                    to: now.toISOString()
                }
            })
        });

        const text = await gqlRes.text();
        if (!text) return res.status(500).json({ error: "Resposta vazia do GitHub" });

        const json = JSON.parse(text);

        if (!json.data || json.errors) {
            return res.status(500).json({ error: "Erro GraphQL", details: json });
        }

        const col = json.data.user.contributionsCollection;

        return res.status(200).json({
            contributions: col.contributionCalendar.totalContributions,
            commits: col.totalCommitContributions + col.restrictedContributionsCount,
            repos: json.data.user.repositories.totalCount
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}
