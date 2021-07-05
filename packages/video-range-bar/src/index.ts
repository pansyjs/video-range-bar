/**
 * 用于截取视频片段场景
 */

import './index.less';

export interface Config {
  id?: string;
  el?: HTMLElement;
  height?: number;
  theme?: string;
  sliderWidth?: number;
  sliderOffsetLeft?: number; // 左边滑块到父容器距离 px
  sliderOffsetRight?: number; // 右边滑块到父容器距离 px
  dragLeft?: (value: number) => void;
  dragRight?: (value: number) => void;
}

export default class VideoRangeBar {
  private el: HTMLElement;
  private height: number;
  private sliderOffsetLeft: number;
  private sliderOffsetRight: number;
  private sliderWidth: number;
  private theme: string;
  private moveType: number = 0; // 0 不能移动 1 移动 2：左边， 3： 右边
  private preX: number = 0;

  constructor(config: Config) {
    const {
      id,
      el,
      height = 80,
      sliderWidth = 14,
      sliderOffsetLeft = 0,
      sliderOffsetRight = 0,
      theme = '#2d8cf0',
    } = config;

    const dom = el || (id && document.getElementById(id));
    if (!(dom instanceof HTMLElement)) {
      throw new Error(
        '[VideoRangeBar] element should be an instance of HTMLElement',
      );
    }

    this.el = el as HTMLElement;
    this.height = height;
    this.sliderOffsetLeft = sliderOffsetLeft;
    this.sliderOffsetRight = sliderOffsetRight;
    this.sliderWidth = sliderWidth;
    this.theme = theme;

    this.createTemplate();
    this.addEventListener();
  }

  createTemplate() {
    const { height, sliderOffsetLeft, sliderOffsetRight, sliderWidth, el } =
      this;

    const template = `<div class="video-range-bar" style="${height}">
                    <div  class="video-range-bar-left" style="left:${
                      sliderOffsetLeft - sliderWidth / 2
                    }px"></div>
                    <div class="video-range-bar-content"  style="left:${sliderOffsetLeft}px,right: ${sliderOffsetRight}px"></div>
                    <div class="video-range-bar-right" style="right:${
                      sliderOffsetRight - sliderWidth / 2
                    }px"></div>
                    </div>`;

    el.innerHTML = template;
  }

  // 鼠标按下
  mouseDown(e: MouseEvent, moveType: number) {
    const { clientX } = e;
    this.moveType = moveType;
    this.preX = clientX;
  }

  // 鼠标松开
  mouseUp() {
    this.preX = 0;
    if (this.moveType === 0) return;
    this.moveType = 0;
  }

  // 鼠标移动
  mouseMove(e: MouseEvent) {
    const { clientX } = e;
    let range = clientX - this.preX;
    if (range < 0) {
    }
  }

  // 触摸开始
  touchStart(e: TouchEvent, type: number) {
    const { touches } = e;
    this.moveType = type;
    this.preX = touches[0].clientX;
  }
  // 触摸移动
  touchMove(e: TouchEvent) {
    const { touches } = e;
  }

  // 触摸结束
  touchEnd() {
    this.mouseUp();
  }

  // 监听事件
  addEventListener() {
    const { el } = this;
    const that = this;
    const sliderLeftDom = el.querySelector(
      '.video-range-bar-left',
    ) as HTMLElement;
    const sliderRightDom = el.querySelector(
      '.video-range-bar-right',
    ) as HTMLElement;

    // 设备兼容
    if ('ontouchstart' in document) {
      sliderLeftDom.addEventListener(
        'touchstart',
        function (e) {
          that.touchStart(e, 2);
        },
        false,
      );

      sliderRightDom.addEventListener(
        'touchstart',
        function (e) {
          that.touchStart(e, 3);
        },
        false,
      );

      document.addEventListener(
        'touchmove',
        function (e) {
          that.touchMove(e);
        },
        false,
      );
      document.addEventListener(
        'touchend',
        function (e) {
          that.touchEnd();
        },
        false,
      );
    } else {
      sliderLeftDom.addEventListener(
        'mousedown',
        function (e) {
          that.mouseDown(e, 2);
        },
        false,
      );

      sliderRightDom.addEventListener(
        'mousedown',
        function (e) {
          that.mouseDown(e, 3);
        },
        false,
      );

      document.addEventListener(
        'mousemove',
        function (e) {
          that.mouseMove(e);
        },
        false,
      );
      document.addEventListener(
        'mouseup',
        function (e) {
          that.mouseUp();
        },
        false,
      );
    }
  }

  /**
   * 获取点击的位置坐标
   * @param e
   */
  getPosition(e: TouchEvent | MouseEvent) {
    if (!(e.currentTarget instanceof Element)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    return { x: clientX - rect.left };
  }
}
