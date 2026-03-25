import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStand } from './admin-stand';

describe('AdminStand', () => {
  let component: AdminStand;
  let fixture: ComponentFixture<AdminStand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStand],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStand);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
