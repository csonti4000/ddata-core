import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NotificationInterface, NotificationService } from 'ddata-core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'dd-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class DdataUiNotificationComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  // tslint:disable-next-line: variable-name
  _notifications: NotificationInterface[] = [];
  @Input() set notifications(notifications: NotificationInterface[]) {
    this._notifications = notifications;
  }

  noties: NotificationInterface[];

  constructor(
    private notificationService: NotificationService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscription = this.notificationService.watch().pipe(
      map((result: NotificationInterface[]) => {
        this.noties = result;
        this.ref.detectChanges();
      }),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  close(index: number): void {
    this.notificationService.delete(index);
  }

}
