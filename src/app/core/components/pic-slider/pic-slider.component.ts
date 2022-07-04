import { Component, Input, OnInit } from '@angular/core';
import { Image, Video } from 'src/app/modules/games/state/games.interface';
import SwiperCore, { FreeMode, SwiperOptions } from 'swiper';

SwiperCore.use([FreeMode]);

@Component({
  selector: 'app-pic-slider',
  templateUrl: './pic-slider.component.html',
  styleUrls: ['./pic-slider.component.scss'],
})
export class PicSliderComponent implements OnInit {
  @Input() pictures: Image[];
  @Input() videos: Video[];
  @Input() type: 'image' | 'video';

  config: SwiperOptions = {
    freeMode: true,
    slidesPerView: 'auto',
    slidesPerGroupAuto: true,
    spaceBetween: 8,
  };

  constructor() {}

  ngOnInit() {}
}
