/**
 * 用于截取视频片段场景
 */

import './index.less';

export interface Config {
  id?: string; // 容器id
  el?: HTMLElement; // dom 容器
  height?: number; // 容器高
  background?: string; // 容器背景色
  theme?: string; // 主题色
  sliderWidth?: number; // 滑块宽
  sliderOffsetLeft?: number; // 左边滑块到父容器距离 px
  sliderOffsetRight?: number; // 右边滑块到父容器距离 px
  startLeftSlider?: (value: number) => void;
  startRightSlider?: (value: number) => void;
  moveLeftSlider?: (value: number) => void;
  moveRightSlider?: (value: number) => void;
}

export default class VideoRangeBar {
  private el: HTMLElement;
  private background: string;
  private height: number;
  private width: number = 0;
  private left: number = 0;
  private right: number = 0;
  private sliderOffsetLeft: number;
  private sliderOffsetRight: number;
  private sliderWidth: number;
  private theme: string;
  private moveType: number = 0; // 0 不能移动  1：左边， 2： 右边

  private sliderLeftBar: HTMLElement; //左滑块
  private sliderRightBar: HTMLElement; //右滑块
  private contentBar: HTMLElement;

  startLeftSlider: (value: number) => void;
  startRightSlider: (value: number) => void;
  moveLeftSlider: (value: number) => void;
  moveRightSlider: (value: number) => void;

  constructor(config: Config) {
    const {
      id,
      el,
      height = 40,
      sliderWidth = 14,
      sliderOffsetLeft = 0,
      sliderOffsetRight = 0,
      theme = '#2d8cf0',
      background = 'transparent',
      startLeftSlider = function () {},
      startRightSlider = function () {},
      moveLeftSlider = function () {},
      moveRightSlider = function () {},
    } = config;

    const dom = el || (id && document.getElementById(id));
    if (!(dom instanceof HTMLElement)) {
      throw new Error(
        '[VideoRangeBar] element should be an instance of HTMLElement',
      );
    }

    this.el = dom;
    this.height = height;
    this.sliderOffsetLeft = sliderOffsetLeft;
    this.sliderOffsetRight = sliderOffsetRight;
    this.sliderWidth = sliderWidth;
    this.theme = theme;
    this.background = background;
    this.startLeftSlider = startLeftSlider;
    this.startRightSlider = startRightSlider;
    this.moveLeftSlider = moveLeftSlider;
    this.moveRightSlider = moveRightSlider;

    this.createTemplate();

    const sliderLeftDom = dom.querySelector(
      '.video-range-bar-left',
    ) as HTMLElement;
    const sliderRightDom = dom.querySelector(
      '.video-range-bar-right',
    ) as HTMLElement;

    const barContentDom = dom.querySelector(
      '.video-range-bar-content',
    ) as HTMLElement;

    this.sliderRightBar = sliderRightDom;
    this.sliderLeftBar = sliderLeftDom;
    this.contentBar = barContentDom;

    this.addEventListener();
    this.getBoundingClientRect();
  }

  createTemplate() {
    const {
      height,
      theme,
      sliderOffsetLeft,
      sliderOffsetRight,
      sliderWidth,
      background,
      el,
    } = this;

    const template = `<div class="video-range-bar" style="height:${height}px;background:${background}">
                        <div  class="video-range-bar-left" style="left:${sliderOffsetLeft}px;width:${sliderWidth}px;background:${theme}"></div>
                        <div class="video-range-bar-content"  style="left:${sliderOffsetLeft}px;right: ${sliderOffsetRight}px;border-color:${theme}"></div>
                        <div class="video-range-bar-right" style="right:${sliderOffsetRight}px;width:${sliderWidth}px;background:${theme}"></div>
                      </div>`;

    el.innerHTML = template;
  }

  // 鼠标按下或触摸开始
  start(moveType: number) {
    this.moveType = moveType;
    const { sliderOffsetLeft, sliderOffsetRight, width } = this;

    if (moveType == 1) {
      this.startLeftSlider(sliderOffsetLeft / width);
    }

    if (moveType == 2) {
      this.startRightSlider((width - sliderOffsetRight) / width);
    }
  }

  // 鼠标松开或触摸结束
  end() {
    if (this.moveType === 0) return;
    this.moveType = 0;
  }

  // 鼠标移动或触摸移动
  move(e: MouseEvent | TouchEvent) {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const {
      moveType,
      right,
      left,
      sliderOffsetLeft,
      sliderOffsetRight,
      sliderRightBar,
      sliderWidth,
      sliderLeftBar,
      width,
      contentBar,
    } = this;

    let range1 = clientX - left;
    let max1 = width - sliderOffsetRight - sliderWidth / 2;
    let range2 = right - clientX;
    let max2 = width - sliderOffsetLeft - sliderWidth / 2;

    switch (moveType) {
      case 0:
        return;
      // 左
      case 1:
        if (range1 <= 0) {
          sliderLeftBar.style.left = '0px';
          contentBar.style.left = '0px';
          this.sliderOffsetLeft = 0;
        } else if (range1 > max1) {
          sliderLeftBar.style.left = `${max1}px`;
          contentBar.style.left = `${max1}px`;
          this.sliderOffsetLeft = max1;
        } else {
          sliderLeftBar.style.left = `${range1}px`;
          contentBar.style.left = `${range1}px`;
          this.sliderOffsetLeft = range1;
        }

        this.moveLeftSlider(this.sliderOffsetLeft / width);

        break;
      // 右
      case 2:
        if (range2 <= 0) {
          sliderRightBar.style.right = '0px';
          contentBar.style.right = '0px';
          this.sliderOffsetRight = 0;
        } else if (range2 > max2) {
          sliderRightBar.style.right = `${max2}px`;
          contentBar.style.right = `${max2}px`;
          this.sliderOffsetRight = max2;
        } else {
          sliderRightBar.style.right = `${range2}px`;
          contentBar.style.right = `${range2}px`;
          this.sliderOffsetRight = range2;
        }

        this.moveRightSlider((width - this.sliderOffsetRight) / width);
        break;
    }
  }

  // 监听事件
  addEventListener() {
    const { sliderLeftBar, sliderRightBar } = this;
    const that = this;

    document.addEventListener('resize', function () {
      that.getBoundingClientRect();
    });

    // 设备兼容
    if ('ontouchstart' in document) {
      sliderLeftBar.addEventListener(
        'touchstart',
        function (e) {
          that.start(1);
        },
        false,
      );

      sliderRightBar.addEventListener(
        'touchstart',
        function (e) {
          that.start(2);
        },
        false,
      );

      document.addEventListener(
        'touchmove',
        function (e) {
          that.move(e);
        },
        false,
      );
      document.addEventListener(
        'touchend',
        function (e) {
          that.end();
        },
        false,
      );
    } else {
      sliderLeftBar.addEventListener(
        'mousedown',
        function (e) {
          that.start(1);
        },
        false,
      );

      sliderRightBar.addEventListener(
        'mousedown',
        function () {
          that.start(2);
        },
        false,
      );

      document.addEventListener(
        'mousemove',
        function (e) {
          that.move(e);
        },
        false,
      );
      document.addEventListener(
        'mouseup',
        function () {
          that.end();
        },
        false,
      );
    }
  }

  getBoundingClientRect() {
    const { left, right, width } = this.el.getBoundingClientRect();
    this.left = left;
    this.right = right;
    this.width = width;
  }
}
