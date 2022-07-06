import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Image } from '../../state/games.interface';
import SwiperCore, { Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { PaginationOptions } from 'swiper/types';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-screenshots-modal',
  templateUrl: './screenshots-modal.component.html',
  styleUrls: ['./screenshots-modal.component.scss'],
})
export class ScreenshotsModal implements OnInit {
  @ViewChild('slider', { static: true }) slider: SwiperComponent;

  @Input() screenshots: Image[];
  @Input() index: number;

  config: SwiperOptions = {
    centeredSlides: true,
  };

  pagination: PaginationOptions = {
    type: 'bullets',
    dynamicBullets: true,
    hideOnClick: true,
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    // give swiper time to initialize
    setTimeout(() => {
      this.slider.swiperRef.slideTo(this.index, 0);
    }, 0);
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
