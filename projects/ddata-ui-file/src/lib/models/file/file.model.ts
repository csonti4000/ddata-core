// tslint:disable: variable-name
// tslint:disable-next-line: max-line-length
import { BaseModel, FieldContainerInterface, FileName, FileNameSlug, FileNameWithPath, FileSizeInByte, ID, MimeType, ValidationRuleInterface } from 'ddata-core';
import { fileText } from '../../i18n/file.lang';
import { FileModelInterface, FileModelUIFieldsInterface } from './file-model.interface';
import { Inject } from '@angular/core';
import { ModuleConfiguration } from '../module-configuration/module-configuration.interface';
import { FolderInterface } from 'projects/ddata-ui/src/lib/models/folder/folder.interface';
// import { Folder } from 'projects/ddata-ui/src/lib/models/folder/folder.model';

export class FileModel extends BaseModel implements FileModelInterface {
  @Inject('config') private config: ModuleConfiguration;
  readonly api_endpoint = '/file/';
  readonly model_name = 'FileModel';
  order: number; // only UI field
  id: ID;
  file_name_and_path: FileNameWithPath;
  file_name_slug: FileNameSlug;
  name: FileName;
  size: FileSizeInByte;
  mimetype: MimeType;
  folder_id: ID;
  is_image: boolean; // UI fields only
  is_primary = false;
  title: 'Fájl';

  folder: FolderInterface;

  validationRules: ValidationRuleInterface = {
    id: ['required', 'integer'],
    file_name_and_path: ['required', 'string'],
    file_name_slug: ['required', 'string'],
    name: ['required', 'string'],
    size: ['required', 'integer', 'not_zero'],
    mimetype: ['required', 'string'],
    folder_id: ['required', 'integer'],
  };

  fields: FieldContainerInterface<FileModelUIFieldsInterface>;

  init(data: any): FileModelInterface {
      data = !!data ? data : {};

      this.id = data.id ? data.id : 0;
      this.folder_id = data.folder_id ? data.folder_id : 0;
      this.name = data.name ? data.name : '';
      this.file_name_and_path = data.file_name_and_path ? data.file_name_and_path : '';
      this.file_name_slug = data.file_name_slug ? data.file_name_slug : '';
      this.size = data.size ? data.size : 0;
      this.mimetype = data.mimetype ? data.mimetype : '';
      this.is_primary = !!data.is_primary ? true : false;
      this.is_image = !!this.mimetype.match(/^image\//) ? true : false;

      // if (!!data.folder) {
      //   this.folder = new Folder().init(data.folder);
      // }

      return this;
  }

  prepareToSave(): any {
    return {
      id: this.id ? this.id : 0,
      folder_id: this.folder_id ? this.folder_id : 0,
      name: this.name ? this.name : '',
      file_name_and_path: this.file_name_and_path ? this.file_name_and_path : '',
      file_name_slug: this.file_name_slug ? this.file_name_slug : '',
      size: this.size ? this.size : 0,
      mimetype: this.mimetype ? this.mimetype : 'unknown',
      is_primary: this.is_primary ? true : false,
    };
  }
}
