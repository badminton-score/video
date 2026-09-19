import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, FONT } from "./theme";

/** 仓库社交预览图：GitHub 建议 1280×640 */
export const SocialPreview: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: FONT }}>
    <AbsoluteFill style={{
      background:
        `radial-gradient(52% 90% at 14% 22%, ${COLORS.red}40 0%, transparent 62%),` +
        `radial-gradient(52% 90% at 88% 80%, ${COLORS.blue}40 0%, transparent 62%)`,
    }} />
    <div style={{ position: "absolute", inset: 0, padding: "52px 60px", display: "flex", alignItems: "center", gap: 48 }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Img src={staticFile("icon.png")}
               style={{ width: 66, height: 66, borderRadius: 16, display: "block",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }} />
          <span style={{ fontSize: 40, fontWeight: 700, color: COLORS.text }}>羽毛球计分器</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#07080C", background: COLORS.blue,
                         padding: "4px 14px", borderRadius: 9 }}>2.0</span>
        </div>

        <div style={{ marginTop: 28, fontSize: 56, fontWeight: 800, color: COLORS.text, lineHeight: 1.16 }}>
          一块屏幕
          <br />
          <span style={{ color: COLORS.blueBright }}>把比分记清楚</span>
        </div>

        <div style={{ marginTop: 22, fontSize: 23, color: COLORS.textDim }}>
          六种计分规则 · 自定义分数 · 单打双打 · 对战记录
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 12 }}>
          {["一指计分", "减分即撤回", "纯 SwiftUI"].map((t) => (
            <span key={t} style={{
              fontSize: 18, color: COLORS.blueBright, padding: "7px 16px", borderRadius: 10,
              background: "rgba(51,133,255,0.14)", border: `1px solid ${COLORS.line}`,
            }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
        {[
          { src: "s-match.png", h: 300, off: 8 },
          { src: "s-doubles.png", h: 340, off: -10 },
        ].map((t) => (
          <div key={t.src} style={{
            height: t.h, aspectRatio: "1206 / 2622", overflow: "hidden", borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.14)", marginTop: t.off,
            boxShadow: "0 24px 55px rgba(0,0,0,0.65)", lineHeight: 0,
          }}>
            <Img src={staticFile(t.src)} style={{ width: "100%", display: "block" }} />
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);
