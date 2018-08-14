import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '../../../providers/httpClient';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../../profile/profile'

@Component({
  selector: 'detailComment',
  templateUrl: 'comment.html'
})
export class CommentComponent implements OnInit {

  @Input() type: any = '';
  @Input() id: any = '';
  commentInfo: any = [];
  commentNextPage: string = ""


  constructor(
    public navCtrl: NavController,
    public http: HttpClient) {
  }

  ngOnInit() {
    this.getComment();
  }

  getComment() {
    //获取评论列表
    let that = this;
    this.http.get("api/v1/comment?content_type=" + that.type + "&object_id=" + that.id, function (data) {
      console.log(data);
      // for (let i = 0; i < data.results.length; i++) {
      //   let pl = {};
      //   pl["userName"] = data.results[i].user.username;
      //   pl["userImg"] = data.results[i].user.avatar;
      //   pl["zan"] = data.results[i].like_count;
      //   pl["id"] = data.results[i].id;
      //   pl["info"] = data.results[i].user.follower_count;
      //   pl["userId"] = data.results[i].user.id;
      //   pl["reply"] = data.results[i].content;
      //   pl["commentZan"] = false;
      //   pl["addZanAction"] = false;
      //   pl["addZanContent"] = '';
      //   pl["addZan"] = [];
      //   pl["time"] = that.format(data.results[i].updated_at);
      //   let imgArr = new Array();
      //   for (let q = 0; q < data.results[i].image_set.length; q++) {
      //     imgArr.push(data.results[i].image_set[q].image);
      //   }
      //   pl["plimg"] = imgArr;
      //   that.http.get("/api/v1/comment/" + data.results[i].id + "/reply/", function (data1) {
      //     console.dir(data1);
      //     if(data1.results && data1.results.length){
      //       for(let item of data1.results){
      //         item['commentZan'] = false;
      //         item['time'] = that.format(item.updated_at);
      //         pl["addZan"].push(item);
      //       }
      //     }
      //     that.commentInfo.push(pl);
      //   });
      // }
      if (data.results) {
        that.commentInfo = data.results;
        that.commentInfo.map((item) => {
          item["commentZan"] = false;
          item["addZanAction"] = false;
          item["addZanContent"] = '';
          item["addZan"] = [];
          item["updated_at"] = that.format(item.updated_at);
          let imgArr = new Array();
          for (let q = 0; q < item.image_set.length; q++) {
            imgArr.push(item.image_set[q].image);
          }
          item["plimg"] = imgArr;
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

}
