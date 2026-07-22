import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThanksPage } from './thanks.page';

describe('ThanksPage', () => {
  let component: ThanksPage;
  let fixture: ComponentFixture<ThanksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
