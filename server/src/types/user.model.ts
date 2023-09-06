export type Issue = {
  id: number;
  number: number;
  title: string;
  body: string;
};

export type User = {
  _id: string;
  id: string;
  username: string;
  password: string;
  avatarUrl?: string;
};

export function issueToUser(issue: Issue): User {
  return {
    _id: issue.id.toString(),
    id: issue.number.toString(),
    username: issue.title,
    ...JSON.parse(issue.body || "{}"),
  };
}
