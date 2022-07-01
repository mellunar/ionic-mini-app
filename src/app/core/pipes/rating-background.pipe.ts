import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating',
})
export class RatingBackgroundPipe implements PipeTransform {
  transform(value: number): any {
    switch (true) {
      case value > 90:
        return 'var(--color-success)';
      case value > 80:
        return 'var(--color-rating-900)';
      case value > 70:
        return 'var(--color-rating-800)';
      case value > 60:
        return 'var(--color-rating-700)';
      case value > 50:
        return 'var(--color-rating-600)';
      case value > 40:
        return 'var(--color-rating-500)';
      case value > 30:
        return 'var(--color-rating-400)';
      case value > 20:
        return 'var(--color-rating-300)';
      case value > 10:
        return 'var(--color-rating-200)';
      default:
        return 'var(--color-danger)';
    }
  }
}
