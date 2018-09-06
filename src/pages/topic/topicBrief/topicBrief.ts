import { Component, OnInit, OnDestroy } from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
import { NavParams, ModalController,ToastController } from 'ionic-angular';
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
  hotUser = {}
  relateTopic = []
  attentionHotUser = false;

  constructor(
    public http: HttpClient,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController) {
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
      self.relateTopic = data.related_topics;
      self.relateTopic.map(function(item,index){
        self.http.get("api/v1/topic/" + item.id + "/has_follow/", function (data1) {
          console.log(data1);
          self.relateTopic[index]["isAttention"] = data1.has_follow
        });
      });
    });
    self.http.get("api/v1/topic/" + self.topicId + "/hot_users/", function (data) {
      console.log(data);
      self.hotUser = data[0];
      self.checkHotUserAttention(self.hotUser["id"]);
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

  goAttention(id,index) {
    let self = this;
    self.http.post("api/v1/topic/" + id + "/follow/", { id: id }, function (data) {
      console.log(data);
      self.relateTopic[index]["isAttention"] = true;
    });
  }

  concelAttention(id,index) {
    let self = this;
    self.http.post("api/v1/topic/" + id + "/follow/", { id: id }, function (data) {
      console.log(data);
      self.relateTopic[index]["isAttention"] = false;
    });
  }

  checkHotUserAttention(id) {
    let self = this;
    self.http.get(ServiceConfig.ISATTENTION + "?user_id=" + id, function (data) {
      console.log(data);
      self.attentionHotUser = data.is_follower
    });
  }

  goHotUserAttention() {
    let self = this;
    self.http.post(ServiceConfig.FOLLOWUSER, { user_id: self.hotUser["id"] }, function (data) {
      console.log(data);
      debugger;
      if(data.detail){
        const toast = self.toastCtrl.create({
          message: data.detail,
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      }else{
        self.attentionHotUser = true;
      }
    });
  }

  concelHotUserAttention() {
    let self = this;
    self.http.post(ServiceConfig.CANCELATTENTION, { idol_id: self.hotUser["id"] }, function (data) {
      console.log(data);
      self.attentionHotUser = false;
    });
  }

  ngOnDestroy() {
    console.log("destroy")
  }

}
