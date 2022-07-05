import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Website } from 'src/app/modules/games/state/games.interface';

@Component({
  selector: 'app-websites-modal',
  templateUrl: './websites-modal.component.html',
  styleUrls: ['./websites-modal.component.scss'],
})
export class WebsitesModal implements OnInit {
  @Input() websites: Website[];

  sorted: Website[];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.sorted = this.websites.sort((a, b) => {
      if (a.category > b.category) {
        return 1;
      }

      if (a.category < b.category) {
        return -1;
      }

      return 0;
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
