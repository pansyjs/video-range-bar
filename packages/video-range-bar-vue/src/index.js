import VideoRangeBar from './VideoRangeBar.vue';

VideoRangeBar.install = function (Vue, options = {}) {
  Vue.component(
    options.name ? options.name : VideoRangeBar.name,
    VideoRangeBar,
  );
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VideoRangeBar);
}

export default VideoRangeBar;
