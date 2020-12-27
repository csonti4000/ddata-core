import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  public environment: any = {};

  constructor(@Inject('env') private env?: any) {
    this.environment = env ?? {};
  }
}
