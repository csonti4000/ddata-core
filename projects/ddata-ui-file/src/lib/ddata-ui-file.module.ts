import { CommonModule } from '@angular/common';
import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DdataCoreModule } from 'ddata-core';
import { DdataUiFileListComponent } from './components/file-list/file-list.component';
import { DdataUiFileUploadComponent } from './components/file-upload/file-upload.component';
import { FileModel } from './models/file/file.model';
import { ModuleConfiguration } from './models/module-configuration/module-configuration.interface';

@NgModule({
  declarations: [
    DdataUiFileListComponent,
    DdataUiFileUploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    DdataCoreModule,
    DdataUiCommonModule
  ],
  exports: [
    DdataUiFileListComponent,
    DdataUiFileUploadComponent,
  ]
})
export class DdataUiFileModule {
  static InjectorInstance: Injector;

  constructor(injector: Injector) {
    DdataUiFileModule.InjectorInstance = injector;
  }

  static forRoot(config: ModuleConfiguration): ModuleWithProviders<any> {
    return {
      ngModule: DdataUiFileModule,
      providers: [
        FileModel, { provide: 'config', useValue: config },
      ]
    };
  }
}
