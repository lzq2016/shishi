import {Component,OnInit,OnDestroy} from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
// import { ServiceConfig } from '../../../providers/service.config';

@Component({
  selector: 'page-topicBrief',
  templateUrl: 'topicBrief.html',
})
export class TopicBriefPage implements OnInit, OnDestroy {
  // articleList = [];
  // nextPage:string = ""

  constructor(public http: HttpClient) {
  }

  ngOnInit(){
   console.log("init")
   // this.initArticleList();
  }   

  // initArticleList(){
  //   let that = this;
  //   that.http.get(ServiceConfig.HOMEFEED + '?content_type=blog', function (data) {
  //       console.log(data);
  //       that.articleList = that.articleList.concat(data.results);
  //       that.nextPage = data.next;
  //   });
  // }

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
