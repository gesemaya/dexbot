type DeployConfig = {
  nodeEnv: "development" | "production";
};
function getDeployConfig(): DeployConfig {
  const NODE_ENV = process.env.NODE_ENV;

  const config = NODE_ENV === "production" ? "production" : "development";

  return { nodeEnv: config };
}

// - - - - - - - //

type TelegramConfig = {
  botToken: string;
  adminChatId: string;
  errorChatId: string;
};
function getTelegramConfig(): TelegramConfig {
  const config: TelegramConfig = {
    botToken: process.env.TG_BOT_TOKEN ?? "",
    adminChatId: process.env.ADMIN_CHAT_ID ?? "",
    errorChatId: process.env.ERROR_CHAT_ID ?? "",
  };

  if (!config.botToken) throw new Error("Empty TG bot token");
  if (!config.adminChatId) throw new Error("Empty admin chat ID");
  if (!config.errorChatId) throw new Error("Empty error chat ID");

  return config;
}

// - - - - - - - //

type DatabaseConfig = {
  url: string;
  logging: boolean;
};
function getDatabaseConfig(): DatabaseConfig {
  const config: DatabaseConfig = {
    url: process.env.DB_URL ?? "",
    logging: Boolean(Number(process.env.DB_LOGS)) ?? false,
  };

  if (!config.url) throw new Error("Empty DB URL");

  return config;
}

// - - - - - - - //

/*
type RedisConfig = {
  url: string;
  prefix?: string;
};
function getRedisConfig(): RedisConfig {
  const config: RedisConfig = {
    url: process.env.REDIS_URL ?? "",
    prefix: process.env.PROJECT_NAME,
  };

  if (!config.url) throw new Error("Empty Redis URL");

  return config;
}
*/

// - - - - - - - //

export type BotConfig = {
  deploy: DeployConfig;
  telegram: TelegramConfig;
  database: DatabaseConfig;
  //redis: RedisConfig;
};
export function getConfig(): BotConfig {
  return {
    deploy: getDeployConfig(),
    telegram: getTelegramConfig(),
    database: getDatabaseConfig(),
    //redis: getRedisConfig(),
  };
}
