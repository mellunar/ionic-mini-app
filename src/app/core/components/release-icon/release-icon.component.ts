import { Component, Input, OnInit } from '@angular/core';
import { ReleaseDate } from 'src/app/modules/games/state/games.interface';

@Component({
  selector: 'app-release-icon',
  templateUrl: './release-icon.component.html',
  styleUrls: ['./release-icon.component.scss'],
})
export class ReleaseIconComponent implements OnInit {
  @Input() date: ReleaseDate;

  constructor() {}

  ngOnInit() {}
}
