// Import Services
import { AdditionalService } from "../services/additionals.service";

// Import Entities
import { User } from "../entities/user.entity";

/**
 * performs dependencies of the welcome message
 */
export default async function enableWelcomeMessage(user: User) {
  try {
    const additionalService = new AdditionalService();
    const hasMessage: boolean = await additionalService.hasMessage(user);

    if (hasMessage) return;

    await additionalService.setMessage(user);
  } catch (error) {
    return Promise.reject(error);
  }
}
