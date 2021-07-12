---
title: 快速上手
order: 1
toc: menu
nav:
  title: 文档
  path: /getting-started
---

## 🏗 原生模块安装

```
// npm
npm install video-range-bar --save

// yarn
yarn add video-range-bar
```

## 🔨 原生模块用法

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

## 🏗 Vue 组件库安装

```
// npm
npm install video-range-bar-vue --save

// yarn
yarn add video-range-bar-vue
```

## 🔨 Vue 组件库用法

// Global registry

```js
import Vue from 'vue';
import VideoRangeBar from 'video-range-bar-vue';

Vue.use(VideoRangeBar);
```

```
<template>
  <VideoRangeBar :config="config" />
</template>

<script>

export default {
  data() {
    return {
       config: {
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
       }
    };
  }
};
</script>
```

// Component registry

```
<template>
  <VideoRangeBar  :config="config" />
</template>

<script>
import VideoRangeBar from 'video-range-bar-vue';
export default {
  components: {
    VideoRangeBar
  },
  data() {
    return {
     config: {
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
     }
    };
  }
};
</script>

```

## 🏗 React 组件库安装

```sh
// npm 安装
npm install --save video-range-bar-react

// yarn 安装
yarn add video-range-bar-react
```

## 🔨 React 组件库用法

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
