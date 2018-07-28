import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '../../providers/httpClient';
import {ServiceConfig} from '../../providers/service.config';
import {CommentInfoPage} from '../comment-info/comment-info';
import {PublishCommentPage} from '../comment/publish-comment';
import {ProfilePage} from '../profile/profile'


@Component({
  selector: 'page-record-info',
  templateUrl: 'record-info.html',
})
export class RecordInfoPage {

  color = "no";
  user = {
    userName: "Yui迟暮",
    userHead: "assets/img/avatar/girl-avatar.png"
  };
  users = [
    {userName:"Cyaline",zan:549,fou:10,info:95,sex:0,pp:51,reply:"表白如故乡宝",img:["assets/img/logo.png","assets/img/avatar/girl-avatar.png",]},
    {userName:"bbbb",zan:549,fou:10,info:95,sex:1,pp:80,reply:"表白如故乡宝",img:["assets/img/avatar/girl-avatar.png","assets/img/avatar/girl-avatar.png","assets/img/avatar/girl-avatar.png","assets/img/logo.png"]}
  ];
  private comment = [];
  private info = {};
  private requrl:string;
  commentNextPage:string = ""
  contentId:number = 0
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public http:HttpClient) {
    let that = this;
    let id = this.navParams.get('id');
    this.requrl = ServiceConfig.getUrl();
    //获取话题详情
    this.http.get("/api/v1/diary/"+id,function(data){
         if(data.updated_at){
           data.updated_at = that.format(data.updated_at);
         }
         that.info = data;
         that.contentId = data.id;
    });
    //获取评论列表
    this.http.get("/api/v1/comment?content_type=diary&object_id="+id,function(data){
      // that.comment = data.results;
      for(let i = 0;i<data.results.length;i++){
            let pl = {};
            pl["userName"] = data.results[i].user.username;
            pl["userId"] = data.results[i].user.id;
            pl["userImg"] = data.results[i].user.avatar;
            pl["zan"] = data.results[i].like_count;
            pl["id"] = data.results[i].id;
            pl["info"] = data.results[i].user.follower_count;
            pl["sex"] = "1";
            pl["pp"] = "";
            pl["reply"] = data.results[i].content;
            let imgArr = new Array();
            for(let q = 0;q< data.results[i].image_set.length;q++){
                imgArr.push(data.results[i].image_set[q].image);
            }
            pl["plimg"] = imgArr;
            that.comment.push(pl);
        }
        if(data.next){
          that.commentNextPage = data.next;
        }else{
          that.commentNextPage = "";
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordInfoPage');
  }

  test(){
    this.color = "ss-light";
  }
  format(timestamp) {
    let date = new Date(timestamp);
    let fmt = "yyyy-MM-dd hh:mm:ss";
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
  commentDetail(id){
    console.log(id)
    if(id){
      this.navCtrl.push(CommentInfoPage,{id:id,type:"diary"})
    }
  }

  doInfinite(infiniteScroll) {
    let that = this;
    if(that.commentNextPage){
      this.http.get(that.commentNextPage,function(data){
        console.log(data);
        for(let i = 0;i<data.results.length;i++){
            let pl = {};
            pl["userName"] = data.results[i].user.username;
            pl["userId"] = data.results[i].user.id;
            pl["userImg"] =  data.results[i].user.avatar;
            pl["id"] = data.results[i].id;
            pl["zan"] = data.results[i].like_count;
            pl["info"] = data.results[i].user.follower_count;
            pl["sex"] = "1";
            pl["pp"] = "";
            pl["reply"] = data.results[i].content;
            let imgArr = new Array();
            for(let q = 0;q< data.results[i].image_set.length;q++){
                imgArr.push(data.results[i].image_set[q].image);
            }
            pl["plimg"] = imgArr;
            that.comment.push(pl);
        }
        if(data.next){
          that.commentNextPage = data.next;
        }else{
          that.commentNextPage = "";
        }
        infiniteScroll.complete();
      });
    }else{
      infiniteScroll.enable(false);
    }
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
}
