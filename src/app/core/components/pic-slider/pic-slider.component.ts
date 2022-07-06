import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() openImage = new EventEmitter<number>();
  @Output() openVideo = new EventEmitter<string>();

  config: SwiperOptions = {
    freeMode: true,
    slidesPerView: 'auto',
    slidesPerGroupAuto: true,
    spaceBetween: 8,
  };

  constructor() {}

  ngOnInit() {}

  openSlide(index: number) {
    this.openImage.emit(index);
  }

  openVideoById(id: string) {
    this.openVideo.emit(id);
  }
}
