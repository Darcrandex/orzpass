# orzpass v2

1. 前后端合并
2. UI 替换

## 数据请求方案

- 首先真正的数据请求使用[route handler](https://nextjs.org/docs/app/api-reference/file-conventions/route) 触发；前端只负责准备参数；这样做是为了保密 `github-token`

- 页面渲染，由于页面的内容比较简单，所有的路由页面全部使用前端渲染；`app-router`也就只负责路由层的管理
- git-api 使用 [octokit](https://www.npmjs.com/package/octokit)

## jwt

很奇怪，在 `route.ts` 中可以使用 `jsonwebtoken`，但是在 `middleware.ts` 中却无法使用。替代方案是使用[jose](https://www.npmjs.com/package/jose)

参考
[Middleware not working with jsonwebtoken after update](https://github.com/vercel/next.js/discussions/38202)
