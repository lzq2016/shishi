import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '../../providers/httpClient';
import { ServiceConfig } from '../../providers/service.config';
import { PublishCommentPage } from '../comment/publish-comment';
import { ProfilePage } from '../profile/profile'

@Component({
  selector: 'page-article-info',
  templateUrl: 'article-info.html',
})
export class ArticleInfoPage implements OnInit {
  info = {
    imgurl: "",
    title: "",
    text: ""
  };
  //评论列表
  requrl: string = '';
  commentNextPage: string = ""
  globalId: number = 0
  contentId: number = 0
  hasCollected: boolean = false
  isAttention:boolean = false
  hasZan: boolean = false
  user = {}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public toastCtrl: ToastController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleInfoPage');
  }

  ngOnInit() {
    console.log("init")
    let that = this;
    this.requrl = ServiceConfig.getUrl();
    let id = this.navParams.get('id');
    this.globalId = this.navParams.get('id');
    let DetailUrl = "";
    DetailUrl = "api/v1/blog/" + id + "/";
    //获取文章详情
    this.http.get(DetailUrl, function (data) {
      that.info.imgurl = data.cover;
      that.info.title = data.title;
      that.info.text = data.content;
      that.contentId = data.id;
      that.user = data.user
      that.hasCollected = data.has_collected;
      that.hasZan = data.has_liked;
    });
    this.checkAttention();
  }

  like() {
    let that = this
    this.http.post(ServiceConfig.MAKELIKE, { content_type: 'blog', object_id: that.globalId }, function (data) {
      if (data.success) {
        that.hasZan = true
      }
    });
  }

  cancelLike() {
    let that = this
    this.http.post(ServiceConfig.CANCELLIKE, { content_type: 'blog', object_id: that.globalId }, function (data) {
      console.log(data);
      that.hasZan = false
    });
  }

  makeComment() {
    let that = this
    this.navCtrl.push(PublishCommentPage, { id: that.contentId, content_type: 'blog', type: "comment" });
  }

  makecollect() {
    let self = this;
    self.http.post(ServiceConfig.MAKECOLLECT, { object_id: self.globalId, content_type: 'blog' }, function (data) {
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
    self.http.post(ServiceConfig.CANCELCOLLECT, { object_id: self.globalId, content_type: 'blog' }, function (data) {
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

  goMe(id) {
    this.navCtrl.push(ProfilePage, { userId: id, fromOtherUser: true });
  }

  format(timestamp) {
    let date = new Date(timestamp);
    let fmt = "hh:mm";
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
  
}
