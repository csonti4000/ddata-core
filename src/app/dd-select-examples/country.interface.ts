import { BaseModelInterface, ID, SelectableInterface } from 'ddata-core';

export interface CountryUIFieldsInterface {
  name: string;
}

export interface CountryInterface
  extends
    CountryUIFieldsInterface,
    BaseModelInterface<CountryInterface>,
    SelectableInterface {
      id: ID;
    }
