import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-youtube-modal',
  templateUrl: './youtube-modal.component.html',
  styleUrls: ['./youtube-modal.component.scss'],
})
export class YoutubeModal implements OnInit {
  @Input() video: string;

  url: SafeResourceUrl;
  loading = true;

  constructor(private modalController: ModalController, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.video}?autoplay=0`
    );
  }

  dismiss() {
    this.modalController.dismiss();
  }

  loaded() {
    this.loading = false;
  }
}
