import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdditionalContentModal } from './additional-content-modal.component';

describe('AdditionalContentModal', () => {
  let component: AdditionalContentModal;
  let fixture: ComponentFixture<AdditionalContentModal>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalContentModal],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalContentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
