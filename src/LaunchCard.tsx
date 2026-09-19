import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONT } from "./theme";

const FEATURES: [string, string][] = [
  ["🗓", "六种计分模式"],
  ["🎛", "自定义规则"],
  ["👥", "单打 / 双打"],
  ["🔔", "到分自动判胜"],
  ["↩️", "减分即撤回"],
  ["📋", "对战记录"],
];

/** 发布公告图：1080 × 1500 */
export const LaunchCard: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: FONT }}>
    <AbsoluteFill style={{
      background:
        `radial-gradient(70% 38% at 18% 12%, ${COLORS.red}33 0%, transparent 62%),` +
        `radial-gradient(70% 38% at 82% 88%, ${COLORS.blue}33 0%, transparent 62%)`,
    }} />
    <div style={{ position: "absolute", inset: 0, padding: "58px 56px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div style={{ fontSize: 92 }}>🏸</div>
        <div>
          <div style={{ fontSize: 48, fontWeight: 800, color: COLORS.text, letterSpacing: 2 }}>羽毛球计分器</div>
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: "#07080C", padding: "5px 18px", borderRadius: 10, background: COLORS.blue }}>2.0</span>
            <span style={{ fontSize: 21, color: COLORS.textDim }}>自定义规则 · 双打 · 对战记录</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 42, fontSize: 18, fontWeight: 700, color: COLORS.blue, letterSpacing: 6 }}>本 次 更 新</div>
      <div style={{ marginTop: 18, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
        {/* 静态图只渲染第 0 帧，动画组件会停在起始状态（全透明），所以这里用普通元素 */}
        {FEATURES.map(([icon, title]) => (
          <div key={title} style={{
            display: "flex", alignItems: "center", gap: 18, padding: "14px 0",
            borderBottom: `1px solid ${COLORS.lineSoft}`,
          }}>
            <span style={{ fontSize: 30, width: 44, textAlign: "center" }}>{icon}</span>
            <span style={{ fontSize: 27, fontWeight: 700, color: COLORS.text }}>{title}</span>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 28, padding: "20px 24px", borderRadius: 18,
        background: COLORS.bgCard, border: `1px solid ${COLORS.line}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 21, color: COLORS.blueBright, fontWeight: 600 }}>github.com/badminton-score</span>
        <span style={{ fontSize: 18, color: COLORS.textFaint }}>开源免费 · MIT</span>
      </div>
    </div>
  </AbsoluteFill>
);
