import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";

// Import Entities
import { Language } from "../entities/language.entity";

export class LanguageService {
  languagesRepository: Repository<Language>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.languagesRepository = getManager().getRepository(Language);
  }

  /**
   * Inserts a new Language into the database.
   */
  async insert(language: Language): Promise<Language> {
    this.logger.info("Create a new language", language);
    const newLanguage = this.languagesRepository.create(language);
    return await this.languagesRepository.save(newLanguage);
  }

  /**
   * Returns array of all languages from db
   */
  async getAll(): Promise<Language[]> {
    return await this.languagesRepository.find();
  }

  /**
   * Returns a language by code
   */
  async getByCode(code: string): Promise<Language | undefined> {
    try {
      const language: Language = await this.languagesRepository.findOne({
        where: { code }
      });
      if (language) {
        return language;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
