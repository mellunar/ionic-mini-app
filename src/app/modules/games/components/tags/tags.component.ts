import { Component, Input, OnInit } from '@angular/core';
import { GenericInfo } from '../../state/games.interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  @Input() genres: GenericInfo[];
  @Input() themes: GenericInfo[];

  tags: GenericInfo[] = [];
  more: number;

  constructor() {}

  ngOnInit() {
    let allTags = [];

    if (this.genres?.length > 0) {
      allTags = allTags.concat(this.genres);
    }

    if (this.themes?.length > 0) {
      allTags = allTags.concat(this.themes);
    }

    if (allTags.length > 2) {
      this.tags = allTags.slice(0, 2);
      this.more = allTags.length - 2;
    } else {
      this.tags = allTags;
    }
  }
}
