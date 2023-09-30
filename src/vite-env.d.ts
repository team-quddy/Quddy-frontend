/// <reference types="vite/client" />

declare interface HTMLElementEventMap {
  stretchHeight: CustomEvent;
}

interface ImportMetaEnv {
  readonly VITE_APP_SERVER_URL: string;
  readonly VITE_APP_CLIENT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMeta;
}
