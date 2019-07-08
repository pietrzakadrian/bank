import { getManager, Repository } from "typeorm";
import { Additional } from "../entities/additional.entity";
import { Logger, ILogger } from "../utils/logger";

export class AdditionalService {
  additionalRepository: Repository<Additional>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.additionalRepository = getManager().getRepository(Additional);
  }

  /**
   * Creates an instance of Additional.
   */
  instantiate(data: Object): Additional | undefined {
    return this.additionalRepository.create(data);
  }

  /**
   * Inserts a new Additional into the database.
   */
  async insert(data: Additional): Promise<Additional> {
    this.logger.info("Create a new additional", data);
    const newAdditional = this.additionalRepository.create(data);
    return await this.additionalRepository.save(newAdditional);
  }
}
