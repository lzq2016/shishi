import {Component,OnInit,OnDestroy} from '@angular/core'

@Component({
  selector: 'page-topichotlist',
  templateUrl: 'topichotlist.html',
})
export class TopicHotListPage implements OnInit, OnDestroy {

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
