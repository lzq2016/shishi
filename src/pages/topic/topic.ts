import {Component,OnInit,OnDestroy} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {TopicBriefPage} from './topicBrief/topicBrief';
import {LongArticlePage} from './longArticle/longArticle';
import {TopicDiaryPage} from './topicDiary/topicDiary';
import {TopicVideoPage} from './topicVideo/topicVideo';
import { HttpClient } from '../../providers/httpClient';
// import { ServiceConfig } from '../../providers/service.config';

@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html',
})
export class TopicPage implements OnInit, OnDestroy {
  // slideH = screen.width * 0.5 + 'px'
  topicBrief = TopicBriefPage
  longArticle = LongArticlePage
  topicDiary = TopicDiaryPage
  topicVideo = TopicVideoPage

  articleTitle = '';

  // slides = [];

  constructor(
        public http: HttpClient,
        public navParams:NavParams
        ) {
  }

  ngOnInit(){
   console.log("init")
   this.articleTitle = this.navParams.data.title;
   // this.initload();
  }
  
  // initload() {
  //   let self = this;
  //     self.http.get(ServiceConfig.SLIDE, function (data) {
  //       console.log(data);
  //       self.slides = data;
  //   });
  // }

  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
