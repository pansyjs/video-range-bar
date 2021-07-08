# `video-range-bar-vue`

![Preview Picture](https://cdn.jsdelivr.net/gh/wangxingkang/pictures@latest/imgs/20210707183938.png)

## install

```
// npm
npm install video-range-bar-vue --save

// yarn
yarn add video-range-bar-vue
```

## usage

// Global registry

```
import Vue from 'vue';
import VideoRangeBar from 'video-range-bar-vue';

Vue.use(VideoRangeBar);

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
