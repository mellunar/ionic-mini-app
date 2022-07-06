import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RatingsModal } from '../../modals/ratings-modal/ratings-modal.component';
import { GameFullInfo, Ratings } from '../../state/games.interface';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() game: GameFullInfo;

  rating: number;
  hasRating = false;

  ratings: Ratings = {
    critics: null,
    criticsCount: null,
    users: null,
    userCount: null,
    total: null,
    totalCount: null,
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (this.game.aggregated_rating) {
      this.ratings.critics = Math.trunc(this.game.aggregated_rating);
      this.ratings.criticsCount = this.game.aggregated_rating_count;
      this.hasRating = true;
    }

    if (this.game.rating) {
      this.ratings.users = Math.trunc(this.game.rating);
      this.ratings.userCount = this.game.rating_count;
      this.hasRating = true;
    }

    if (this.game.total_rating) {
      this.ratings.total = Math.trunc(this.game.total_rating);
      this.ratings.totalCount = this.game.total_rating_count;
    }

    this.setColor();
  }

  async openRatingsModal() {
    if (!this.hasRating) {
      return;
    }

    const modal = await this.modalController.create({
      mode: 'ios',
      component: RatingsModal,
      componentProps: {
        ratings: this.ratings,
      },
    });

    await modal.present();
  }

  private setColor() {
    if (this.ratings.critics) {
      this.rating = this.ratings.critics;
    } else if (this.ratings.users) {
      this.rating = this.ratings.users;
    }
  }
}