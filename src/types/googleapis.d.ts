declare module "googleapis" {
  type AppendParams = {
    spreadsheetId: string;
    range: string;
    valueInputOption: "USER_ENTERED" | "RAW";
    requestBody: {
      values: string[][];
    };
  };

  type JWTConfig = {
    email: string;
    key: string;
    scopes: string[];
  };

  export const google: {
    auth: {
      JWT: new (config: JWTConfig) => unknown;
    };
    sheets: (config: { version: "v4"; auth: unknown }) => {
      spreadsheets: {
        values: {
          append: (params: AppendParams) => Promise<unknown>;
        };
      };
    };
  };
}
