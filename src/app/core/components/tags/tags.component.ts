import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GenericInfo } from '../../../modules/games/state/games.interface';

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

  @Output() openCategories = new EventEmitter<GenericInfo[]>();

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

  openGameTags() {
    if (!this.showModal) {
      return;
    }

    this.openCategories.emit(this.allTags);
  }
}
