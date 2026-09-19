import React from "react";
import {
  AbsoluteFill, Audio, Img, Sequence, interpolate, spring,
  staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { COLORS, FONT, SCENES, TOTAL_FRAMES } from "./theme";
import { FadeUp, Kicker, Headline, SceneShell } from "./anim";

/** 手机截图外壳。截图为 1206×2622，按这个比例摆才不会变形。 */
const Shot: React.FC<{ src: string; height: number; delay?: number; width?: number }> = ({
  src, height, delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 70 } });
  return (
    <div style={{
      height, aspectRatio: "1206 / 2622", borderRadius: height * 0.075,
      overflow: "hidden", lineHeight: 0,
      border: "1px solid rgba(255,255,255,0.14)",
      boxShadow: "0 50px 130px rgba(0,0,0,0.75)",
      transform: `scale(${interpolate(t, [0, 1], [0.9, 1])})`,
      opacity: t,
    }}>
      <Img src={staticFile(src)} style={{ width: "100%", display: "block" }} />
    </div>
  );
};

/** 一方的比分面板（画出来的，用来演示加分） */
const Panel: React.FC<{
  side: "red" | "blue"; name: string; points: number; delay: number; serving?: boolean;
}> = ({ side, name, points, delay, serving }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 60 } });
  const base = side === "red" ? COLORS.red : COLORS.blue;
  const bright = side === "red" ? COLORS.redBright : COLORS.blueBright;
  return (
    <div style={{
      width: 470, borderRadius: 30, padding: "22px 26px 26px",
      background: `linear-gradient(180deg, ${side === "red" ? COLORS.redPanel : COLORS.bluePanel}, ${side === "red" ? COLORS.redPanelDeep : COLORS.bluePanelDeep})`,
      border: `1.5px solid ${base}55`,
      boxShadow: `0 30px 70px ${base}22`,
      opacity: interpolate(t, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(t, [0, 1], [40, 0])}px)`,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 26, fontWeight: 700, color: COLORS.text }}>{name}</span>
        {serving && (
          <span style={{
            fontSize: 15, fontWeight: 700, color: bright,
            padding: "5px 12px", borderRadius: 999,
            background: `${base}22`, border: `1px solid ${base}55`,
          }}>发球</span>
        )}
      </div>
      <div style={{ marginTop: 14, fontSize: 92, fontWeight: 800, color: COLORS.text, lineHeight: 1 }}>
        {points}
      </div>
      <div style={{ marginTop: 16, height: 5, borderRadius: 999, background: `${base}33`, overflow: "hidden" }}>
        <div style={{ width: `${(points / 21) * 100}%`, height: "100%", background: base, borderRadius: 999 }} />
      </div>
    </div>
  );
};

/* ─────────────────────────── 场景 ─────────────────────────── */

const SceneOpen: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={1.15} glowY={46}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <div style={{ fontSize: 130 }}>🏸</div>
      <div style={{ height: 26 }} />
      <FadeUp delay={10} distance={26}>
        <div style={{ fontSize: 96, fontWeight: 800, color: COLORS.text, letterSpacing: 4, fontFamily: FONT }}>
          赛点
        </div>
      </FadeUp>
      <div style={{ height: 22 }} />
      <FadeUp delay={26} distance={22}>
        <div style={{ fontSize: 30, color: COLORS.textDim, letterSpacing: 6, fontFamily: FONT }}>
          红蓝对抗 · 规则内置 · 一指计分
        </div>
      </FadeUp>
      <div style={{ height: 34 }} />
      <FadeUp delay={44} distance={20}>
        <div style={{
          fontSize: 24, fontWeight: 700, color: "#07080C", background: COLORS.blue,
          padding: "9px 26px", borderRadius: 14, fontFamily: FONT,
        }}>2.2</div>
      </FadeUp>
    </AbsoluteFill>
  </SceneShell>
);

const SceneTap: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  // 10 帧加一分，从 11 加到 18
  const step = Math.min(7, Math.floor(Math.max(0, frame - 60) / 26));
  return (
    <SceneShell duration={dur} glow={0.95} glowY={42}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Kicker delay={4}>加分</Kicker>
        <div style={{ height: 30 }} />
        <div style={{ display: "flex", gap: 40 }}>
          <Panel side="red" name="红方" points={11 + step} delay={14} serving />
          <Panel side="blue" name="蓝方" points={9} delay={22} />
        </div>
        <div style={{ height: 34 }} />
        <FadeUp delay={40} distance={20}>
          <div style={{ fontSize: 27, color: COLORS.textDim, fontFamily: FONT }}>
            整块面板都是按钮，不用瞄准小图标
          </div>
        </FadeUp>
      </AbsoluteFill>
    </SceneShell>
  );
};

const SceneMinus: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.95} glowY={42}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>减分</Kicker>
      <div style={{ height: 28 }} />
      <Headline delay={12} size={62}>加错了？点一下退回</Headline>
      <div style={{ height: 40 }} />
      <div style={{ display: "flex", gap: 40 }}>
        <Panel side="red" name="红方" points={12} delay={20} />
        <Panel side="blue" name="蓝方" points={9} delay={28} />
      </div>
      <div style={{ height: 36 }} />
      <FadeUp delay={48} distance={20}>
        <div style={{ fontSize: 26, color: COLORS.textDim, fontFamily: FONT }}>
          分不是「减」掉的，是<b style={{ color: COLORS.text }}>撤回上一次加分</b> —— 撤销重做随便退
        </div>
      </FadeUp>
    </AbsoluteFill>
  </SceneShell>
);

const MODES: [string, string][] = [
  ["21 分制", "正式比赛 · 三局两胜"],
  ["21 分长盘", "无封顶 · 必须净胜 2 分"],
  ["15 分制", "旧制 · 两局三胜"],
  ["11 分制", "旧制 · 三局两胜"],
  ["一局 21 分", "快速对战 · 一局定胜负"],
  ["自定义", "自己定分数与局数"],
];

const SceneModes: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.9} glowY={40}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Headline delay={6} size={62}>六种计分模式</Headline>
      <div style={{ height: 42 }} />
      <div style={{ display: "flex", gap: 26, alignItems: "flex-start" }}>
        <Shot src="s-home.png" height={430} delay={14} />
        <div style={{ width: 620, paddingTop: 6 }}>
          {MODES.map(([title, sub], i) => (
            <FadeUp key={title} delay={26 + i * 8} distance={18}>
              <div style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "11px 0", borderBottom: `1px solid ${COLORS.lineSoft}`,
              }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: COLORS.text, width: 150, fontFamily: FONT }}>{title}</span>
                <span style={{ fontSize: 19, color: COLORS.textDim, fontFamily: FONT }}>{sub}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  </SceneShell>
);

const SceneCustom: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.9} glowY={42}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>自定义</Kicker>
      <div style={{ height: 20 }} />
      <Headline delay={12} size={58}>想打几分就几分</Headline>
      <div style={{ height: 40 }} />
      <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
        <Shot src="s-custom.png" height={520} delay={20} />
        <div style={{ width: 560 }}>
          {[
            "每局几分 —— 5 到 50 随便调",
            "封顶可以关掉（必须净胜 2 分）",
            "也可以设成 目标分 +1 到 +20",
            "一局 / 三局 / 五局",
          ].map((t, i) => (
            <FadeUp key={t} delay={34 + i * 9} distance={18}>
              <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 16 }}>
                <span style={{ color: COLORS.blue, fontSize: 22 }}>·</span>
                <span style={{ fontSize: 26, color: COLORS.text, fontFamily: FONT }}>{t}</span>
              </div>
            </FadeUp>
          ))}
          <FadeUp delay={74} distance={18}>
            <div style={{ marginTop: 10, fontSize: 22, color: COLORS.textDim, fontFamily: FONT, lineHeight: 1.6 }}>
              改完立刻生效 —— 比如把 21 改成 11，<br />场上比分可能当场就分出胜负
            </div>
          </FadeUp>
        </div>
      </div>
    </AbsoluteFill>
  </SceneShell>
);

const SceneDoubles: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.95} glowY={42}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>单打 / 双打</Kicker>
      <div style={{ height: 24 }} />
      <Headline delay={12} size={58}>双打发球会轮转</Headline>
      <div style={{ height: 38 }} />
      <div style={{ display: "flex", gap: 56, alignItems: "center" }}>
        <Shot src="s-doubles.png" height={500} delay={20} />
        <div style={{ width: 560 }}>
          <FadeUp delay={34} distance={18}>
            <div style={{ fontSize: 27, color: COLORS.text, lineHeight: 1.7, fontFamily: FONT }}>
              发球方连续得分
              <br />
              <span style={{ color: COLORS.redBright }}>→ 同一个人继续发</span>
            </div>
          </FadeUp>
          <div style={{ height: 26 }} />
          <FadeUp delay={50} distance={18}>
            <div style={{ fontSize: 27, color: COLORS.text, lineHeight: 1.7, fontFamily: FONT }}>
              接发球方夺回发球权
              <br />
              <span style={{ color: COLORS.blueBright }}>→ 换这对里的另一个人发</span>
            </div>
          </FadeUp>
        </div>
      </div>
    </AbsoluteFill>
  </SceneShell>
);

const SceneRecords: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.9} glowY={42}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>对战记录</Kicker>
      <div style={{ height: 22 }} />
      <Headline delay={12} size={56}>打完自动记一笔</Headline>
      <div style={{ height: 34 }} />
      <div style={{ display: "flex", gap: 56, alignItems: "center" }}>
        <Shot src="s-records-select.png" height={480} delay={20} />
        <div style={{ width: 560 }}>
          {[
            "比分、用时、胜负，自动记下来",
            "点「选择」进多选，每行出现圆圈",
            "「全选」一次选中全部，一起删",
            "单条向左滑，右侧露出红色删除",
          ].map((t, i) => (
            <FadeUp key={t} delay={34 + i * 9} distance={18}>
              <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 16 }}>
                <span style={{ color: COLORS.blue, fontSize: 22 }}>·</span>
                <span style={{ fontSize: 25, color: COLORS.text, fontFamily: FONT }}>{t}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  </SceneShell>
);

/** 双平台 */
const ScenePlatforms: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={1.0} glowY={44}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>两个平台</Kicker>
      <div style={{ height: 24 }} />
      <Headline delay={12} size={58}>iPhone 和 Android 都有</Headline>
      <div style={{ height: 34 }} />
      <div style={{ display: "flex", gap: 70, alignItems: "flex-start" }}>
        {[
          { src: "s-home.png", label: "iPhone" },
          { src: "s-android-home.png", label: "Android" },
        ].map((t, i) => (
          <div key={t.label} style={{ textAlign: "center" }}>
            <Shot src={t.src} height={400} delay={22 + i * 10} />
            <div style={{ marginTop: 14, fontSize: 24, fontWeight: 700, color: COLORS.textDim, fontFamily: FONT }}>
              {t.label}
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 30 }} />
      <FadeUp delay={54} distance={20}>
        <div style={{ fontSize: 25, color: COLORS.textDim, fontFamily: FONT }}>
          功能一致 · 都开源 · 都不联网
        </div>
      </FadeUp>
    </AbsoluteFill>
  </SceneShell>
);

const SceneOutro: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 30, dur - 60, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <SceneShell duration={dur} glow={1.1} glowY={44}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", opacity: o }}>
        <div style={{ fontSize: 108 }}>🏸</div>
        <div style={{ height: 26 }} />
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.text, letterSpacing: 3, fontFamily: FONT }}>
          赛点
        </div>
        <div style={{ height: 18 }} />
        <div style={{ fontSize: 26, color: COLORS.textFaint, letterSpacing: 5, fontFamily: FONT }}>
          一指计分 · 规则内置
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

const MAP: [keyof typeof SCENES, React.FC<{ dur: number }>][] = [
  ["open", SceneOpen], ["tap", SceneTap], ["minus", SceneMinus], ["modes", SceneModes],
  ["custom", SceneCustom], ["doubles", SceneDoubles], ["records", SceneRecords],
  ["platforms", ScenePlatforms], ["outro", SceneOutro],
];

/** 场景交界处交叠的帧数。两边一起淡，就成了交叉溶解，不会中间黑一下。 */
const OVERLAP = 22;

export const BadmintonVideo: React.FC = () => (
  <>
    {/* 常驻背景。所有场景都盖在它上面，淡出时露出来的是它，不是空白。 */}
    <AbsoluteFill style={{
      backgroundColor: COLORS.bg,
      backgroundImage:
        `radial-gradient(48% 62% at 12% 18%, ${COLORS.red}14 0%, transparent 62%),` +
        `radial-gradient(48% 62% at 88% 82%, ${COLORS.blue}14 0%, transparent 62%)`,
    }} />

    <Audio
      src={staticFile("slowmotion.mp3")}
      volume={(f) =>
        interpolate(f, [0, 30, TOTAL_FRAMES - 90, TOTAL_FRAMES], [0, 1, 1, 0], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        })
      }
    />
    {MAP.map(([key, Comp], i) => {
      const { from, dur } = SCENES[key];
      // 除了最后一个场景，每个都往后多留 OVERLAP 帧给下一个场景淡入，
      // 于是两个场景有一段同时可见 —— 交叉溶解。
      const extra = i === MAP.length - 1 ? 0 : OVERLAP;
      return (
        <Sequence key={key} from={from} durationInFrames={dur + extra} name={key}>
          <Comp dur={dur + extra} />
        </Sequence>
      );
    })}
  </>
);
