import { Component, OnInit, OnDestroy } from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
import { NavParams, ModalController } from 'ionic-angular';
import { ServiceConfig } from '../../../providers/service.config';
import { ActiveUserPage } from '../../activeuser/activeuser'

@Component({
  selector: 'page-topicBrief',
  templateUrl: 'topicBrief.html',
})
export class TopicBriefPage implements OnInit, OnDestroy {
  // articleList = [];
  // nextPage:string = ""
  topicId = 0;
  topicInfo = {}

  constructor(
    public http: HttpClient,
    public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  ngOnInit() {
    console.log("init")
    this.topicId = this.navParams.data.id
    this.initloaded();
  }

  initloaded() {
    let self = this;
    self.http.get(ServiceConfig.TOPICLIST + self.topicId, function (data) {
      console.log(data);
      self.topicInfo = data;
    });
    self.http.get("api/v1/topic/" + self.topicId + "/hot_users/", function (data) {
      console.log(data);
      
    });

  }

  // doInfinite(infiniteScroll) {
  //   let that = this;
  //   if(that.nextPage){
  //     that.initArticleList();
  //   }else{
  //     infiniteScroll.enable(false);
  //   }
  // }

  goMore() {
    let profileModal = this.modalCtrl.create(ActiveUserPage, { id: this.topicId }, { showBackdrop: true, enableBackdropDismiss: true });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }

  ngOnDestroy() {
    console.log("destroy")
  }

}
