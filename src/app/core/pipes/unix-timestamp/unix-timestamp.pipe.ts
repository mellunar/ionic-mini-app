import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixTimestamp',
})
export class UnixTimestampPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(date: number, timezone = '+0000'): unknown {
    if (!date) {
      return;
    }

    return this.datePipe.transform(date * 1000, 'yyyy/MM/dd', timezone);
  }
}
