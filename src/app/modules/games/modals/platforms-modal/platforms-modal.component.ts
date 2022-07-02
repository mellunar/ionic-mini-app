import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Platform } from '../../state/games.interface';

@Component({
  selector: 'app-platforms-modal',
  templateUrl: './platforms-modal.component.html',
  styleUrls: ['./platforms-modal.component.scss'],
})
export class PlatformsModal implements OnInit {
  @Input() platforms: Partial<Platform>[];

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }
}
