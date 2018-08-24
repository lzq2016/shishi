import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import { ArticleInfoPage } from '../../article-info/article-info'


@Component({
  selector: 'article',
  templateUrl: 'article.html'
})
export class ArticleComponent {

  @Input() articleInfo: any = {};
  @Input() from = '';
  
  constructor(public navCtrl: NavController) {
  }
  
  goArticleDetail(){
    this.navCtrl.push(ArticleInfoPage, { id: this.articleInfo.object_id });    
  }
}
