import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game, Website } from '../../state/games.interface';

@Component({
  selector: 'app-details-footer',
  templateUrl: './details-footer.component.html',
  styleUrls: ['./details-footer.component.scss'],
})
export class DetailsFooterComponent implements OnInit {
  @Input() category: number;
  @Input() similar: Game[];
  @Input() websites: Website[];

  @Output() openWebsites = new EventEmitter<any>();
  @Output() openSimilar = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  openSimilarGamesModal() {
    this.openSimilar.emit();
  }

  openWebsitesModal() {
    this.openWebsites.emit();
  }
}
