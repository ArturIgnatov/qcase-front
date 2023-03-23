declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISABLE_ESLINT_PLUGIN: string;
      REACT_APP_BUILD_TYPE: string;
      REACT_APP_BASE_URL: string;
    }
  }
}
export {};
