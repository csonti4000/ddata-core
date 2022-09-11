import { BaseModelInterface, ID } from 'ddata-core';
import { CountryInterface } from './country.interface';
import { TagInterface } from './tag.interface';

export interface AddressUIFieldsInterface {
  zip: string;
  settlement: string;
  street: string;
  country_id: number;
  tags: TagInterface[];
}

export interface AddressInterface
  extends
    AddressUIFieldsInterface,
    BaseModelInterface<AddressInterface> {
      id: ID;
      country: CountryInterface;
    }
