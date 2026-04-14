import { NextResponse } from "next/server";

type GithubGraphqlResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        totalCommitContributions: number;
        restrictedContributionsCount: number;
        contributionCalendar: {
          totalContributions: number;
        };
      };
      repositories?: {
        totalCount: number;
      };
    };
  };
  errors?: Array<{ message: string }>;
};

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME ?? "Francisco-Neto13";

    if (!token) {
      return NextResponse.json({ error: "Token não encontrado." }, { status: 500 });
    }

    const now = new Date();
    const lastYear = new Date(now);
    lastYear.setFullYear(now.getFullYear() - 1);

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
      }),
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Falha ao consultar GitHub." }, { status: response.status });
    }

    const payload = (await response.json()) as GithubGraphqlResponse;
    if (!payload.data?.user?.contributionsCollection || !payload.data.user.repositories || payload.errors) {
      return NextResponse.json({ error: "Erro GraphQL.", details: payload.errors ?? null }, { status: 500 });
    }

    const contributionsCollection = payload.data.user.contributionsCollection;

    return NextResponse.json({
      contributions: contributionsCollection.contributionCalendar.totalContributions,
      commits:
        contributionsCollection.totalCommitContributions + contributionsCollection.restrictedContributionsCount,
      repos: payload.data.user.repositories.totalCount
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
