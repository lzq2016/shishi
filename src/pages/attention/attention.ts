import {Component,OnInit} from '@angular/core'
import {NavController, NavParams,ToastController} from 'ionic-angular'
import {HttpClient} from '../../providers/httpClient';
import { ServiceConfig } from '../../providers/service.config';
import {ProfilePage} from '../profile/profile'

@Component({
  selector: 'page-attention',
  templateUrl: 'attention.html',
})
export class AttentionPage implements OnInit{
  items:any = []
  nextPage:string = ""
  hasData:boolean = true;
  host:string = ""
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpClient:HttpClient,
    private toastCtrl: ToastController) {
      this.host = ServiceConfig.getUrl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkPage')
    const data = this.navParams.get('data')
    console.log(data)
  }

  ngOnInit(){
   console.log("init")
   let that = this;
   this.httpClient.get("api/v1/notification?verb=followed",function(data){
      console.log(data);
      if(data.results.length){
        that.hasData = true;
        for(let item of data.results){
          let obj = {
            name:item.actor.username,
            avatar: item.actor.avatar,
            time:that.format(item.timestamp),
            id:item.actor.id,
            followed:item.is_followed_actor
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
              let obj = {
                name:item.actor.username,
                avatar: item.actor.avatar,
                time:that.format(item.timestamp),
                id:item.actor.id,
                followed:item.is_followed_actor
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

  attention(id){
    console.log(id);
    let that = this;
    for(let i=0;i<that.items.length;i++){
          if(that.items[i].id == id && that.items[i].followed == false){
            that.httpClient.post("api/v1/follow/follow_user/",{user_id:id},function(data){
              console.log(data);
              if(data.results.length){
                that.items[i].followed = true;
                let toast = that.toastCtrl.create({
                  message: '关注成功',
                  duration: 2000,
                  position: 'middle'
                });
                toast.present();
              }
            });
          }
    }
  }

  goMe(userId){
    if(userId){
      this.navCtrl.push(ProfilePage,{userId:userId,fromOtherUser:true});
    }
  }
}
