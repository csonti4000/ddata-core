import { NgModule, Injector } from '@angular/core';

// @dynamic
@NgModule({
  declarations: [],
  imports: [],
  providers: [],
  exports: [],
})
export class DdataCoreModule {
  static InjectorInstance: Injector;

  constructor(injector: Injector) {
    DdataCoreModule.InjectorInstance = injector;
  }
}
