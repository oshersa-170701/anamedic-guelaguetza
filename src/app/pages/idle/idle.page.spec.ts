import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdlePage } from './idle.page';

describe('IdlePage', () => {
  let component: IdlePage;
  let fixture: ComponentFixture<IdlePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IdlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
