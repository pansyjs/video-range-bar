/**
 * 用于截取视频片段场景
 * author: chenguzhen87
 */
import './index.less';
export interface Config {
  id?: string;
  el?: HTMLElement;
  height?: number;
  background?: string;
  theme?: string;
  sliderWidth?: number;
  sliderOffsetLeft?: number;
  sliderOffsetRight?: number;
  startLeftSlider?: (value: number) => void;
  startRightSlider?: (value: number) => void;
  moveLeftSlider?: (value: number) => void;
  moveRightSlider?: (value: number) => void;
}
export default class VideoRangeBar {
  private el;
  private background;
  private height;
  private width;
  private left;
  private right;
  private sliderOffsetLeft;
  private sliderOffsetRight;
  private sliderWidth;
  private theme;
  private moveType;
  private sliderLeftBar;
  private sliderRightBar;
  private contentBar;
  startLeftSlider: (value: number) => void;
  startRightSlider: (value: number) => void;
  moveLeftSlider: (value: number) => void;
  moveRightSlider: (value: number) => void;
  constructor(config: Config);
  createTemplate(): void;
  start(e: MouseEvent | TouchEvent, moveType: number): void;
  end(): void;
  move(e: MouseEvent | TouchEvent): void;
  addEventListener(): void;
  getBoundingClientRect(): void;
}
