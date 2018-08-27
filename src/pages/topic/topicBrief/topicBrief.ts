import {Component,OnInit,OnDestroy} from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
import {NavParams} from 'ionic-angular';
import { ServiceConfig } from '../../../providers/service.config';

@Component({
  selector: 'page-topicBrief',
  templateUrl: 'topicBrief.html',
})
export class TopicBriefPage implements OnInit, OnDestroy {
  // articleList = [];
  // nextPage:string = ""
  topicId = 0;
  topicInfo = {}

  constructor(public http: HttpClient,public navParams:NavParams) {
  }

  ngOnInit(){
   console.log("init")
   this.topicId = this.navParams.data.id
   this.initloaded();
  }   

  initloaded(){
    let self = this;
      self.http.get(ServiceConfig.TOPICLIST + self.topicId, function (data) {
        console.log(data);
        self.topicInfo = data;
    });
  }

  // doInfinite(infiniteScroll) {
  //   let that = this;
  //   if(that.nextPage){
  //     that.initArticleList();
  //   }else{
  //     infiniteScroll.enable(false);
  //   }
  // }

  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
