import {Component,OnInit,OnDestroy} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular'
import {HttpClient} from '../../providers/httpClient';
import {PublishCommentPage} from '../comment/publish-comment'
import {ArticleInfoPage} from '../article-info/article-info'
import {RecordInfoPage} from '../record-info/record-info';
// import {CommentInfoPage} from '../comment-info/comment-info';
import { ServiceConfig } from '../../providers/service.config';
import {ProfilePage} from '../profile/profile'

@Component({
  selector: 'page-msgcomment',
  templateUrl: 'msgcomment.html',
})
export class MsgcommentPage implements OnInit, OnDestroy {
  items:any = []
  nextPage:string = ""
  hasData:boolean = true;
  host:string = ""
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpClient:HttpClient) {
    this.host = ServiceConfig.getUrl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkPage')
    const data = this.navParams.get('data')
    console.log(data)
  }

  doInfinite(infiniteScroll) {
    let that = this;
    if(that.nextPage){
      this.httpClient.get(that.nextPage,function(data){
        console.log(data);
        console.log(data);
        if(data.results.length){
          for(let item of data.results){
            let type = "";
            let avatar =  item.actor.avatar;
            switch(item.action_object_content_type){
              case "blog":
                type = "文章";
              break;
              case "diary":
                type = "日记";
              break;
              case "comment":
                type = "评论";
              break;
              case "topic":
                type = "话题";
              break;
            }
            let content = item.action_object ? item.action_object.content:"这条评论走失了。。。";
            let id = item.target ? item.target.id:null;
            let obj = {
              name:item.actor.username,
              userId:item.actor.id,
              type:type,
              type_en:item.target_content_type,
              avatar:avatar,
              content:content,
              title:item.target.title,
              time:that.format(item.timestamp),
              id:id,
              replyId:item.action_object.id,
              commentId:item.target.id,
              commentType:item.target_content_type
            }
            that.items.push(obj);
          }
        }
        if(data.next){
          that.nextPage = data.next;
        }else{
          that.nextPage = "";
        }
        infiniteScroll.complete();
      });
    }else{
      infiniteScroll.enable(false);
    }
  }

  ngOnInit(){
   console.log("init")
   let that = this;
   this.httpClient.get("api/v1/notification?verb=commented",function(data){
      console.log(data);
      if(data.results.length){
        that.hasData = true;
        for(let item of data.results){
          let type = "";
          let avatar =   item.actor.avatar;
          switch(item.action_object_content_type){
            case "blog":
              type = "文章";
            break;
            case "diary":
              type = "日记";
            break;
            case "comment":
              type = "评论";
            break;
            case "topic":
              type = "话题";
            break;
          }
          let content = item.action_object ? item.action_object.content:"这条评论走失了。。。";
          let id = item.target ? item.target.id:null;
          let obj = {
            name:item.actor.username,
            userId:item.actor.id,
            type:type,
            type_en:item.target_content_type,
            avatar:avatar,
            content:content,
            title:item.target.title,
            time:that.format(item.timestamp),
            id:id,
            replyId:item.action_object.id,
            commentId:item.target.id,
            commentType:item.target_content_type
          }
          that.items.push(obj);
        }
      }else{
        that.hasData = false;
      }
      if(data.next){
        that.nextPage = data.next;
      }else{
        that.nextPage = "";
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
  ngOnDestroy(){
    console.log("destroy")
  }
  reply(replyId,type_en){
    if(replyId){
      this.navCtrl.push(PublishCommentPage,{id:replyId,type:"comment_reply",content_type:type_en});
    }
  }
  goMe(userId){
    if(userId){
      this.navCtrl.push(ProfilePage,{userId:userId,fromOtherUser:true});
    }
  }

  goContent(item){
    console.log(item)
    if(item.type_en == "blog"){
      this.navCtrl.push(ArticleInfoPage, {id:item.id,type:"blog"});
    }
    if(item.type_en == "topic"){
      this.navCtrl.push(ArticleInfoPage, {id:item.id,type:"topic"});
    }
    if(item.type_en == "diary"){
      this.navCtrl.push(RecordInfoPage, {id:item.id});
    }
    // if(item.commentId){
    //   this.navCtrl.push(CommentInfoPage, {id:item.commentId});
    // }
  }
}
