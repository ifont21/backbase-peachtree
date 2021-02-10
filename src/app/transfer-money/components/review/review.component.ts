import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  @Input() accountTo: string;
  @Input() amount: string;

  @Output('closeDialog') close: EventEmitter<void> = new EventEmitter();
  @Output('sendTransfer') send: EventEmitter<void> = new EventEmitter();

  closeDialog(): void {
    this.close.emit(void 0);
  }

  sendTransfer(): void {
    this.send.emit(void 0);
  }
}
