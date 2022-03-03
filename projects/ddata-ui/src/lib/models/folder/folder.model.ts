// // import { BaseModel, FieldContainerInterface, ValidationRuleInterface, BaseModelInterface } from '../base-model/base-model.model';
// import { BaseModel, BaseModelInterface, Description, FieldContainerInterface, ID, URI, ValidationRuleInterface } from 'ddata-core';
// import { FolderInterface, FolderUIFieldsInterface } from './folder.interface';
// import {} from
// // import { FolderName, ID, Description, URI } from '../base-model/base-data-type.model';
// // import {
// //   parent_id,
// //   name,
// //   is_highlighted,
// //   uri,
// // } from '../../i18n/folder.lang';
// // import { description } from 'src/app/i18n/general.lang';

// export class Folder extends BaseModel implements BaseModelInterface<FolderUIFieldsInterface>, FolderInterface {
//   readonly api_endpoint = '/folder';
//   readonly model_name = 'Folder';
//   id: ID;
//   parent_id: ID;
//   name: string;
//   description: Description;
//   is_highlighted: boolean;
//   uri: URI;
//   title: 'Mappa';

//   validationRules: ValidationRuleInterface = {
//     parent_id: ['required', 'integer'],
//     name: ['required', 'string'],
//     description: ['nullable', 'string'],
//     is_highlighted: ['nullable'],
//     uri: ['required', 'string'],
//   };

//   fields: FieldContainerInterface<FolderUIFieldsInterface> = {};

//   init(data: any): FolderInterface {
//     data = !!data ? data : {};

//     this.id = data.id ? data.id : 0;
//     this.parent_id = data.parent_id ? data.parent_id : 0;
//     this.description = data.description ? data.description : '';
//     this.name = data.name ? data.name : '';
//     this.is_highlighted = data.is_highlighted ? true : false;
//     this.uri = data.uri ? data.uri : '';

//     return this;
//   }

//   prepareToSave() {
//     return {
//       id: this.id ? this.id : 0,
//       parent_id: this.parent_id ? this.parent_id : 0,
//       description: this.description ? this.description : '',
//       name: this.name ? this.name : '',
//       is_highlighted: this.is_highlighted ? true : false,
//       uri: this.uri ? this.uri : '',
//     };
//   }
//   }
