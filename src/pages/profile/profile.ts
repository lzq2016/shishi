import {Component} from '@angular/core'
import {NavController,NavParams} from 'ionic-angular'
// import {SettingPage} from "../setting/setting";
import { HttpClient } from '../../providers/httpClient';
import { ServiceConfig } from '../../providers/service.config';
import { Storage } from '@ionic/storage';
import { Base64 } from 'js-base64';
import {ArticleInfoPage} from '../article-info/article-info'
import {RecordInfoPage} from '../record-info/record-info';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: any;
  userInfo = [];
  url: string = '';
  next: string = '';
  userId: string = '';
  pageNumber: number = 1;
  fromOtherUser:boolean = false;
  constructor(public navCtrl: NavController, public storage: Storage, public http: HttpClient,public navParams:NavParams) {
  }

  ionViewDidLoad() {
    this.url = ServiceConfig.getUrl();
    let user_id = this.navParams.get("userId");
    if(this.navParams.get("fromOtherUser")){
      this.fromOtherUser = true;
    }
    if(user_id){
      this.userId = user_id;
      this.getActionList();
      this.getUserDetail();
    }else{
      this.storage.get('token').then(data => {
        if (data != '' && data != null && data != undefined) {
          this.userId = Base64.decode(data).split('"user_id":')[1].split(',')[0];
          this.getActionList();
          this.getUserDetail();
        }
      });
    }
    console.log('ionViewDidLoad ProfilePage')
  }
  doInfinite(infiniteScroll) {
    if(this.next != '' && this.next != null) {
      this.pageNumber++;
      this.getActionList();
      infiniteScroll.complete();
    }else {
      infiniteScroll.complete();
    }
  }
  getUserDetail(){
    let self = this;
    self.http.get(ServiceConfig.GETUSERDETAIL + this.userId + '/get_user_detail', function(data){
      self.user = data
    });
  }
  getActionList(){
    let self = this;
    self.http.get(ServiceConfig.ACTION + '?user_id=' + this.userId + '&page=' + this.pageNumber, function(data){
      self.next = data.next;
      for(let d of data.results.reverse()) {
        self.userInfo.push(d);
      }
    });
  }
  // openSetting() {
  //   this.navCtrl.push(SettingPage)
  // }

  goBack(){
    console.log(123)
    this.navCtrl.pop();
  }

  // goTopicDetail(id){
  //   console.log("topicid:"+id);
  //   this.navCtrl.push(ArticleInfoPage, {id:id,type:"topic"});
  // }
  goBlogDetail(id){
    console.log("blogid:"+id);
    this.navCtrl.push(ArticleInfoPage, {id:id,type:"blog"});
  }
  goDiaryDetail(id){
    console.log(id);
    this.navCtrl.push(RecordInfoPage, {id:id});
  }
}
