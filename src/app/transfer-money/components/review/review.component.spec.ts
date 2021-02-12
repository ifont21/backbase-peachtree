import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewComponent } from './review.component';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('closeDialog', () => {
    it('should emit dialog is close', () => {
      spyOn(component.closeDialog, 'emit').and.callThrough();

      component.close();

      expect(component.closeDialog.emit).toHaveBeenCalled();
    });
  });

  describe('sendTransfer', () => {
    it('should emit transfer when this is called', () => {
      spyOn(component.sendTransfer, 'emit').and.callThrough();

      component.addTransfer();

      expect(component.sendTransfer.emit).toHaveBeenCalled();
    });
  });
});
