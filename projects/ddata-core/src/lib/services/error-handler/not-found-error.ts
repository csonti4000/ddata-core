import { DdataCoreError } from './ddata-core-error';
import { NotificationService } from '../notification/notification.service';

export class NotFoundError extends DdataCoreError {

  constructor(
    originalError: any,
    notificationService: NotificationService,
  ) {
    super(originalError);
    console.error('Not Found Error: ', originalError.error.message);
    notificationService.add('Hiba', 'A keresett oldal nem található.', 'danger');
  }

}
