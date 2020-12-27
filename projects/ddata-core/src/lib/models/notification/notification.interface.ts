import { NotificationType } from '../base/base-data.type';

export interface NotificationInterface {
  text: string;
  title: string;
  type: NotificationType;
  createdTime: Date;
}
