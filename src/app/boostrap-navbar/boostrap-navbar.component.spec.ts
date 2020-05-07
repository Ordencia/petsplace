import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoostrapNavbarComponent } from './boostrap-navbar.component';

describe('BoostrapNavbarComponent', () => {
  let component: BoostrapNavbarComponent;
  let fixture: ComponentFixture<BoostrapNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoostrapNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoostrapNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
