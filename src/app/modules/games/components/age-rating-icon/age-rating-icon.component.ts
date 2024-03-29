import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-age-rating-icon',
  templateUrl: './age-rating-icon.component.html',
  styleUrls: ['./age-rating-icon.component.scss'],
})
export class AgeRatingIconComponent implements OnInit {
  @Input() rating: number;

  flag: string;
  organization: string;

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    if (this.rating < 6) {
      this.flag = 'EU';
      this.organization = 'PEGI';
    }
    if (this.rating > 5 && this.rating < 13) {
      this.flag = 'US';
      this.organization = 'ESRB';
    }
    if (this.rating > 12 && this.rating < 18) {
      this.flag = 'JP';
      this.organization = 'CERO';
    }
    if (this.rating > 17 && this.rating < 22) {
      this.flag = 'DE';
      this.organization = 'USK';
    }
    if (this.rating > 21 && this.rating < 27) {
      this.flag = 'KR';
      this.organization = 'GRAC';
    }
    if (this.rating > 26 && this.rating < 33) {
      this.flag = 'BR';
      this.organization = 'Classificação indicativa';
    }
    if (this.rating > 32 && this.rating < 39) {
      this.flag = 'AU';
      this.organization = 'Australian Classification Board';
    }
    if (this.rating > 38) {
      this.flag = 'Worldwide';
    }
  }

  async showOrganization() {
    if (!this.organization) {
      return;
    }

    const alert = await this.alertController.create({
      mode: 'ios',
      header: this.organization,
      message: `<img class='u-margin-top--sm' src='/assets/ratings/${this.rating}.png' />`,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        },
      ],
      cssClass: 'c-ion-alert',
    });

    await alert.present();
  }
}
