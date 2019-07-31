// Import Services
import { AdditionalService } from "../services/additionals.service";
import { ConfigService } from "../services/config.service";

// Import Entities
import { User } from "../entities/user.entity";

/**
 * performs dependencies of the welcome message
 */
export default async function enableWelcomeMessage(user: User) {
  const additionalService = new AdditionalService();
  const configService = new ConfigService();

  try {
    const hasMessage = await configService.getByName("WELCOME_MESSAGE");
    if (hasMessage) return;
  } catch (error) {
    return Promise.reject(error);
  }
}
