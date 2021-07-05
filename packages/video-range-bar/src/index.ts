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

  addEventListener() {
    const { el } = this;

    const sliderLeftDom = el.querySelector(
      '.video-range-bar-left',
    ) as HTMLElement;
    const sliderRightDom = el.querySelector(
      '.video-range-bar-right',
    ) as HTMLElement;

    let self = this;
    const touchstartFun = (e: TouchEvent | MouseEvent) => {
      e.preventDefault();
      const po = self.getPosition(e);
      if (!po) return;
    };
    const touchmoveFun = (e: TouchEvent | MouseEvent) => {
      if (self.isActive) {
        const po = self.getPosition(e);
        if (!po) return;
        self.updateCanvas(po);
      }
    };
    const touchendFun = (_e: TouchEvent | MouseEvent) => {
      if (self.isActive) {
        self.isActive = false;
        self.draw();
        // 这里应该把数据传出去
        // 重制绘图
        self.onChange(self.getPassword());
        self.initCanvas();
      }
    };

    // 设备兼容
    if ('ontouchstart' in document) {
      sliderLeftDom.addEventListener('touchstart', touchstartFun, false);
      document.addEventListener('touchmove', touchmoveFun, false);
      document.addEventListener('touchend', touchendFun, false);
    } else {
      sliderLeftDom.addEventListener('mousedown', touchstartFun, false);
      document.addEventListener('mousemove', touchmoveFun, false);
      document.addEventListener('mouseup', touchendFun, false);
    }
  }

  /**
   * 获取点击的位置坐标
   * @param e
   */
  getPosition(e: TouchEvent | MouseEvent): Coordinate | void {
    if (!(e.currentTarget instanceof Element)) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }
}
