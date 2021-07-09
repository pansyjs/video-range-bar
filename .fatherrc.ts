import vue from 'rollup-plugin-vue';
export default {
  esm: 'rollup',
  cjs: 'rollup',
  umd: true,
  extraRollupPlugins: [vue()],
  pkgs: ['video-range-bar', 'video-range-bar-vue', 'video-range-bar-react'],
};
