import {Component,OnInit,OnDestroy} from '@angular/core'
import {ArticleHotListPage} from './articlehotlist/articlehotlist';
import {TopicHotListPage} from './topichotlist/topichotlist';
import {PeopleHotListPage} from './peoplehotlist/peoplehotlist';
import {VideoHotListPage} from './videohotlist/videohotlist';
import { HttpClient } from '../../providers/httpClient';
import { ServiceConfig } from '../../providers/service.config';

@Component({
  selector: 'page-hotlist',
  templateUrl: 'hotlist.html',
})
export class HotListPage implements OnInit, OnDestroy {
  slideH = screen.width * 0.5 + 'px'
  articlehotlist = ArticleHotListPage
  topichotlist = TopicHotListPage
  peoplehotlist = PeopleHotListPage
  videohotlist = VideoHotListPage

  slides = [];

  constructor(
        public http: HttpClient,
        ) {
  }

  ngOnInit(){
   console.log("init")
   this.initload();
  }
  
  initload() {
    let self = this;
      self.http.get(ServiceConfig.SLIDE, function (data) {
        console.log(data);
        self.slides = data;
    });
  }

  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
