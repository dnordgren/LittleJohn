export interface IMongoConfig {
  url: string;
}

export const development: IMongoConfig = {
  url: "mongodb://localhost:27017/watchlists",
};
