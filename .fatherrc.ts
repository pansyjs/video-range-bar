import { readdirSync } from 'fs';
import { join } from 'path';
import vue from 'rollup-plugin-vue';

const headPkgs: string[] = ['video-range-bar'];
const tailPkgs = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgs.includes(pkg),
);

export default {
  esm: 'rollup',
  cjs: 'rollup',
  umd: true,
  extraRollupPlugins: [vue()],
  pkgs: [...headPkgs, ...tailPkgs],
};
