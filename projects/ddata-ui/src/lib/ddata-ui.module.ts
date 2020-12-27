import { NgModule, ModuleWithProviders, Injector } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// services
import { ProxyService } from 'ddata-core';

// module configuration
import { ModuleConfiguration } from './models/module-configuration/module-configuration.interface';

// models
import { FileModel } from './models/file/file.model';

// components
import { NoDataComponent } from './components/no-data/no-data.component';
import { FileListComponent } from './components/file/file-list/file-list.component';
import { FileUploadComponent } from './components/file/file-upload/file-upload.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FileListComponent,
    FileUploadComponent,
    NoDataComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    FileListComponent,
    FileUploadComponent,
    NoDataComponent,
  ],
  providers: [
    ProxyService,
  ]
})
export class DdataUiModule {
  static InjectorInstance: Injector;

  constructor(injector: Injector) {
    DdataUiModule.InjectorInstance = injector;
  }

  static forRoot(config: ModuleConfiguration): ModuleWithProviders<any> {
    return {
      ngModule: DdataUiModule,
      providers: [
        FileModel, { provide: 'config', useValue: config },
      ]
    };
  }
}
