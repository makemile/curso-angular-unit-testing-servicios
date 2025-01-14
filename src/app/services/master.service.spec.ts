import { MasterService } from './master.service';
import { ValueServiceFake } from './value-fake.service';
import { ValueService } from './value.service';

fdescribe('MasterService', () => {
  it('should return "my value" from the real service', () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('my value');
  });

  it('should return "other value" from the real service', () => {
    const fakeValueService = new ValueServiceFake();
    const masterService = new MasterService(
      fakeValueService as unknown as ValueService
    );
    expect(masterService.getValue()).toBe('fake value');
  });

  it('should return "other value" from the real service', () => {
    const fake = { getValue: () => 'fake from obj' };
    const masterService = new MasterService(fake as unknown as ValueService);
    expect(masterService.getValue()).toBe('fake from obj');
  });

  it('should return "other value" from the real service', () => {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fake value');
    const masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).toBe('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);

  });
});
