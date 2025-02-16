declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      email: string;
      auth_type: string;
    };
  }
  export interface Response {
    local: Record<string, string>;
  }
}
