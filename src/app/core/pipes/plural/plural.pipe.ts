import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {
  transform(value: string, length: number, plural: string): any {
    if (!value || !length || !plural) {
      return;
    }

    if (length > 1) {
      return value + plural;
    } else {
      return value;
    }
  }
}
