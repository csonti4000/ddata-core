import { BaseModel, FieldContainerInterface, ID } from 'ddata-core';
import { AddressInterface, AddressUIFieldsInterface } from './address.interface';
import { CountryInterface } from './country.interface';
import { Country } from './country.model';
import { TagInterface } from './tag.interface';

export class Address extends BaseModel implements AddressInterface {
  readonly api_endpoint = '/api/address';
  readonly model_name = 'Address';
  id = 0 as ID;
  zip: string;
  settlement: string;
  street: string;
  country_id = 0;
  country: CountryInterface = new Country().init();
  tags: TagInterface[] = [];

  fields: FieldContainerInterface<AddressUIFieldsInterface> = {
    zip: undefined,
    settlement: undefined,
    street: undefined,
    country_id: {
      label: 'Country',
      title: 'Choose a country'
    },
    tags: {
      label: 'Tags',
      title: 'Choose one or more tags',
      placeholder: 'Choosed tags'
    }
  };
}
