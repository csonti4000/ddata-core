import { NgModule, Injector, ErrorHandler } from '@angular/core';
import { DdataCoreErrorHandler } from './services/error-handler/app-error-handler';


@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: ErrorHandler, useClass: DdataCoreErrorHandler },
  ],
  exports: [],
})
export class DdataCoreModule {
  static InjectorInstance: Injector;

  constructor(injector: Injector) {
    DdataCoreModule.InjectorInstance = injector;
  }
}
