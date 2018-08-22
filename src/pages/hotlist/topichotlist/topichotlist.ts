import {Component,OnInit,OnDestroy} from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
import { ServiceConfig } from '../../../providers/service.config';

@Component({
  selector: 'page-topichotlist',
  templateUrl: 'topichotlist.html',
})
export class TopicHotListPage implements OnInit, OnDestroy {
  topicList = [];
  nextPage:string = ""

  constructor(public http: HttpClient) {
  }



  ngOnInit(){
   console.log("init")
   this.initTopicList();
  }   

  initTopicList(){
    let that = this;
    that.http.get(ServiceConfig.HOMEFEED + '?content_type=vlog', function (data) {
        console.log(data);
        that.videoList = that.videoList.concat(data.results);
        that.nextPage = data.next;
    });
  }

  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
