import { Type } from '@angular/core';

export class DialogContentItem {
  constructor(public component: Type<any>, public data: any) {}
}

export class DialogContentWithOptions {
  constructor(public component: Type<any>, public options: any) {}
}
