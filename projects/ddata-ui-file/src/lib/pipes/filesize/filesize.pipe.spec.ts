import { FilesizePipe } from './filesize.pipe';
import { pipe } from 'rxjs';

describe('filesize.pipe', () => {
  it('gets normal gb', () => {
    const pipe = new FilesizePipe();
    expect(pipe.transform(2147480648, 'gb', 0)).toBe(2);
  });

  it('gets abnormal mb', () => {
    const pipe = new FilesizePipe();
    expect(pipe.transform(214748, 'mb', 3)).toBe(0.205);
  });

  it('gets 0', () => {
    const pipe = new FilesizePipe();
    expect(pipe.transform(0, 'gb', 0)).toBe(0);
  });

  it('gets abnormal kb', () => {
    const pipe = new FilesizePipe();
    expect(pipe.transform(214748, 'kb', 1)).toBe(209.7);
  });

  it('gets null', () => {
    const pipe = new FilesizePipe();
    expect(pipe.transform(null, 'gb', 0)).toBe(null);
  });

  it('gets abnormal string', () => {
    const pipe = new FilesizePipe();
    expect(pipe.transform(2147483648, 'll', 0)).toBe(2147483648);
  });

});

