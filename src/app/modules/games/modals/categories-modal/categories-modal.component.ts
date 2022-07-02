import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GenericInfo } from '../../state/games.interface';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.scss'],
})
export class CategoriesModal implements OnInit {
  @Input() tags: GenericInfo[];

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }
}
