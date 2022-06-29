import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GenericInfo } from '../../state/games.interface';

@Component({
  selector: 'app-game-tags',
  templateUrl: './game-tags.component.html',
  styleUrls: ['./game-tags.component.scss'],
})
export class GameTagsModal implements OnInit {
  @Input() tags: GenericInfo[];

  constructor(private modalContoller: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalContoller.dismiss();
  }
}
