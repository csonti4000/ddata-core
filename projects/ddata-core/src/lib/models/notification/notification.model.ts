import { NotificationType } from '../base/base-data.type';
import { NotificationInterface } from './notification.interface';

export class Notification implements NotificationInterface {
  text: string;
  title: string;
  type: NotificationType;
  createdTime: Date;

  // types: warning, danger, success
  constructor(text: string, title: string, type: NotificationType, seconds: number = 5) {
    this.text = text;
    this.title = title;
    this.type = type;
    this.createdTime = new Date();
    this.createdTime.setSeconds(this.createdTime.getSeconds() + seconds);
  }
}
