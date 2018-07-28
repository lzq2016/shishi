import {Component, Input} from '@angular/core';

@Component({
  selector: 'comment-item',
  templateUrl: 'comment-item.html'
})
export class CommentItemComponent {

  @Input() data;
  showReply:boolean;

  constructor() {
  }

}
