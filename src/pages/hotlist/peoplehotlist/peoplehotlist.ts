import {Component,OnInit,OnDestroy} from '@angular/core'

@Component({
  selector: 'page-peoplehotlist',
  templateUrl: 'peoplehotlist.html',
})
export class PeopleHotListPage implements OnInit, OnDestroy {

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
