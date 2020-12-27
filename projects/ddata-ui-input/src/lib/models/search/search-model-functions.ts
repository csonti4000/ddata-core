// tslint:disable: variable-name
import { faCog, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BaseModel, ID } from 'ddata-core';
import { IconSetInterface } from '../icon-set/icon-set.interface';

export class SearchModelFunctions extends BaseModel {
  id: ID;
  name: string;
  description: string;
  type: string;
  found_model_name: string;
  icon: IconDefinition;
  url: string;
  icons: IconSetInterface = {
    cog: faCog,
  };

  init(data?: any): any {
    data = !!data ? data : {};

    this.id = !!data.id ? data.id : 0;
    this.name = !!data.name ? data.name : '';
    this.description = !!data.description ? data.description : '';
    this.type = !!data.type ? data.type : '';
    this.found_model_name = !!data.found_model_name ? data.found_model_name : '';
    this.icon = this.setIcon(this.type);
    this.url = this.setUrl(this.type);

    return this;
  }

  protected setUrl(type: string): string {
    return type.replace(new RegExp(/_/, 'g'), '/');
  }

  protected setIcon(type: string): IconDefinition {
    if (!type) {
      return this.icons.cog;
    }

    return this.icons[type] ?? this.icons.cog;
  }
}
