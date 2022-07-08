import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
})
export class GameStatusPipe implements PipeTransform {
  transform(value: number): any {
    if (!value) {
      return;
    }

    switch (value) {
      case 2:
        return 'Alpha';
      case 3:
        return 'Beta';
      case 4:
        return 'Early access';
      case 5:
        return 'Offline';
      case 6:
        return 'Rumored';
      case 7:
        return 'Delisted';
    }
  }
}
