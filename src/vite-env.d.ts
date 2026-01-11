/// <reference types="vite/client" />
/// <reference types="vite-plugin-arraybuffer/types" />

declare module '*?arraybuffer' {
  const buffer: ArrayBuffer
  export default buffer
}