import { Component } from '@angular/core';
import { NavController, NavParams,ToastController} from 'ionic-angular';
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
  info = {};
  private requrl:string;
  commentNextPage:string = ""
  contentId:number = 0
  hasZan: boolean = false
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
    });
    this.getComment();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordInfoPage');
  }

  getComment(){
    let that = this;
    //获取评论列表
    this.http.get("/api/v1/comment?content_type=diary&object_id="+that.globalId,function(data){
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
            pl["time"] = that.format(data.results[i].updated_at,2);
            pl["commentZan"] = false;
            pl["addZanContent"] = '';
            pl["addZan"] = [];
            let imgArr = new Array();
            for(let q = 0;q< data.results[i].image_set.length;q++){
                imgArr.push(data.results[i].image_set[q].image);
            }
            pl["plimg"] = imgArr;
            that.http.get("/api/v1/comment/" + data.results[i].id + "/reply/", function (data1) {
              console.dir(data1);
              if(data1.results && data1.results.length){
                for(let item of data1.results){
                  item['commentZan'] = false;
                  item['time'] = that.format(item.updated_at,2);
                  pl["addZan"].push(item);
                }
              }
              that.comment.push(pl);
            });
        }
        if(data.next){
          that.commentNextPage = data.next;
        }else{
          that.commentNextPage = "";
        }
    });
  }
  test(){
    this.color = "ss-light";
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

  addComment(index,id) {
    console.log(id);
    console.log(index);
    this.comment[index].addZanAction = true;
  }

  commentZan(id) {
    let that = this
    this.http.post("/api/v1/like/", { content_type: "comment", object_id: id }, function (data) {
      if (data.success) {
        for (let i = 0; i < that.comment.length; i++) {
          if (that.comment[i].id == id) {
            that.comment[i].commentZan = true;
            that.comment[i].zan += 1;
          }
        }
        let toast = that.toastCtrl.create({
          message: '点赞成功',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      } else if (data.detail == "你已经赞过了") {
        for (let i = 0; i < that.comment.length; i++) {
          if (that.comment[i].id == id) {
            that.comment[i].commentZan = true;
          }
        }
        let toast = that.toastCtrl.create({
          message: data.detail,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      } else {
        let toast = that.toastCtrl.create({
          message: data.detail,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    })
  }

  submitAddZan(index,id){
    let that = this
    this.http.post("/api/v1/comment/" + id + "/reply/ ", { content: that.comment[index].addZanContent}, function (data) {
      if (data) {
        console.log(data);
        // that.user[index].addZanAction = true;
        that.comment.length = 0;
        that.getComment();
        let toast = that.toastCtrl.create({
          message: '发布成功',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      } else {
        let toast = that.toastCtrl.create({
          message: data.detail,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      } 
    });
  }

  addCommentZan(index,id) {
      let that = this;
      this.http.post("/api/v1/like/", { content_type: "comment", object_id: id }, function (data) {
        if (data.success) {
          for (let i = 0; i < that.comment[index]["addZan"].length; i++) {
            if (that.comment[index]["addZan"][i].id == id) {
              that.comment[index]["addZan"][i].commentZan = true;
              that.comment[index]["addZan"][i].like_count += 1;
            }
          }
          let toast = that.toastCtrl.create({
            message: '点赞成功',
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        } else if (data.detail == "你已经赞过了") {
          for (let i = 0; i < that.comment[index]["addZan"].length; i++) {
            if (that.comment[index]["addZan"][i].id == id) {
              that.comment[index]["addZan"][i].commentZan = true;
            }
          }
          let toast = that.toastCtrl.create({
            message: data.detail,
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        }
      });
   }

   like() {
    let that = this
    this.http.post("/api/v1/like/", { content_type: "diary", object_id: that.globalId }, function (data) {
      if (data.success) {
        that.hasZan = true
        let toast = that.toastCtrl.create({
          message: '点赞成功',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      } else if (data.detail == "你已经赞过了") {
        that.hasZan = true
        let toast = that.toastCtrl.create({
          message: data.detail,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      } else {
        that.hasZan = true
        let toast = that.toastCtrl.create({
          message: data.detail,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    });
  }
}
