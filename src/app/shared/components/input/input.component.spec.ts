import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputControlComponent } from './input.component';

@Component({
  selector: 'app-form-component',
  template: ` <form [formGroup]="form">
    <app-input-control
      formControlName="input"
      placeHolder="enter value"
    ></app-input-control>
  </form>`,
})
class FormComponent {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      input: new FormControl(''),
    });
  }
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormComponent, InputControlComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should check the initial value', () => {
    const value = component.form.get('input').value;

    expect(value).toBe('');
  });

  it('should add a new value to our input', () => {
    component.form.get('input').setValue('Ana');

    expect(component.form.value.input).toBe('Ana');
  });

  it('should input be able to be disabled', () => {
    component.form.get('input').disable();

    expect(component.form.get('input').disabled).toBeTruthy();
  });

  it('should we add a new value by triggering the input event', () => {
    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('input', { target: { value: 'Ana' } });

    fixture.detectChanges();

    expect(component.form.value.input).toBe('Ana');
    expect(component.form.get('input').touched).toBeTruthy();
  });
});
