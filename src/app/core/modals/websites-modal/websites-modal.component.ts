import { Component, Input, OnInit } from '@angular/core';
import { Website } from 'src/app/modules/games/state/games.interface';

@Component({
  selector: 'app-websites-modal',
  templateUrl: './websites-modal.component.html',
  styleUrls: ['./websites-modal.component.scss'],
})
export class WebsitesModal implements OnInit {
  @Input() websites: Website[];

  constructor() {}

  ngOnInit() {}
}
