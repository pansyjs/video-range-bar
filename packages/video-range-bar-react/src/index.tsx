import React, { useEffect, useRef } from 'react';
import VideoRangeBar, { Config } from 'video-range-bar';

const VideoRangeBarReact: React.FC<Config> = (params) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    new VideoRangeBar({ ...params, el: container.current as HTMLElement });
  }, [params]);

  return <div ref={container} />;
};

export default VideoRangeBarReact;
