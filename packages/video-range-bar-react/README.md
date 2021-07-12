# `video-range-bar-react`

## Preview Picture

![Preview Picture](https://cdn.jsdelivr.net/gh/wangxingkang/pictures@latest/imgs/20210707183938.png)

## 🏗 install

```sh
// npm 安装
npm install --save video-range-bar-react

// yarn 安装
yarn add video-range-bar-react
```

## 🔨 Usage

```tsx
import React, { useState } from 'react';
import VideoRangeBar from 'video-range-bar-react';

export default () => {
  const [config] = useState({
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
  return <VideoRangeBar config={config} />;
};
```
