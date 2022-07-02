import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlatformsModal } from './platforms-modal.component';

describe('PlatformsModalComponent', () => {
  let component: PlatformsModal;
  let fixture: ComponentFixture<PlatformsModal>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlatformsModal],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
