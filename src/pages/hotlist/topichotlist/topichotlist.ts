import {Component,OnInit,OnDestroy} from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
import { ServiceConfig } from '../../../providers/service.config';
import {ModalController} from 'ionic-angular';
import { TopicPage } from '../../topic/topic';
@Component({
  selector: 'page-topichotlist',
  templateUrl: 'topichotlist.html',
})
export class TopicHotListPage implements OnInit, OnDestroy {
  topicList = [];
  nextPage:string = ""

  constructor(
    public http: HttpClient,
    public modalCtrl: ModalController,
  ) {
  }

  ngOnInit(){
   console.log("init")
   this.initTopicList();
  }   

  initTopicList(){
    let that = this;
    that.http.get(ServiceConfig.TOPICLIST, function (data) {
        console.log(data);
        that.topicList = that.topicList.concat(data.results);
        that.nextPage = data.next;
    });
  }

  getTopicList(infiniteScroll){
    let that = this;
    that.http.get(that.nextPage, function (data) {
        console.log(data);
        that.nextPage = data.next;
        if(data.next){
          infiniteScroll.enable(true);
        }
        that.topicList = that.topicList.concat(data.results);
        infiniteScroll.complete();
    });
  }

  doInfinite(infiniteScroll) {
    infiniteScroll.enable(false);
    let that = this;
    if(that.nextPage){
      that.getTopicList(infiniteScroll);
    }else{
      infiniteScroll.complete();
    }
  }

  goTopicDetail(id,title){
    let profileModal = this.modalCtrl.create(TopicPage, { id:id,title:title });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }
  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
