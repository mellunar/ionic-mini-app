import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GenericInfo } from '../../state/games.interface';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.scss'],
})
export class CategoriesModal implements OnInit {
  @Input() tags: GenericInfo[];

  constructor(private modalController: ModalController, private router: Router) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  searchCategory(index: number) {
    const item = this.tags[index];
    let type;

    if (item.url.includes('genres')) {
      type = 'genres';
    }

    if (item.url.includes('themes')) {
      type = 'themes';
    }

    this.router.navigate(['/games/search'], { queryParams: { [type]: item.name } });
    this.dismiss();
  }
}
