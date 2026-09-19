/** 羽毛球计分器的配色，和 App 里 Theme.swift 保持一致。 */
export const COLORS = {
  bg: "#07080C",
  bgCard: "#12141C",
  bgCardSoft: "#1B1E28",

  text: "#FFFFFF",
  textDim: "#9AA1B4",
  textFaint: "#5F6678",

  /** 红方 */
  red: "#FF3D4D",
  redBright: "#FF8C84",
  redDeep: "#9E0A21",
  redPanel: "#2B0810",
  redPanelDeep: "#120608",

  /** 蓝方 */
  blue: "#3385FF",
  blueBright: "#8CD1FF",
  blueDeep: "#0854A8",
  bluePanel: "#071432",
  bluePanelDeep: "#040916",

  white: "#FFFFFF",
  line: "rgba(255,255,255,0.12)",
  lineSoft: "rgba(255,255,255,0.07)",
};

export const FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro SC", "PingFang SC", "Helvetica Neue", sans-serif';

export const FPS = 30;

/** 各场景的时间轴（帧）。 */
export const SCENES = {
  open:    { from: 0,    dur: 300 },   // 0:00 开场
  tap:     { from: 300,  dur: 390 },   // 0:10 一指计分
  minus:   { from: 690,  dur: 330 },   // 0:23 减分即撤回
  modes:   { from: 1020, dur: 420 },   // 0:34 六种计分模式
  custom:  { from: 1440, dur: 420 },   // 0:48 自定义规则
  doubles: { from: 1860, dur: 420 },   // 1:02 双打
  records: { from: 2280, dur: 330 },   // 1:16 对战记录
  outro:   { from: 2610, dur: 300 },   // 1:27 结尾
} as const;

export const TOTAL_FRAMES = SCENES.outro.from + SCENES.outro.dur;   // 2910 帧 = 97 秒
