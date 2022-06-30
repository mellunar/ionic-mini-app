import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating',
})
export class RatingBackgroundPipe implements PipeTransform {
  transform(value: number): any {
    switch (true) {
      case value < 91:
        return 'var(--color-rating-900)';
      case value < 81:
        return 'var(--color-rating-800)';
      case value < 71:
        return 'var(--color-rating-700)';
      case value < 61:
        return 'var(--color-rating-600)';
      case value < 51:
        return 'var(--color-rating-500)';
      case value < 41:
        return 'var(--color-rating-400)';
      case value < 31:
        return 'var(--color-rating-300)';
      case value < 21:
        return 'var(--color-rating-200)';
      case value < 11:
        return 'var(--color-danger)';
      default:
        return 'var(--color-success)';
    }
  }
}
