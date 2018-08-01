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
            time:that.dateDiff(item.timestamp)
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

  dateDiff(timestamp) {
    // 补全为13位
    // timestamp = Date.parse(new Date(timestamp))/1000;
    timestamp = (new Date(timestamp)).valueOf()/1000;
    let arrTimestamp:any = (timestamp + '').split('');
    for (var start = 0; start < 13; start++) {
        if (!arrTimestamp[start]) {
            arrTimestamp[start] = '0';
        }
    }
    timestamp = arrTimestamp.join('') * 1;

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    // var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - timestamp;

    // 如果本地时间反而小于变量时间
    if (diffValue < 0) {
        return '不久前';
    }

    // 计算差异时间的量级
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    // 数值补0方法
    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    // 使用 
    if (monthC > 12) {
        // 超过1年，直接显示年月日
        return (function () {
            var date = new Date(timestamp);
            return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
        })();
    } else if (monthC >= 1) {
        return parseInt(String(monthC)) + "月前";
    } else if (weekC >= 1) {
        return parseInt(String(weekC)) + "周前";
    } else if (dayC >= 1) {
        return parseInt(String(dayC)) + "天前";
    } else if (hourC >= 1) {
        return parseInt(String(hourC)) + "小时前";
    } else if (minC >= 1) {
        return parseInt(String(minC)) + "分钟前";
    }
    return '刚刚';
  };

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
