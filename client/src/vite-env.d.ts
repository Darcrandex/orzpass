/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_GITHUB_USERNAME: string
  readonly VITE_APP_REPOSITORY_NAME: string
  readonly VITE_APP_GITHUB_TOKEN: string
  readonly VITE_APP_ENCODE_TIMES: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
