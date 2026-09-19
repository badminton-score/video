import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, FONT } from "./theme";

/** B 站封面：1146 × 717 */
export const Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: FONT }}>
    <AbsoluteFill style={{
      background:
        `radial-gradient(58% 92% at 22% 18%, ${COLORS.red}44 0%, transparent 64%),` +
        `radial-gradient(58% 92% at 84% 84%, ${COLORS.blue}44 0%, transparent 64%)`,
    }} />
    <div style={{ position: "absolute", inset: 0, padding: "44px 48px", display: "flex", alignItems: "center", gap: 44 }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 52 }}>🏸</span>
          <span style={{ fontSize: 38, fontWeight: 700, color: COLORS.text }}>赛点</span>
          <span style={{ fontSize: 25, fontWeight: 800, color: "#07080C", background: COLORS.blue, padding: "4px 15px", borderRadius: 10 }}>2.2</span>
        </div>

        <div style={{ marginTop: 26, fontSize: 60, fontWeight: 800, color: COLORS.text, lineHeight: 1.16 }}>
          一块屏幕
          <br />
          <span style={{ color: COLORS.blueBright }}>把比分记清楚</span>
        </div>

        <div style={{ marginTop: 20, fontSize: 22, color: COLORS.textDim }}>
          六种规则 · 自定义分数 · 双打发球轮转
        </div>

        <div style={{ marginTop: 20, display: "flex", gap: 11 }}>
          {["一指计分", "减分即撤回", "对战记录"].map((t) => (
            <span key={t} style={{
              fontSize: 18, color: COLORS.blueBright, padding: "7px 16px", borderRadius: 10,
              background: "rgba(51,133,255,0.14)", border: `1px solid ${COLORS.line}`,
            }}>{t}</span>
          ))}
        </div>

        <div style={{ marginTop: 24, fontSize: 18, color: COLORS.textFaint, fontFamily: "ui-monospace, Menlo, monospace" }}>
          github.com/badminton-score/ios
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {[
          { src: "s-match.png", h: 320, off: 0 },
          { src: "s-doubles.png", h: 360, off: -12 },
        ].map((t) => (
          <div key={t.src} style={{
            height: t.h, aspectRatio: "1206 / 2622", overflow: "hidden", borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.14)", marginTop: t.off,
            boxShadow: "0 26px 60px rgba(0,0,0,0.65)", lineHeight: 0,
          }}>
            <Img src={staticFile(t.src)} style={{ width: "100%", display: "block" }} />
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);
