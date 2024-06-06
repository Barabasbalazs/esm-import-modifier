declare global {
  interface Window {
    onmessage: (event: MessageEvent) => void;
    postMessage: (mesage: string) => void;
    close: () => void;
  }
}

export {};
