export default async function handler(req, res) {
    try {
        const token = process.env.GITHUB_TOKEN;
        const username = "Francisco-Neto13";

        if (!token) {
            return res.status(500).json({ error: "Token não encontrado!" });
        }

        const now = new Date();
        const lastYear = new Date();
        lastYear.setFullYear(now.getFullYear() - 1);

        const fromDate = lastYear.toISOString();
        const toDate = now.toISOString();

        const gqlQuery = `
            query($username: String!, $from: DateTime!, $to: DateTime!) {
                user(login: $username) {
                    contributionsCollection(from: $from, to: $to) {
                        totalCommitContributions
                        restrictedContributionsCount
                        contributionCalendar {
                            totalContributions
                        }
                    }
                    repositories(privacy: PUBLIC) {
                        totalCount
                    }
                }
            }
        `;

        const gqlRes = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: gqlQuery,
                variables: { username, from: fromDate, to: toDate }
            })
        });

        const gqlJson = await gqlRes.json();

        if (!gqlJson.data) {
            return res.status(500).json({ error: "Erro no GraphQL", details: gqlJson });
        }

        const col = gqlJson.data.user.contributionsCollection;

        const calendarContributions = col.contributionCalendar.totalContributions;

        const totalCommits = col.totalCommitContributions + col.restrictedContributionsCount;

        const publicRepos = gqlJson.data.user.repositories.totalCount;

        let totalLines = 0;

        const repoRes = await fetch("https://api.github.com/user/repos?per_page=100", {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/vnd.github+json"
            }
        });

        const repos = await repoRes.json();

        for (const repo of repos) {
            const statsURL = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/stats/code_frequency`;

            const statsRes = await fetch(statsURL, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/vnd.github+json"
                }
            });

            if (statsRes.status === 202) continue; 

            if (statsRes.ok) {
                const stats = await statsRes.json();
                if (Array.isArray(stats)) {
                    stats.forEach(week => {
                        totalLines += Math.abs(week[1]) + Math.abs(week[2]);
                    });
                }
            }
        }

return res.status(200).json({
    contributions: calendarContributions, 
    repos: publicRepos,
    lines: totalLines,
    debug: {
        commits_raw: col.totalCommitContributions,
        commits_private: col.restrictedContributionsCount,
        contributions_calendar: calendarContributions
    }
});


    } catch (err) {
        console.error("ERRO INESPERADO:", err);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}
