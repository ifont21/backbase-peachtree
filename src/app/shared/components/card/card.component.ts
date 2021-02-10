import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
@ContentChild('title') titleTpl: TemplateRef<any>;

}
