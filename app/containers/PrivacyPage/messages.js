/*
 * PrivacyPage Messages
 *
 * This contains all the text for the PrivacyPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PrivacyPage';

export default defineMessages({
  helmetPrivacyTitle: {
    id: `${scope}.helmetPrivacyTitle`,
    defaultMessage: 'Privacy · Bank Application',
  },
  privacy: {
    id: `${scope}.privacy`,
    defaultMessage: 'Privacy',
  },
  rodo1: {
    id: `${scope}.rodo1`,
    defaultMessage:
      'According to art. 13 para. 1 and par. 2 of Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of individuals with regard to the processing of personal data and on the free movement of such data and repealing Directive 95/46 / EC (GDPR), we would like to inform you that: The administrator of your personal data is Adrian Pietrzak | contact[at]pietrzakadrian.com',
  },
  rodo2: {
    id: `${scope}.rodo2`,
    defaultMessage:
      'The pietrzakadrian.com website uses „cookies”. Cookies are small files that allow the device used to browse the Internet (eg a computer, smartphone, etc.) to store specific information about the device being used. nformation recorded in cookies is used, among others for advertising and statistical purposes and to adapt our services to your individual needs. You can change the settings for cookies in your web browser. If these settings remain unchanged, cookies will be saved in the device’s memory. Changing the settings for cookies may limit the functionality of the website.',
  },
  rodo3: {
    id: `${scope}.rodo3`,
    defaultMessage:
      'By sending us an e-mail message you confirm that the email address from which you are writing belongs to you.',
  },
  rodo4: {
    id: `${scope}.rodo4`,
    defaultMessage:
      'RODO grants data subjects the right to delete data, including the right to be forgotten. Pursuant to the provisions of the GDPR, such a person has the right, in the cases described in the GDPR, to request the administrator to delete their personal data immediately. In order to delete data, please contact the administrator via email.',
  },
});
