# Welcome to **RLE.wiki**

[![GitHub Watchers][badge-gh-watch]][repo]
[![GitHub Stars][badge-gh-stars]][repo]

## 内容

欢迎大家来到 RLE.wiki。这是一份给跨性别者与性别多元群体的 RLE 指南。更多帮助正在路上，敬请期待……

本项目由 Project Trans 团队发起，内容将包括 MtF、FtM、酷儿以及其他性别多元群体的 RLE 指导与探讨，欢迎大家一起建设本项目。

网站当前处于建设初期，条目暂未完成，欢迎大家帮助项目完善。

> 不向焦虑与抑郁投降，这个世界终会有我们存在的地方

## 致谢

感谢每一位参与本项目的人，无论是贡献文档代码，还是提交问题意见，是你们的贡献让更多人通过本项目获得帮助。

本项目目前采用 [VitePress][vitepress-url] 部署在 [Cloudflare Pages][wiki-url]。使用 [Nólëbase Integrations][nolebase-integrations-url] 提供的文档工程工具。以及其它未列举的现在或曾经使用的开源项目，对此表示感谢！

本项目在编写过程中参考了诸多资料，在此一并致谢。

## 版权声明

[![知识共享许可协议][cc-img]][cc-url]

除特别注明外，项目中除了代码部分均采用 [(Creative Commons BY-SA 4.0) 知识共享署名 - 相同方式共享 4.0 国际许可协议][cc-url] 进行许可。

换言之，使用过程中您可以自由地共享、演绎，但是必须署名、以相同方式共享、分享时没有附加限制，

而如果你想要引用这个 GitHub 仓库，可以使用如下的 BibTeX：

```plain
@misc{rlewiki,
  author = {Project Trans},
  title = {RLE.wiki},
  year = {2022},
  publisher = {GitHub},
  journal = {GitHub Repository},
  howpublished = {\url{https://github.com/project-trans/RLE-wiki}},
}
```

## 部署

### 项目代码

部分项目代码存放在 [vitepress-theme-project-trans](https://github.com/project-trans/vitepress-theme-project-trans) 仓库中，并通过 [npm 包](https://www.npmjs.com/package/@project-trans/vitepress-theme-project-trans) 的形式引入到项目。

RLE.wiki 将长期作为 `vitepress-theme-project-trans` 的预览测试场地，因此本组织的自动构建系统会在 `vitepress-theme-project-trans` 更新时自动将 RLE.wiki 的依赖版本升级并部署到生产环境中，而非使用本仓库中 `package.json` 声明的版本，拉取请求的预览部署亦会使用最新版本的 `vitepress-theme-project-trans`。

### 构建流程

我们不承诺 RLE.wiki 在生产环境中部署版本对于本仓库的可复现性。如欲复现生产环境，请在 GitHub Action 日志中查阅 `vitepress-theme-project-trans` 的版本并在本地开发环境中手动升级。

对于一般性开发，可直接使用以下命令升级将 `vitepress-theme-project-trans` 升级至最新版本。

```bash
pnpm update @project-trans/vitepress-theme-project-trans@prerelease
```

对于内容贡献，一般情况下可能不需要本地可复现的开发环境。

## 联系方式

GitHub [![GitHub issues][badge-gh-issues]](https://github.com/project-trans/RLE-wiki/issues/new/choose)

邮件 <rlewiki@project-trans.org>

[badge-gh-issues]: https://img.shields.io/github/issues/project-trans/RLE-wiki?style=flat-square
[badge-gh-stars]: https://img.shields.io/github/stars/project-trans/RLE-wiki.svg?style=flat-square&label=Stars
[badge-gh-watch]: https://img.shields.io/github/watchers/project-trans/RLE-wiki.svg?style=flat-square&label=Watch
[cc-img]: https://i.creativecommons.org/l/by-sa/4.0/88x31.png
[cc-url]: https://creativecommons.org/licenses/by-sa/4.0
[vitepress-url]: https://vitepress.dev
[nolebase-integrations-url]: https://nolebase-integrations.ayaka.io
[repo]: https://github.com/project-trans/RLE-wiki
[wiki-url]: https://rle.wiki
