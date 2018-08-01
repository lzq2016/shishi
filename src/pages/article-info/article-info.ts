import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
// import { Keyboard } from '@ionic-native/keyboard';
import { HttpClient } from '../../providers/httpClient';
import { ServiceConfig } from '../../providers/service.config';
import { CommentInfoPage } from '../comment-info/comment-info';
import { PublishCommentPage } from '../comment/publish-comment';
import { ProfilePage } from '../profile/profile'

@Component({
  selector: 'page-article-info',
  templateUrl: 'article-info.html',
})
export class ArticleInfoPage implements OnInit {
  private info = {
    imgurl: "",
    title: "",
    text: ""
  };
  //评论列表
  private user = [];
  private requrl: string;
  commentNextPage: string = ""
  globalId: number = 0
  type: string = ""
  contentId: number = 0
  hasCollected: boolean = false
  hasZan: boolean = false
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public toastCtrl: ToastController,
    // private keyboard: Keyboard
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
    this.type = this.navParams.get('type');
    this.globalId = this.navParams.get('id');
    let DetailUrl = "";
    if (this.type == "blog") {
      DetailUrl = "api/v1/blog/" + id + "/";
    } else if (this.type == "topic") {
      DetailUrl = "api/v1/topic/" + id + "/";
    }
    //获取文章详情
    this.http.get(DetailUrl, function (data) {
      that.info.imgurl = data.cover;
      that.info.title = data.title;
      that.info.text = data.content;
      that.contentId = data.id;
      that.hasCollected = data.has_collected;
      that.hasZan = data.has_liked;
    });

    //获取评论列表
    this.http.get("api/v1/comment?content_type=" + that.type + "&object_id=" + id, function (data) {
      console.log(data);
      for (let i = 0; i < data.results.length; i++) {
        let pl = {};
        pl["userName"] = data.results[i].user.username;
        pl["userImg"] = data.results[i].user.avatar;
        pl["zan"] = data.results[i].like_count;
        pl["id"] = data.results[i].id;
        pl["info"] = data.results[i].user.follower_count;
        pl["sex"] = "1";
        pl["pp"] = "";
        pl["userId"] = data.results[i].user.id;
        pl["reply"] = data.results[i].content;
        pl["commentZan"] = false;
        pl["addZanAction"] = false;
        pl["addZanContent"] = '';
        pl["addZan"] = [];
        let imgArr = new Array();
        for (let q = 0; q < data.results[i].image_set.length; q++) {
          imgArr.push(data.results[i].image_set[q].image);
        }
        pl["plimg"] = imgArr;
        that.http.get("/api/v1/comment/" + data.results[i].id + "/reply/", function (data1) {
          console.dir(data1);
          if(data1.results && data1.results.length){
            for(let item of data1.results){
              item['commentZan'] = false;
              pl["addZan"].push(item);
            }
          }
          that.user.push(pl);
        });
      }
      if (data.next) {
        that.commentNextPage = data.next;
      } else {
        that.commentNextPage = "";
      }
      console.log(that.user);
    });
  }

  doInfinite(infiniteScroll) {
    let that = this;
    if (that.commentNextPage) {
      this.http.get(that.commentNextPage, function (data) {
        console.log(data);
        for (let i = 0; i < data.results.length; i++) {
          let pl = {};
          pl["userName"] = data.results[i].user.username;
          pl["userImg"] = data.results[i].user.avatar;
          pl["id"] = data.results[i].id;
          pl["zan"] = data.results[i].like_count;
          pl["info"] = data.results[i].user.follower_count;
          pl["sex"] = "1";
          pl["pp"] = "";
          pl["userId"] = data.results[i].user.id;
          pl["reply"] = data.results[i].content;
          pl["commentZan"] = false;
          pl["addZanAction"] = false;
          pl["addZanContent"] = '';
          let imgArr = new Array();
          for (let q = 0; q < data.results[i].image_set.length; q++) {
            imgArr.push(data.results[i].image_set[q].image);
          }
          pl["plimg"] = imgArr;
          that.user.push(pl);
        }
        if (data.next) {
          that.commentNextPage = data.next;
        } else {
          that.commentNextPage = "";
        }
        infiniteScroll.complete();
      });
    } else {
      infiniteScroll.enable(false);
    }
  }
  commentDetail(id) {
    console.log(id)
    let that = this
    if (id) {
      this.navCtrl.push(CommentInfoPage, { id: id, type: that.type })
    }
  }

  collection() {
    let that = this
    this.http.post("/api/v1/collect/", { content_type: that.type, object_id: that.globalId }, function (data) {
      if (data.success) {
        console.log(data)
        that.hasCollected = true
        let toast = that.toastCtrl.create({
          message: '收藏成功',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      } else {
        that.hasCollected = false
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
    this.http.post("/api/v1/like/", { content_type: that.type, object_id: that.globalId }, function (data) {
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

  makeComment() {
    let that = this
    this.navCtrl.push(PublishCommentPage, { id: that.contentId, content_type: that.type, type: "comment" });
  }

  goMe(userId) {
    console.log(userId);
    if (userId) {
      this.navCtrl.push(ProfilePage, { userId: userId, fromOtherUser: true });
    }
  }

  addComment(index,id) {
    console.log(id);
    console.log(index);
    this.user[index].addZanAction = true;
  }

  submitAddZan(index,id){
    let that = this
    this.http.post("/api/v1/comment/" + id + "/reply/ ", { content: that.user[index].addZanContent}, function (data) {
      if (data) {
        console.log(data);
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
  commentZan(id) {
    let that = this
    this.http.post("/api/v1/like/", { content_type: "comment", object_id: id }, function (data) {
      if (data.success) {
        for (let i = 0; i < that.user.length; i++) {
          if (that.user[i].id == id) {
            that.user[i].commentZan = true;
            that.user[i].zan += 1;
          }
        }
        let toast = that.toastCtrl.create({
          message: '点赞成功',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      } else if (data.detail == "你已经赞过了") {
        for (let i = 0; i < that.user.length; i++) {
          if (that.user[i].id == id) {
            that.user[i].commentZan = true;
          }
        }
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
    })
  }
    addCommentZan(index,id) {
      let that = this;
      this.http.post("/api/v1/like/", { content_type: "comment", object_id: id }, function (data) {
        debugger;
        if (data.success) {
          for (let i = 0; i < that.user[index].length; i++) {
            if (that.user[index][i].id == id) {
              that.user[index][i].commentZan = true;
              that.user[index][i].like_count += 1;
            }
          }
          let toast = that.toastCtrl.create({
            message: '点赞成功',
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        } else if (data.detail == "你已经赞过了") {
          for (let i = 0; i < that.user[index]["addZan"].length; i++) {
            if (that.user[index]["addZan"][i].id == id) {
              that.user[index]["addZan"][i].commentZan = true;
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
  
}
