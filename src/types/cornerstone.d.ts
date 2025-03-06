declare module 'cornerstone-core' {
  interface EnabledElement {
    canvas: HTMLCanvasElement;
    image: any;
    viewport: any;
  }

  const cornerstone: {
    enable: (element: HTMLElement) => void;
    disable: (element: HTMLElement) => void;
    getImage: (element: HTMLElement) => any;
    getCanvas: (element: HTMLElement) => HTMLCanvasElement;
    loadAndCacheImage: (imageId: string) => Promise<any>;
    displayImage: (element: HTMLElement, image: any) => void;
    getEnabledElement: (element: HTMLElement) => EnabledElement;
    default: {
      enable: (element: HTMLElement) => void;
      disable: (element: HTMLElement) => void;
      getImage: (element: HTMLElement) => any;
      getCanvas: (element: HTMLElement) => HTMLCanvasElement;
      loadAndCacheImage: (imageId: string) => Promise<any>;
      displayImage: (element: HTMLElement, image: any) => void;
      getEnabledElement: (element: HTMLElement) => EnabledElement;
    };
  };
  export default cornerstone;
}

declare module 'cornerstone-tools' {
  interface ToolOptions {
    mouseEnabled?: boolean;
    touchEnabled?: boolean;
    globalToolSyncEnabled?: boolean;
    showSVGCursors?: boolean;
  }

  const cornerstoneTools: {
    init: (options?: ToolOptions) => void;
    addTool: (tool: any) => void;
    setToolActive: (toolName: string, options: { mouseButtonMask: number }) => void;
    setToolPassive: (toolName: string) => void;
    external: {
      cornerstone: any;
      Hammer: any;
    };
    WwwcTool: any;
    PanTool: any;
    ZoomTool: any;
    LengthTool: any;
    RectangleRoiTool: any;
    RotateTool: any;
    StackScrollTool: any;
    default: {
      init: (options?: ToolOptions) => void;
      addTool: (tool: any) => void;
      setToolActive: (toolName: string, options: { mouseButtonMask: number }) => void;
      setToolPassive: (toolName: string) => void;
      external: {
        cornerstone: any;
        Hammer: any;
      };
      WwwcTool: any;
      PanTool: any;
      ZoomTool: any;
      LengthTool: any;
      RectangleRoiTool: any;
      RotateTool: any;
      StackScrollTool: any;
    };
  };
  export default cornerstoneTools;
}

declare module 'cornerstone-wado-image-loader' {
  const cornerstoneWADOImageLoader: {
    external: {
      cornerstone: any;
      dicomParser: any;
    };
    configure: (config: { beforeSend: (xhr: XMLHttpRequest) => void }) => void;
    default: {
      external: {
        cornerstone: any;
        dicomParser: any;
      };
      configure: (config: { beforeSend: (xhr: XMLHttpRequest) => void }) => void;
    };
  };
  export default cornerstoneWADOImageLoader;
}

declare module 'dicom-parser' {
  const dicomParser: {
    default: any;
  };
  export default dicomParser;
}

declare module 'hammerjs' {
  const Hammer: {
    default: any;
  };
  export default Hammer;
} 