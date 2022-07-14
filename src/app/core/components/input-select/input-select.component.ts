import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AlertOptions } from '@ionic/angular';
import { FilterOptions } from '../../services/ui/ui.interface';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent implements OnInit, OnChanges {
  @Input() isCategory = false;
  @Input() label: string;
  @Input() options: FilterOptions[];
  @Input() message: string;
  @Input() multiple = true;
  @Input() subHeader: string;
  @Input() value: number[] | string;

  @Input() items: number[][];

  @Output() categories = new EventEmitter<any>();
  @Output() update = new EventEmitter<number[]>();

  concatenedItems: number[];

  alertInterface: AlertOptions = {
    cssClass: 'c-ion-alert',
  };

  constructor() {}

  ngOnInit() {
    if (this.label) {
      this.alertInterface.header = this.label;
    }

    if (this.message) {
      this.alertInterface.message = this.message;
    }

    if (this.subHeader) {
      this.alertInterface.subHeader = this.subHeader;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isCategory) {
      return;
    }

    const arr = changes.items?.currentValue;
    if (arr?.length > 0) {
      this.concatenedItems = [].concat(...arr);
    } else {
      this.concatenedItems = [];
    }
  }

  changeOption(event) {
    const { value } = event.detail;

    // to avoid ionChange loop
    if (this.value === value || this.concatenedItems === value) {
      return;
    }

    if (!this.isCategory) {
      this.update.emit(value);
    } else {
      const updated = {
        genres: [],
        themes: [],
      };

      if (value?.length > 0) {
        value.forEach((item) => {
          const index = this.options.findIndex((i) => i.id === item);

          if (index > -1) {
            updated[this.options[index].endpoint].push(item);
          }
        });
      }

      this.categories.emit(updated);
    }
  }
}
