import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricCamnvasComponent } from './fabric-canvas.component';

describe('FabricCamnvasComponent', () => {
  let component: FabricCamnvasComponent;
  let fixture: ComponentFixture<FabricCamnvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FabricCamnvasComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricCamnvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
