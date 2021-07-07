# `video-range-bar`

## Preview Picture

![Preview Picture](/assets/preview.png)

## Usage

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

## Example

[video-range-bar](https://github.com/chenguzhen87/video-range-bar/blob/master/packages/video-range-bar/example/index.html)
