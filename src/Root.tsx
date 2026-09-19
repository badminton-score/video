import React from "react";
import { Composition } from "remotion";
import { BadmintonVideo } from "./BadmintonVideo";
import { LaunchCard } from "./LaunchCard";
import { Cover } from "./Cover";
import { SocialPreview } from "./SocialPreview";
import { FPS, TOTAL_FRAMES } from "./theme";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="BadmintonVideo"
      component={BadmintonVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition id="LaunchCard" component={LaunchCard} durationInFrames={1} fps={FPS} width={1080} height={1500} />
    <Composition id="Cover" component={Cover} durationInFrames={1} fps={FPS} width={1146} height={717} />
    {/* GitHub 仓库社交预览，官方建议 1280×640 */}
    <Composition id="SocialPreview" component={SocialPreview} durationInFrames={1} fps={FPS} width={1280} height={640} />
  </>
);
