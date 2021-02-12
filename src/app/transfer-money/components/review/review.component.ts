import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  @Input() values: { to: string; amount: number };

  @Output() closeDialog: EventEmitter<void> = new EventEmitter();
  @Output() sendTransfer: EventEmitter<void> = new EventEmitter();

  close(): void {
    this.closeDialog.emit();
  }

  addTransfer(): void {
    this.sendTransfer.emit();
  }
}
