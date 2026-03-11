declare global {
  interface Window {
    __ytApiReady?: Promise<void>
  }
}

export {}
