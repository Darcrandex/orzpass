# onzpass

> 这是一个基于 GitHub API 并以 GitHub 仓库作为数据库使用的，简单的在线密码管理工具。

## 参考项目

[react-blog-github](https://github.com/saadpasta/react-blog-github)

## 关于仓库

一个代码仓库相对于一个数据库；你可以使用一个私有仓库作为存储数据的仓库

## 关于 token

token 用于调用 github API，但 token 也是有安全性的。你可以选择一个永不过期的 token，也可以定期重新生成 token，然后更新部署（使用 netlify）。
[如何创建一个 token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

如何更新过期的 token

登录 GitHub 然后打开此路径
https://github.com/settings/tokens?type=beta

### 环境变量

不要将你的环境变量公开！
不要将你的环境变量公开！
不要将你的环境变量公开！

项目中的 `.env` 文件是用来提示用的。应该复制一份在本地（.env.local）。
部署时再配置环境变量。

## 接口功能

[GitHub REST API](https://docs.github.com/en/rest/quickstart?apiVersion=2022-11-28)
本来用了一个官方推荐的库 [octokit.js](https://github.com/octokit/octokit.js)，BUT，太 TM 垃圾了，各种报错，各种不兼容，索性参考 [curl](https://docs.github.com/en/rest/quickstart?apiVersion=2022-11-28#getting-started-using-curl)，用 axios 直接写接口

## ico 获取方法

google api

```
https://www.google.com/s2/favicons?domain=${domain}&sz=${size}

https://www.google.com/s2/favicons?sz=32&domain_url=stackoverflow.com
```

[Favicon Grabber](https://github.com/antongunov/favicongrabber.com)

## 数据

1. issue 对应 用户；其中给此类型的 issue 添加了 `wontfix` 这个 label；
2. comment 对应 note
3. 用户没有密码，用生成的 code 代替
4. note.password 的加密取决于 key，key 的值由用户自己定义，如果输入错误，密码则解析失败。key 值由用户自行保管
5. 数据安全；最遭的情况是别人拿到你的 token，然后恶意把你的数据库仓库搞坏了；但是他拿不到你的数据密码，因为他没有 key
