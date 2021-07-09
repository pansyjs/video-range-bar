# video-range-bar

> 截取视频片段操作场景打造组件库

## Preview Picture

![Preview Picture](https://cdn.jsdelivr.net/gh/wangxingkang/pictures@latest/imgs/20210707183938.png)

## ✨ Features

- 💻 使用 TypeScript 编写，提供完善的类型定义
- 💻 支持移动和 pc 端
- 🚀 小巧，不到 10K 大小，Gzip 压缩后不到 3K
- 📦 提供`cjs`、`es`、`umd`三种格式
- 🎉 提供`Vue`、`React`组件包

## 🏗 Install

```
// npm
npm install video-range-bar --save

// yarn
yarn add video-range-bar
```

## 🔨 Usage

```html
<div id="video-range-bar"></div>
```

```js
import VideoRangeBar from 'video-range-bar';

new VideoRangeBar({
  id: 'video-range-bar',
  startLeftSlider(value) {
    // 左滑块按下回调
  },
  startRightSlider(value) {
    // 右滑块按下回调
  },
  moveLeftSlider(value) {
    // 左滑块拖动回调
  },
  moveRightSlider(value) {
    // 右滑块拖动回调
  },
});
```
