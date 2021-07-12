import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'video-range-bar',
  favicon: 'https://i.loli.net/2021/07/12/nQa94Y18GvEAKBi.png',
  logo: 'https://i.loli.net/2021/07/12/nQa94Y18GvEAKBi.png',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: [
    {
      title: '文档',
      path: '/getting-started',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/chenguzhen87/video-range-bar',
    },
  ],
  // more config: https://d.umijs.org/config
});
