import {Component,OnInit,OnDestroy} from '@angular/core'
import {ArticleHotListPage} from './articlehotlist/articlehotlist';
import {TopicHotList} from './topichotlist/topichotlist';
import {PeopleHotList} from './peoplehotlist/peoplehotlist';
import {videoHotList} from './videohotlist/videohotlist';

@Component({
  selector: 'page-hotlist',
  templateUrl: 'hotlist.html',
})
export class HotListPage implements OnInit, OnDestroy {
  slideH = screen.width * 0.5 + 'px'
  articlehotlist = ArticleHotList
  topichotlist = TopicHotList
  peoplehotlist = PeopleHotList
  videohotlist = videoHotList
  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkPage')
  }

  ngOnInit(){
   console.log("init")
  }
  

  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
