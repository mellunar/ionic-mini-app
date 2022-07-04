import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-collapsable-text',
  templateUrl: './collapsable-text.component.html',
  styleUrls: ['./collapsable-text.component.scss'],
})
export class CollapsableTextComponent implements OnInit {
  @ViewChild('textContainer') textContainer: ElementRef<HTMLElement>;

  @Input() text: string;
  @Input() noPT = false;
  @Input() halfPT = false;

  expanded = false;

  constructor() {}

  ngOnInit() {}

  expandText() {
    if (this.textContainer.nativeElement.scrollHeight > 112) {
      this.expanded = true;
    }
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
