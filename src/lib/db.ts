import { Octokit } from 'octokit'

export const db = new Octokit({
  auth: process.env.NEXT_APP_GITHUB_TOKEN,
})
