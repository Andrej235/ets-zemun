/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AVAILABLE_LIBRE_LANGUAGES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
