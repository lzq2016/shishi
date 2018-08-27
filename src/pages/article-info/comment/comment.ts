import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '../../../providers/httpClient';
import { NavController,ToastController } from 'ionic-angular';
import { ProfilePage } from '../../profile/profile'

@Component({
  selector: 'detailComment',
  templateUrl: 'detailComment.html'
})
export class CommentComponent implements OnInit {

  @Input() type: any = '';
  @Input() id: any = '';
  commentInfo: any = [];
  count = 0;
  commentNextPage: string = ""


  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.getComment();
  }

  getComment() {
    //获取评论列表
    let that = this;
    this.http.get("api/v1/comment?content_type=" + that.type + "&object_id=" + that.id, function (data) {
      console.log(data);
      if (data.results) {
        that.count = data.count 
        that.commentInfo = data.results;
        that.commentInfo.map((item) => {
          item["commentZan"] = item.has_liked;
          item["addZanAction"] = false;
          item["addZanContent"] = '';
          item["addZan"] = [];
          item["updated_at"] = that.format(item.updated_at);
          let imgArr = new Array();
          for (let q = 0; q < item.image_set.length; q++) {
            imgArr.push(item.image_set[q].image);
          }
          item["plimg"] = imgArr;
          that.http.get("/api/v1/comment/" + item.id + "/reply/", function (data1) {
            console.dir(data1);
            if(data1.results && data1.results.length){
              for(let item1 of data1.results){
                item1['commentZan'] = item1.has_liked;
                item1['time'] = that.format(item1.updated_at);
                item["addZan"].push(item1);
              }
            }
          });
        });
      }
      if (data.next) {
        that.commentNextPage = data.next;
      } else {
        that.commentNextPage = "";
      }
    });
  }

  format(timestamp) {
    let date = new Date(timestamp);
    let fmt = "hh:mm";
    let o = {
      "M+": date.getMonth() + 1,                 //月份 
      "d+": date.getDate(),                    //日 
      "h+": date.getHours(),                   //小时 
      "m+": date.getMinutes(),                 //分 
      "s+": date.getSeconds(),                 //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
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
    this.commentInfo[index].addZanAction = true;
  }

  commentZan(id) {
    let that = this
    this.http.post("/api/v1/like/", { content_type: "comment", object_id: id }, function (data) {
      if (data.success) {
        for (let i = 0; i < that.commentInfo.length; i++) {
          if (that.commentInfo[i].id == id) {
            that.commentInfo[i].commentZan = true;
            that.commentInfo[i].zan += 1;
          }
        }
        let toast = that.toastCtrl.create({
          message: '点赞成功',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      } else if (data.detail == "你已经赞过了") {
        for (let i = 0; i < that.commentInfo.length; i++) {
          if (that.commentInfo[i].id == id) {
            that.commentInfo[i].commentZan = true;
          }
        }
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
        if (data.success) {
          for (let i = 0; i < that.commentInfo[index]["addZan"].length; i++) {
            if (that.commentInfo[index]["addZan"][i].id == id) {
              that.commentInfo[index]["addZan"][i].commentZan = true;
              that.commentInfo[index]["addZan"][i].like_count += 1;
            }
          }
          debugger;
          let toast = that.toastCtrl.create({
            message: '点赞成功',
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        } else if (data.detail == "你已经赞过了") {
          for (let i = 0; i < that.commentInfo[index]["addZan"].length; i++) {
            if (that.commentInfo[index]["addZan"][i].id == id) {
              that.commentInfo[index]["addZan"][i].commentZan = true;
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

  submitAddZan(index,id){
    let that = this
    this.http.post("/api/v1/comment/" + id + "/reply/ ", { content: that.commentInfo[index].addZanContent}, function (data) {
      if (data) {
        console.log(data);
        that.commentInfo.length = 0;
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

  doInfinite(infiniteScroll) {
    let that = this;
    if (that.commentNextPage) {
      this.http.get(that.commentNextPage, function (data) {
        console.log(data);
        that.count = data.count
        data.results.map((item) => {
          item["commentZan"] = item.has_liked;
          item["addZanAction"] = false;
          item["addZanContent"] = '';
          item["addZan"] = [];
          item["updated_at"] = that.format(item.updated_at);
          let imgArr = new Array();
          for (let q = 0; q < item.image_set.length; q++) {
            imgArr.push(item.image_set[q].image);
          }
          item["plimg"] = imgArr;
          that.http.get("/api/v1/comment/" + item.id + "/reply/", function (data1) {
            console.dir(data1);
            if(data1.results && data1.results.length){
              for(let item1 of data1.results){
                item1['commentZan'] = item1.has_liked;
                item1['time'] = that.format(item1.updated_at);
                item["addZan"].push(item1);
              }
              that.commentInfo = that.commentInfo.concat(data.results);
            }
          });
        });
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

}
