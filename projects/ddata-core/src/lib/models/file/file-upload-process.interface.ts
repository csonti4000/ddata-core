import { Observable } from 'rxjs';

export interface FileUploadProcessInterface {
  /**
   * remote file datas - null until upload is in progress
   */
  remoteFileDatas: string;

  /**
   * local file name
   */
  file: string;

  /**
   * observable upload progress
   */
  progress: Observable<number>;
}
