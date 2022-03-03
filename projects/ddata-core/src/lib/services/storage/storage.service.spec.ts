
import 'zone.js/testing';
import { TestBed, inject, async } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { AppModule } from 'src/app/app.module';

xdescribe('StorageService', () => {
  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
}
    );
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // angular testing module that provides mocking for http connections
        HttpClientTestingModule,
      ],
      // add declaration of services or components and use inject to get to them in tests
      providers: [
        Injector,
        StorageService
      ],
    });
  }));
  beforeEach(() => {
    AppModule.InjectorInstance = TestBed;
    TestBed.inject(StorageService);
  });

  it('should be created', () => {
    const service: StorageService = TestBed.inject(StorageService);
    expect(service).toBeTruthy();
    service.clear();
    expect(localStorage.length).toBe(0);
  });

  it('setItem should add 1 item to localStorage', () => {
    const service: StorageService = TestBed.inject(StorageService);
    service.setItem('sample-key', 'sample text');
    expect(localStorage.length).toBe(1);
  });

  it('removeItem should remove the item from local storage', () => {
    const service: StorageService = TestBed.inject(StorageService);
    service.removeItem('sample-key');
    expect(localStorage.length).toBe(0);
  });

  it('clear should remove everything from local storage', () => {
    const service: StorageService = TestBed.inject(StorageService);
    service.setItem('sample-key1', 'sample text');
    service.setItem('sample-key2', 'sample text');
    service.setItem('sample-key3', 'sample text');
    expect(localStorage.length).toBe(3);
    service.clear();
    expect(localStorage.length).toBe(0);
  });
});
