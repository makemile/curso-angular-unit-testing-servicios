import { ValueService } from './value.service';
import { TestBed } from '@angular/core/testing';

fdescribe('ValueService', () => {
  let service: ValueService;

  //crear una instancia
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ValueService ]
    });
    service = TestBed.inject(ValueService);
  });

  describe('tests for getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('tests for getPromise', () => {
    it('should return "promise"', (doneFn) => {
      service.getPromiseValue().then((value: string) => {
        expect(value).toBe('value');
        doneFn();
      });
    });
  });
  it('should return "promise"', async () => {
    const rta = await service.getPromiseValue();
      expect(rta).toBe('value');
  });
});
