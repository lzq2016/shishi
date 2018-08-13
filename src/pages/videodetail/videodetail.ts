import {Component,OnInit,OnDestroy} from '@angular/core'



@Component({
  selector: 'page-videodetail',
  templateUrl: 'videodetail.html',
})
export class VideoDetailPage implements OnInit, OnDestroy {
  items:any = []
  nextPage:string = ""
  hasData:boolean = true;

  constructor() {
  }

  ionViewDidLoad() {
    
  }

  ngOnInit(){
   console.log("init")
  }

  ngOnDestroy(){ 
    console.log("destroy")
  }
}
