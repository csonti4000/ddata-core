import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BaseModelInterface } from '../../models/base/base-model.model';
import { NotificationInterface } from '../../models/notification/notification.interface';
import { Notification } from '../../models/notification/notification.model';
import { NotificationServiceInterface } from './notification-service.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements NotificationServiceInterface {
  private notifications: NotificationInterface[] = [];
  private notificationSub: Subject<NotificationInterface[]> = new Subject<NotificationInterface[]>();

  constructor() { }

  add(title: string, text: string, type: string): void {
    const notificationModel: NotificationInterface = new Notification(text, title, type);

    setTimeout(() => {
      this.delete( this.notifications.indexOf(notificationModel));
    }, 7000);

    this.notifications.push(notificationModel);
    this.notificationSub.next(this.notifications);
  }

  watch(): Observable<NotificationInterface[]> {
    return this.notificationSub.asObservable();
  }

  delete(index: number): void {
    this.notifications.splice(index, 1);
    this.notificationSub.next(this.notifications);
  }

  showValidationError(fields: BaseModelInterface<any>): void {
    this.add('Hiba', 'A következő mezők rosszul lettek kitöltve:<br>' + fields.getValidatedErrorFields().join(', '), 'danger');
  }
}
