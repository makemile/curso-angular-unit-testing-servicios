import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

fdescribe('MasterService', () => {
  let master: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>
  beforeEach(() => {
    const spy = jasmine.createSpyObj('valuesService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy},
      ],
    });
    master = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

});
