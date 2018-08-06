import {Component,OnInit,OnDestroy} from '@angular/core'

@Component({
  selector: 'page-articlehotlist',
  templateUrl: 'articlehotlist.html',
})
export class ArticleHotListPage implements OnInit, OnDestroy {

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
