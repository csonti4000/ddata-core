import { DdataCoreError } from './ddata-core-error';
import { NotificationService } from '../notification/notification.service';

export class ThirdPartyError extends DdataCoreError {
  constructor(
    originalError: any,
    notificationService: NotificationService,
  ) {
    super(originalError);

    console.error('580 - Api message: ', originalError.error);

    notificationService.add('Hiba', originalError.error, 'danger');

  }

}
