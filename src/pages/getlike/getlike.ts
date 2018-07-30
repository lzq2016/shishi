import {Component,OnInit,OnDestroy} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular'
import {HttpClient} from '../../providers/httpClient';
import {ProfilePage} from '../profile/profile'
import {ArticleInfoPage} from '../article-info/article-info'
import {RecordInfoPage} from '../record-info/record-info';

@Component({
  selector: 'page-getlike',
  templateUrl: 'getlike.html',
})
export class GetlikePage implements OnInit, OnDestroy {
  items:any = []
  nextPage:string = ""
  hasData:boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpClient:HttpClient) {
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
        if(data.results.length){
          for(let item of data.results){
            let type = "";
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
            let obj = {
              name:item.actor.username,
              userId:item.actor.id,
              type:type,
              title:item.action_object.title,
              id:item.action_object.id,
              en_type:item.action_object_content_type,
              avatar:item.actor.avatar,
              time:that.format(item.timestamp)
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
   this.httpClient.get("api/v1/notification?verb=liked",function(data){
      console.log(data);
      if(data.results.length){
        that.hasData = true;
        for(let item of data.results){
          let type = "";
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
          let obj = {
            name:item.actor.username,
            userId:item.actor.id,
            type:type,
            id:item.action_object.id,
            en_type:item.action_object_content_type,
            title:item.action_object.title,
            avatar:item.actor.avatar,
            time:that.format(item.timestamp)
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
  goMe(userId){
    if(userId){
      this.navCtrl.push(ProfilePage,{userId:userId,fromOtherUser:true});
    }
  }

  goContent(item){
    console.log(item)
    if(item.en_type == "blog"){
      this.navCtrl.push(ArticleInfoPage, {id:item.id,type:"blog"});
    }
    if(item.en_type == "topic"){
      this.navCtrl.push(ArticleInfoPage, {id:item.id,type:"topic"});
    }
    if(item.en_type == "diary"){
      this.navCtrl.push(RecordInfoPage, {id:item.id});
    }
  }
}
