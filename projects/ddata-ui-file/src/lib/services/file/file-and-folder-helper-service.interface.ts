import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface FileAndFolderHelperServiceInterface {
  icon: any;

  setFileType(typeString: string): IconDefinition;
}
