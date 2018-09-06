import {Component,OnInit,OnDestroy} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {TopicBriefPage} from './topicBrief/topicBrief';
import {LongArticlePage} from './longArticle/longArticle';
import {TopicDiaryPage} from './topicDiary/topicDiary';
import {TopicVideoPage} from './topicVideo/topicVideo';
import { HttpClient } from '../../providers/httpClient';
import { ServiceConfig } from '../../providers/service.config';

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

  // articleTitle = '';
  topicId = 0;
  topicInfo = {}
  hasAttention:boolean = false
  topicParams : any = {
    topicTitle:"",
    id:0
  }

  constructor(
        public http: HttpClient,
        public navParams:NavParams
        ) {
  }

  ngOnInit(){
   console.log("init")
   this.topicParams.topicTitle = this.navParams.data.title;
   this.topicParams.id = this.navParams.data.id;
   this.topicId = this.navParams.data.id;
   this.checkAttention();
   this.initload();
  }
  
  initload() {
    let self = this;
      self.http.get(ServiceConfig.TOPICLIST + self.topicId, function (data) {
        console.log(data);
        self.topicInfo = data;
    });
  }

  checkAttention(){
    let self = this;
      self.http.get("api/v1/topic/" + self.topicId + "/has_follow/", function (data) {
        console.log(data);
        if(data.has_follow){
          self.hasAttention = true;
        }
        
    });
  }

  makeAttention(){
    let self = this;
    this.http.post("api/v1/topic/" + self.topicId + "/follow/",{id:self.topicId},function(data){
      console.log(data);
      self.hasAttention = !self.hasAttention;
    });
  }

  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
