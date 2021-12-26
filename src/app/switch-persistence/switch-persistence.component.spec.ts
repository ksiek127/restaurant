import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchPersistenceComponent } from './switch-persistence.component';

describe('SwitchPersistenceComponent', () => {
  let component: SwitchPersistenceComponent;
  let fixture: ComponentFixture<SwitchPersistenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchPersistenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchPersistenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
