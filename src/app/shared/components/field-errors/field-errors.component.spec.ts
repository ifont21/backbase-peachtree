import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { handlerProvider } from '@app/core/handlers/error-message.handler';
import { FieldErrorsComponent } from './field-errors.component';

describe('FieldErrorsComponent', () => {
  let component: FieldErrorsComponent;
  let fixture: ComponentFixture<FieldErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldErrorsComponent],
      providers: [handlerProvider],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should get an error message when field is required', () => {
      component.errors = { required: true };

      component.ngOnChanges();

      expect(component.errorMsg).toBe('This field is required');
    });

    it('should get an error message when field has a minimun number validation', () => {
      component.errors = { min: {} };

      component.ngOnChanges();

      expect(component.errorMsg).toBe('Negative numbers are not allowed');
    });

    it('should get an error message when message is coming as a property', () => {
      component.errors = { message: 'this field has errors' };

      component.ngOnChanges();

      expect(component.errorMsg).toBe('this field has errors');
    });
  });
});
