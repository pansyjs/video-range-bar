import vue from 'rollup-plugin-vue';
export default {
  esm: 'rollup',
  cjs: 'rollup',
  umd: true,
  extraRollupPlugins: [vue()],
  pkgs: ['video-range-bar-react', 'video-range-bar-vue'],
};
