import {Component,OnInit,OnDestroy} from '@angular/core'

@Component({
  selector: 'page-videohotlist',
  templateUrl: 'videohotlist.html',
})
export class VideoHotListPage implements OnInit, OnDestroy {

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
