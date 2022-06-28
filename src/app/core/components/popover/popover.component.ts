import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() text: string;

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  dismiss() {
    this.popoverController.dismiss();
  }
}
