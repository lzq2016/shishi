import {Component,OnInit,OnDestroy} from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
import { ServiceConfig } from '../../../providers/service.config';

@Component({
  selector: 'page-peoplehotlist',
  templateUrl: 'peoplehotlist.html',
})
export class PeopleHotListPage implements OnInit, OnDestroy {
  peopleList = [];
  nextPage:string = ""

  constructor(public http: HttpClient) {
  }

  ngOnInit(){
   console.log("init")
   this.initPeopleList();
  }   

  initPeopleList(){
    let that = this;
    that.http.get(ServiceConfig.HOTPEOPLE, function (data) {
        console.log(data);
        that.peopleList = that.peopleList.concat(data.results);
        that.nextPage = data.next;
    });
  }

  doInfinite(infiniteScroll) {
    let that = this;
    if(that.nextPage){
      that.initPeopleList();
    }else{
      infiniteScroll.enable(false);
    }
  }
  
  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
