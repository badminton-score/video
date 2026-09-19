# 羽毛球计分器 · 宣传视频

用 [Remotion](https://remotion.dev)（React 写视频）生成宣传视频、B 站封面和更新公告图。

## 有什么

| Composition | 内容 |
| --- | --- |
| `BadmintonVideo` | 宣传视频，1920×1080，97 秒 |
| `Cover` | B 站封面，1146×717 |
| `LaunchCard` | 竖版公告图，1080×1500 |

## 用法

```bash
npm install

npx remotion compositions
npx remotion still Cover out/cover.png
npx remotion still LaunchCard out/launch.png
npx remotion render BadmintonVideo out/badminton-2.0.mp4 --codec=h264 --crf=18
npx remotion studio          # 可视化编辑器
```

> 如果 `npx remotion` 报 `could not determine executable to run`，
> 是 npm 没建软链，手动补一下：
> ```bash
> mkdir -p node_modules/.bin
> ln -sf ../@remotion/cli/remotion-cli.js node_modules/.bin/remotion
> chmod +x node_modules/@remotion/cli/*-cli.js
> ```

## 关于背景音乐

**仓库里没有音乐**（版权原因）。渲染带声音的视频时，自己准备一个 mp3 放到项目根目录，
文件名要和 `src/BadmintonVideo.tsx` 里 `staticFile()` 引用的对上。

渲染出来的 MP4 已经带了音轨，可以直接发。

## 静态图注意

Remotion 的静态图（`remotion still`）**只渲染第 0 帧**，
所以 `Cover` 和 `LaunchCard` 里**不能用会从透明开始动画的组件**（比如 `FadeUp`），
否则元素会停在起始状态、整张图是空的。用普通 `div` 就行。

## 结构

```
src/
  theme.ts             配色（和 App 的 Theme.swift 一致）与时间轴
  anim.tsx             动效工具
  BadmintonVideo.tsx   宣传视频（8 个场景）
  Cover.tsx            B 站封面
  LaunchCard.tsx       竖版公告图
  Root.tsx             注册 composition
  index.ts             入口
public/                应用截图 + 音乐（音乐不在仓库里）
```

## 许可证

[MIT](LICENSE)
