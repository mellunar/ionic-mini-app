import { Component, Input, OnInit } from '@angular/core';
import { Ratings } from '../../state/games.interface';

@Component({
  selector: 'app-ratings-modal',
  templateUrl: './ratings-modal.component.html',
  styleUrls: ['./ratings-modal.component.scss'],
})
export class RatingsModal implements OnInit {
  @Input() ratings: Ratings;

  constructor() {}

  ngOnInit() {}
}
