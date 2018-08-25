import {Component,OnInit,OnDestroy} from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
import { ServiceConfig } from '../../../providers/service.config';
import {NavParams} from 'ionic-angular';

@Component({
  selector: 'page-longArticle',
  templateUrl: 'longArticle.html',
})
export class LongArticlePage implements OnInit, OnDestroy {
  articleList = [];
    count = 0
  nextPage:string = ""
  title = ''

  constructor(public http: HttpClient,public navParams:NavParams) {
  }

  ngOnInit(){
   console.log("init")
   this.title = this.navParams.data
   this.initArticleList();
  }   

  initArticleList(){
    let that = this;
    that.http.get(ServiceConfig.TOPICFEED + '?content_type=blog&topic_title=' + this.title, function (data) {
        console.log(data);
        that.count = data.count
        that.articleList = that.articleList.concat(data.results);
        that.nextPage = data.next;
    });
  }

  doInfinite(infiniteScroll) {
    let that = this;
    if(that.nextPage){
      that.initArticleList();
    }else{
      infiniteScroll.enable(false);
    }
  }

  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
