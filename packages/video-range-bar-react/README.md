# `video-range-bar-react`

## Preview Picture

![Preview Picture](https://cdn.jsdelivr.net/gh/wangxingkang/pictures@latest/imgs/20210707183938.png)

## đ install

```sh
// npm ĺŽčŁ
npm install --save video-range-bar-react

// yarn ĺŽčŁ
yarn add video-range-bar-react
```

## đ¨ Usage

```tsx
import React, { useState } from 'react';
import VideoRangeBar from 'video-range-bar-react';

export default () => {
  const [config] = useState({
    startLeftSlider(value) {
      // ĺˇŚćťĺćä¸ĺč°
    },
    startRightSlider(value) {
      // ĺłćťĺćä¸ĺč°
    },
    moveLeftSlider(value) {
      // ĺˇŚćťĺćĺ¨ĺč°
    },
    moveRightSlider(value) {
      // ĺłćťĺćĺ¨ĺč°
    },
  });
  return <VideoRangeBar config={config} />;
};
```
