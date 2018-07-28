import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '../../providers/httpClient';
import {ServiceConfig} from '../../providers/service.config';

@Component({
  selector: 'page-msgnotice',
  templateUrl: 'msgnotice.html',
})
export class MsgnoticePage implements OnInit{

  items:any = []
  nextPage:string = ""
  hasData:boolean = true;
  imgUrl:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient:HttpClient) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticeInfoPage');
  }

  ngOnInit(){
   console.log("init")
   let that = this;
   this.imgUrl = ServiceConfig.getUrl();
   this.httpClient.get("api/v1/notification?verb=send",function(data){
      console.log(data);
      if(data.results.length){
        that.hasData = true;
        for(let item of data.results){
          let title = item.action_object ? item.action_object.title:"通知消息走失了。。。";
          let obj = {
            img:"http://api.dev.shishistartup.com" + item.action_object.image,
            title:title,
            time:that.format(item.timestamp),
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
  doInfinite(infiniteScroll) {
    let that = this;
    if(that.nextPage){
      this.httpClient.get(that.nextPage,function(data){
        console.log(data);
        if(data.results.length){
          for(let item of data.results){
            let title = item.action_object ? item.action_object.title:"通知消息走失了。。。";
            let obj = {
              img:"http://api.dev.shishistartup.com" + item.action_object.image,
              title:title,
              time:that.format(item.timestamp),
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
}
