'use client';

import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { useServerInsertedHTML } from 'next/navigation';

const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  const isServerInserted = React.useRef<boolean>(false);
  
  useServerInsertedHTML(() => {
    // 避免 SSR 时重复插入样式
    if (isServerInserted.current) {
      return;
    }
    isServerInserted.current = true;
    return (
      <style 
        id="antd" 
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} 
      />
    );
  });
  
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default StyledComponentsRegistry; 