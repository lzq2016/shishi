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

  doInfinite(infiniteScroll) {
    let that = this;
    if(that.nextPage){
      that.initTopicList();
    }else{
      infiniteScroll.enable(false);
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
