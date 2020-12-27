import { BaseModelInterface, FieldsInterface } from 'ddata-core';

export interface InputHelperServiceInterface {
  validateField(model: BaseModelInterface<any> & FieldsInterface<any>, field: string): boolean;
  getTitle(model: BaseModelInterface<any> & FieldsInterface<any>, field: string): string;
  getLabel(model: BaseModelInterface<any> & FieldsInterface<any>, field: string): string;
  getPlaceholder(model: BaseModelInterface<any> & FieldsInterface<any>, field: string): string;
  getPrepend(model: BaseModelInterface<any> & FieldsInterface<any>, field: string): string;
  getAppend(model: BaseModelInterface<any> & FieldsInterface<any>, field: string): string;
  isRequired(model: BaseModelInterface<any> & FieldsInterface<any>, field: string): boolean;
  randChars(): string;
}
