import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriesModal } from '../../modals/categories-modal/categories-modal.component';
import { GenericInfo } from '../../state/games.interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  @Input() genres: GenericInfo[];
  @Input() perspective: GenericInfo[];
  @Input() themes: GenericInfo[];
  @Input() showModal = false;

  // to show on interface
  tags: GenericInfo[] = [];
  more: number;

  // to show on modal
  allTags: GenericInfo[] = [];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    let allTags = [];

    if (this.genres?.length > 0) {
      allTags = allTags.concat(this.genres);
    }

    if (this.themes?.length > 0) {
      allTags = allTags.concat(this.themes);
    }

    if (this.perspective?.length > 0) {
      allTags = allTags.concat(this.perspective);
    }

    this.allTags = allTags;

    if (allTags.length > 2) {
      this.tags = allTags.slice(0, 2);
      this.more = allTags.length - 2;
    } else {
      this.tags = allTags;
    }
  }

  async openGameTags() {
    if (!this.showModal) {
      return;
    }

    const modal = await this.modalController.create({
      mode: 'ios',
      component: CategoriesModal,
      componentProps: {
        tags: this.allTags,
      },
    });

    await modal.present();
  }
}
