/**
 * 评论的图片显示
 * */
import {Component, Input} from '@angular/core';

@Component({
  selector: 'article',
  templateUrl: 'article.html'
})
export class ArticleComponent {

  @Input() attachments: any = [];
  
  constructor() {
  }

  

}
