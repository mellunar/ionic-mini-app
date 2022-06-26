import { Pipe, PipeTransform } from '@angular/core';
import { IGDBImage } from '../services/igdb/igdb.interface';

@Pipe({
  name: 'imageUrl',
})
export class ImageUrlPipe implements PipeTransform {
  transform(value: string, size: IGDBImage, double = false): any {
    if (!value) {
      return;
    }

    let str = value;
    let newSize;

    if (!str.includes('https')) {
      str = `https:${str}`;
    }

    if (size) {
      newSize = `t_${size}`;
      str = str.replace('t_thumb', newSize);
    }

    if (double) {
      str = str.replace(newSize, `${newSize}_2x`);
    }

    return str;
  }
}
