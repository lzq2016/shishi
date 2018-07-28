import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '../../providers/httpClient';
import {ServiceConfig} from '../../providers/service.config';
import {PublishCommentPage} from '../comment/publish-comment';

@Component({
  selector: 'page-comment-info',
  templateUrl: 'comment-info.html',
})
export class CommentInfoPage {
  private info = {};
  private uinfo = {};
  private title:string;
  private comment = [];
  private requrl:string;
  commentNextPage:string = ""
  type:string = ""
  contentId:number = 0
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
    let that= this;
    this.requrl = ServiceConfig.getUrl();
    this.title = "观点详情";
    let id = this.navParams.get('id');
    this.type = this.navParams.get('type');
    //获取单个评论
    this.http.get("/api/v1/comment/"+id,function(data){
      console.log(data);
      that.info = data;
      that.uinfo = data.user;
      that.contentId = data.id;

      that.http.get("api/v1/follow/is_follower/?user_id="+data.user.id,function(data){
        if(data.is_follower){
          console.log(data)
          that.uinfo["attentioned"] = true
        }else{
          that.uinfo["attentioned"] = false
        }
      });
    });
    //获取评论列表
    this.http.get("/api/v1/comment?content_type="+that.type+"&object_id="+id,function(data){
      console.log(data)
       that.comment = data.results;
       for(let i=0;i<that.comment.length;i++){
         that.comment[i].updated_at = that.format(that.comment[i].updated_at);
       }
       if(data.next){
          that.commentNextPage = data.next;
        }else{
          that.commentNextPage = "";
        }
    });
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
  doInfinite(infiniteScroll) {
    let that = this;
    if(that.commentNextPage){
      this.http.get(that.commentNextPage,function(data){
        console.log(data);
        that.comment = data.results;
       for(let i=0;i<that.comment.length;i++){
         that.comment[i].updated_at = that.format(that.comment[i].updated_at);
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
      this.navCtrl.push(PublishCommentPage,{id:that.contentId,content_type:that.type||"",type:"comment_reply"});
  }
}
