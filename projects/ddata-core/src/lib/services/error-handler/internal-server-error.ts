import { DdataCoreError } from './ddata-core-error';
import { NotificationService } from '../notification/notification.service';

export class InternalServerError extends DdataCoreError {

  constructor(
    originalError: any,
    notificationService: NotificationService,
  ) {
    super(originalError);
    console.error('Internal Server Error: ', originalError.error.message);
    notificationService.add('Hiba', 'Szerver hiba történt', 'danger');
  }

}
