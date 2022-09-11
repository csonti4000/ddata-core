import { Injectable } from '@angular/core';
import { CountryInterface } from './country.interface';
import { COUNTRIES } from './country.mock-data';
import { Country } from './country.model';
import { TagInterface } from './tag.interface';
import { TAGS } from './tag.mock-data';
import { Tag } from './tag.model';

@Injectable({ providedIn: 'root' })
export class DdSelectExampleService {
  getAllCountry(): CountryInterface[] {
    const countries: CountryInterface[] = [];
    const rawCountries = COUNTRIES;

    rawCountries.forEach(rawData => {
      countries.push(new Country().init(rawData));
    });

    return countries;
  }

  getAllTags(): TagInterface[] {
    const tags: TagInterface[] = [];
    const rawTags = TAGS;

    rawTags.forEach(rawData => {
      tags.push(new Tag().init(rawData));
    });

    return tags;
  }
}
