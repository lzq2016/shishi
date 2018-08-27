import { Component } from '@angular/core';
import { NavController, NavParams,ToastController} from 'ionic-angular';
import {HttpClient} from '../../providers/httpClient';
import {ServiceConfig} from '../../providers/service.config';
import {PublishCommentPage} from '../comment/publish-comment';
import {ProfilePage} from '../profile/profile'


@Component({
  selector: 'page-record-info',
  templateUrl: 'record-info.html',
})
export class RecordInfoPage {

  info = {};
  private requrl:string;
  commentNextPage:string = ""
  contentId:number = 0
  hasZan: boolean = false
  hasCollected: boolean = false
  isAttention:boolean = false
  globalId: number = 0

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public http:HttpClient,
   public toastCtrl: ToastController) {
    let that = this;
    let id = this.navParams.get('id');
    this.globalId = this.navParams.get('id');
    this.requrl = ServiceConfig.getUrl();
    //获取话题详情
    this.http.get("/api/v1/diary/"+id,function(data){
         if(data.updated_at){
           data.updated_at = that.format(data.updated_at,1);
         }
         that.info = data;
         that.info["avatar"] = data.user.avatar;
         that.info["username"] = data.user.username;
         that.contentId = data.id;
         that.hasZan = data.has_liked;
         that.hasCollected = data.has_collected;

    });
    this.checkAttention();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordInfoPage');
  }

  format(timestamp,type) {
    let date = new Date(timestamp);
    let fmt = "";
    if(type == 1){
      fmt = "yyyy-MM-dd hh:mm:ss";
    }else{
      fmt = "hh:mm";
    }
     let o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt;
  }

  makeComment(){
    let that = this
      this.navCtrl.push(PublishCommentPage,{id:that.contentId,content_type:"diary",type:"comment"});
  }

  goMe(userId){
    if(userId){
      this.navCtrl.push(ProfilePage,{userId:userId,fromOtherUser:true});
    }
  }

  makecollect() {
    let self = this;
    self.http.post(ServiceConfig.MAKECOLLECT, { object_id: self.globalId, content_type: 'diary' }, function (data) {
      console.log(data);
      if (!data.success) {
        const toast = self.toastCtrl.create({
          message: '自己的无需收藏',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      } else {
        self.hasCollected = true;
      }
    });
  }

  cancelcollect() {
    let self = this;
    self.http.post(ServiceConfig.CANCELCOLLECT, { object_id: self.globalId, content_type: 'diary' }, function (data) {
      console.log(data);
      self.hasCollected = false;
    });
  }

  checkAttention() {
    let self = this;
    self.http.get(ServiceConfig.ISATTENTION + "?user_id=" + self.globalId, function (data) {
      console.log(data);
      self.isAttention = data.is_follower
    });
  }
  goAttention() {
    let self = this;
    self.http.post(ServiceConfig.FOLLOWUSER, { user_id: self.globalId }, function (data) {
      console.log(data);
      self.isAttention = true;
    });
  }

  concelAttention() {
    let self = this;
    self.http.post(ServiceConfig.CANCELATTENTION, { idol_id: self.globalId }, function (data) {
      console.log(data);
      self.isAttention = false;
    });
  }

  like() {
    let that = this
    this.http.post(ServiceConfig.MAKELIKE, { content_type: 'diary', object_id: that.globalId }, function (data) {
      if (data.success) {
        that.hasZan = true
      }
    });
  }

  cancelLike() {
    let that = this
    this.http.post(ServiceConfig.CANCELLIKE, { content_type: 'diary', object_id: that.globalId }, function (data) {
      console.log(data);
      that.hasZan = false
    });
  }
}
