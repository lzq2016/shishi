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
  @Input() bigImage: any = "";
  host:string = "";
  bigImgUrl:string = "";
  bigImgShow:boolean = false;
  constructor() {
  	this.host = ServiceConfig.getUrl();
  }

  shihuitest(mark){
    if(mark==1)
      alert(1)
    alert(JSON.stringify(this.attachments))
  }

  showBigImg(url){
    if(this.bigImage == true){
      this.bigImgUrl = url;
      this.bigImgShow = true;
    }
  }

  hideBigImage(){
    this.bigImgShow = false;
  }

}
