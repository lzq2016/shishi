import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'comment-reply',
  templateUrl: 'comment-reply.html'
})
export class CommentReplyComponent {

  @Output() reply = new EventEmitter<string>();
  isThumb:boolean;
  isNegative:boolean;
  replying:boolean;

  constructor() {
  }

}
