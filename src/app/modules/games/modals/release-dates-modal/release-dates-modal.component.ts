import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReleaseDate } from '../../state/games.interface';

@Component({
  selector: 'app-release-dates-modal',
  templateUrl: './release-dates-modal.component.html',
  styleUrls: ['./release-dates-modal.component.scss'],
})
export class ReleaseDatesModal implements OnInit {
  @Input() dates: ReleaseDate[];

  sortedDates: ReleaseDate[];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (!this.dates) {
      return;
    }

    this.sortedDates = this.dates.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      }

      if (a.date < b.date) {
        return -1;
      }

      return 0;
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
