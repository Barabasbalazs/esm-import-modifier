declare global {
  interface Window {
    onmessage: (event: MessageEvent) => void;
    close: () => void;
  }
}

export {};
