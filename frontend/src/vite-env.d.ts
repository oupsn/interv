/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_HOST: string
  readonly VITE_SERVER_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
/*

declare global {
  interface Window {
    server: Server<any>
  }
}
*/