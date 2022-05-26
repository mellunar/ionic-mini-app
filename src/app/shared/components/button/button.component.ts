import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() color: '' | 'success' | 'warning' | 'error' | 'blue' = '';
  @Input() disabled = false;
  @Input() circle: number;

  @Output() action = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  onClick() {
    if (this.disabled) {
      return;
    }

    this.action.emit();
  }
}
