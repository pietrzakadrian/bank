import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";

// Import Entities
import { Template } from "../entities/template.entity";

export class TemplateService {
  templatesRepository: Repository<Template>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.templatesRepository = getManager().getRepository(Template);
  }

  /**
   * Inserts a new Template into the database.
   */
  async insert(template: Template): Promise<Template> {
    const newTemplate = this.templatesRepository.create(template);
    return await this.templatesRepository.save(newTemplate);
  }

  /**
   * Returns array of all templates from db
   */
  async getAll(): Promise<Template[]> {
    return await this.templatesRepository.find();
  }
}
