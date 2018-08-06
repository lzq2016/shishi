import {Component,OnInit,OnDestroy} from '@angular/core'
import {ArticleHotListPage} from './articlehotlist/articlehotlist';
import {TopicHotListPage} from './topichotlist/topichotlist';
import {PeopleHotListPage} from './peoplehotlist/peoplehotlist';
import {VideoHotListPage} from './videohotlist/videohotlist';

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
