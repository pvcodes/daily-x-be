export type TokenType = 'google-oauth' | 'basic';
export type NODE_ENV_ENUM = 'production' | 'development'

export interface GACCESS_TOKEN_RESPONSE {
  email: string;
  name: string;
  picture: string;
}
