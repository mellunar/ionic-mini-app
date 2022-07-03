import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flag-icon',
  templateUrl: './flag-icon.component.html',
  styleUrls: ['./flag-icon.component.scss'],
})
export class FlagIconComponent implements OnInit {
  @Input() region: number;

  flag: string;

  constructor() {}

  ngOnInit() {
    switch (this.region) {
      case 1:
        return (this.flag = 'EU');
      case 2:
        return (this.flag = 'US');
      case 3:
        return (this.flag = 'AU');
      case 4:
        return (this.flag = 'NZ');
      case 5:
        return (this.flag = 'JP');
      case 6:
        return (this.flag = 'CN');
      case 9:
        return (this.flag = 'KR');
      case 10:
        return (this.flag = 'BR');
      default:
        return (this.flag = 'Worldwide');
    }
  }
}
