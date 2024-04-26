/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPEN_WEATHER_API_BASE_URL: string;
  readonly VITE_OPEN_WEATHER_API_KEY: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_AZURE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
