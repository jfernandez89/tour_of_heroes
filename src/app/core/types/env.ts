export type Env = {
  /**
   * App version (should be autoloaded from package.json)
   */
  appVersion: string;

  /**
   * Determines if the app should be loaded in "production mode"
   */
  production: boolean;

  /**
   * API endpoint base URL
   */
  apiBaseUrl: string;
};
