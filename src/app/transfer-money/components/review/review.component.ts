import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  @Input() values: { to: string; amount: number };

  @Output('closeDialog') close: EventEmitter<void> = new EventEmitter();
  @Output('sendTransfer') send: EventEmitter<void> = new EventEmitter();

  closeDialog(): void {
    this.close.emit();
  }

  sendTransfer(): void {
    this.send.emit();
  }
}
