import {Component,OnInit,OnDestroy} from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
import { ServiceConfig } from '../../../providers/service.config';
import {NavParams} from 'ionic-angular';

@Component({
  selector: 'page-topicDiary',
  templateUrl: 'topicDiary.html',
})
export class TopicDiaryPage implements OnInit, OnDestroy {
  diaryList = [];
  count = 0
  nextPage:string = ""
  title = ''

  constructor(public http: HttpClient,public navParams:NavParams) {
  }

  ngOnInit(){
   console.log("init")
   this.title = this.navParams.data.topicTitle
   this.initDiaryList();
  }   

  initDiaryList(){
    let that = this;
    that.http.get(ServiceConfig.TOPICFEED + '?content_type=diary&topic_title=' + this.title, function (data) {
        console.log(data);
        that.count = data.count
        that.diaryList = that.diaryList.concat(data.results);
        that.nextPage = data.next;
    });
  }

  doInfinite(infiniteScroll) {
    let that = this;
    if(that.nextPage){
      that.initDiaryList();
    }else{
      infiniteScroll.enable(false);
    }
  }
  
  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
