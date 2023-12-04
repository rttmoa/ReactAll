import { NavigateFunction } from "react-router-dom";

// d.ts 仅供 声明类型
declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string;
  }
  interface Window {
    $navigate: NavigateFunction;
    EyeDropper: new () => {
      open(options?: { signal: AbortSignal }): Promise<{ sRGBHex: string }>;
    };
  }
}

export {};
