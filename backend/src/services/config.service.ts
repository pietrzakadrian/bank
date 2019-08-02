import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";

// Import Entities
import { Config } from "../entities/config.entity";

export class ConfigService {
  configRepository: Repository<Config>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.configRepository = getManager().getRepository(Config);
  }

  /**
   * Inserts a new config into the database.
   */
  async insert(config: Config): Promise<Config> {
    const newConfig = this.configRepository.create(config);
    return await this.configRepository.save(newConfig);
  }

  /**
   * Returns array of all configs from db
   */
  async getAll(): Promise<Config[]> {
    return await this.configRepository.find();
  }

  /**
   * Returns a config by name
   */
  async getByName(name: string): Promise<Config | undefined> {
    try {
      const config: Config = await this.configRepository.findOne({
        where: { name }
      });
      if (config) {
        return config;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
