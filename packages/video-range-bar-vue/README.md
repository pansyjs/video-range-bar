# `video-range-bar-vue`

![Preview Picture](https://cdn.jsdelivr.net/gh/wangxingkang/pictures@latest/imgs/20210707183938.png)

## π install

```
// npm
npm install video-range-bar-vue --save

// yarn
yarn add video-range-bar-vue
```

## π¨ usage

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
                // ε·¦ζ»εζδΈεθ°
            },
            startRightSlider(value) {
                // ε³ζ»εζδΈεθ°
            },
            moveLeftSlider(value) {
                // ε·¦ζ»εζε¨εθ°
            },
            moveRightSlider(value) {
                // ε³ζ»εζε¨εθ°
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
            // ε·¦ζ»εζδΈεθ°
        },
        startRightSlider(value) {
            // ε³ζ»εζδΈεθ°
        },
        moveLeftSlider(value) {
            // ε·¦ζ»εζε¨εθ°
        },
        moveRightSlider(value) {
            // ε³ζ»εζε¨εθ°
        },
     }
    };
  }
};
</script>

```
