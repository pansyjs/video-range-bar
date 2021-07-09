import React, { useEffect, useRef } from 'react';
import VideoRangeBarNative, { Config } from 'video-range-bar';

export interface Props {
  config: Config;
}

const VideoRangeBar: React.FC<Props> = ({ config = {} }) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    new VideoRangeBarNative({
      ...config,
      el: container.current as HTMLElement,
    });
  }, []);

  return <div ref={container} />;
};

export default VideoRangeBar;
