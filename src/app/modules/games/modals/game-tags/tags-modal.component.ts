import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GenericInfo } from '../../state/games.interface';

@Component({
  selector: 'app-tags-modal',
  templateUrl: './tags-modal.component.html',
  styleUrls: ['./tags-modal.component.scss'],
})
export class GameTagsModal implements OnInit {
  @Input() tags: GenericInfo[];

  constructor(private modalContoller: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalContoller.dismiss();
  }
}
