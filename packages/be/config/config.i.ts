export interface AppConfig {
  name: string;
  mode: string;
  host: string;
  port: number;
}

export interface DatabaseConfig {
  database: string;
  name?: string;
  host?: string;
  user?: string;
  pass?: string;
  url: string;
}

export interface MailConfig {
  service: string;
  host: string;
  port: number;
  address?: string;
  pass?: string;
}

export interface JwtConfig {
  jwtSecret: string;
  expirationTime: number;
}
