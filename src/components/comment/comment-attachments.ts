/**
 * 评论的图片显示
 * */
import {Component, Input} from '@angular/core';
import { ServiceConfig } from '../../providers/service.config';

@Component({
  selector: 'ss-comment-attachments',
  templateUrl: 'comment-attachments.html'
})
export class CommentAttachmentsComponent {

  @Input() attachments: any = [];
  host:string = ""

  constructor() {
  	this.host = ServiceConfig.getUrl();
  }

  shihuitest(mark){
    if(mark==1)
      alert(1)
    alert(JSON.stringify(this.attachments))
  }

}
