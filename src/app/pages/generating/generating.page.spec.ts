import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneratingPage } from './generating.page';

describe('GeneratingPage', () => {
  let component: GeneratingPage;
  let fixture: ComponentFixture<GeneratingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
