import { NODE_ENV_ENUM } from "@/types";

export const NODE_ENV = process.env.NODE_ENV as NODE_ENV_ENUM
export const SERVER_PORT = process.env.PORT || 3000;