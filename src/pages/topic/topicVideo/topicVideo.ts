import {Component,OnInit,OnDestroy} from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
import { ServiceConfig } from '../../../providers/service.config';
import {NavParams} from 'ionic-angular';

@Component({
  selector: 'page-topicVideo',
  templateUrl: 'topicVideo.html',
})
export class TopicVideoPage implements OnInit, OnDestroy {
  videoList = [];
  count = 0
  nextPage:string = ""
  title = ''
  constructor(public http: HttpClient,public navParams:NavParams) {
  }

  ngOnInit(){
   console.log("init")
   this.title = this.navParams.data.topicTitle
   this.initVideoList();
  }   

  initVideoList(){
    let that = this;
    that.http.get(ServiceConfig.TOPICFEED + '?content_type=vlog&topic_title=' + this.title, function (data) {
        console.log(data);
        that.count = data.count
        that.videoList = that.videoList.concat(data.results);
        that.nextPage = data.next;
    });
  }

  doInfinite(infiniteScroll) {
    let that = this;
    if(that.nextPage){
      that.initVideoList();
    }else{
      infiniteScroll.enable(false);
    }
  }
  
  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
