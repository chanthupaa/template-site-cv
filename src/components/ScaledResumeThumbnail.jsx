import React, { useRef, useState, useEffect } from 'react';
import ResumeTemplate from './templates/ResumeTemplates';

const TEMPLATE_W = 794;
const TEMPLATE_H = 1123;

export default function ScaledResumeThumbnail({ templateId, data }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.35);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const calculateScale = () => {
      const { clientWidth } = currentContainer;
      if (clientWidth <= 0) return;
      setScale(clientWidth / TEMPLATE_W);
    };

    calculateScale();

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(calculateScale);
      ro.observe(currentContainer);
    } else {
      window.addEventListener('resize', calculateScale);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', calculateScale);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: TEMPLATE_W,
          height: TEMPLATE_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <ResumeTemplate data={data} variant={templateId} />
      </div>
    </div>
  );
}
