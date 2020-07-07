import { NotificationInterface } from './notification.interface';

export class Notification implements NotificationInterface {
    text: string;
    title: string;
    type: string;
    createdTime: Date;

    // types: warning, danger, success
    constructor(text: string, title: string, type: string) {
        this.text = text;
        this.title = title;
        this.type = type;
        this.createdTime = new Date();
        this.createdTime.setSeconds(this.createdTime.getSeconds() + 5);
    }
}
