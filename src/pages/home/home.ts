import {Component, ViewChild,OnInit} from '@angular/core';
import {
  AlertController,
  App,
  ModalController,
  NavController,
  ToastController,
  LoadingController,
} from 'ionic-angular';
import { HttpClient } from '../../providers/httpClient';
import { ServiceConfig } from '../../providers/service.config';
import { Slides } from 'ionic-angular';
import {ArticleInfoPage} from '../article-info/article-info'
import {RecordInfoPage} from '../record-info/record-info';
import {ConferenceData} from '../../providers/conference-data';
import {UserData} from '../../providers/user-data';
// import {DiaryDetailPage} from '../diary/diary-detail'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  @ViewChild(Slides) slides: Slides;
  slideH = screen.width * 0.7 + 'px'
  slideList: any = []
  diaryList: any = []
  interestedList: any = []
  pageNumber:number = 1;
  next: string = '';
  url: string = '';
  enabled: boolean = true;
  host:string = "";

  constructor(public alertCtrl: AlertController,
              public app: App,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public navCtrl: NavController,
              public http: HttpClient,
              public toastCtrl: ToastController,
              public confData: ConferenceData,
              public user: UserData) {
    this.host = ServiceConfig.getUrl();
    this.checkAppVersion();
  }

  ngOnInit(){
    //修复轮播手动滑动后不能自动轮播问题
    this.slides.autoplayDisableOnInteraction = false;
    // this.diaryList.length = 0;
    this.getSlideList();
    this.getHomefeedList();
    this.getInterestedList();
  }
  // ionViewDidEnter() {
  //   //修复轮播手动滑动后不能自动轮播问题
  //   this.slides.autoplayDisableOnInteraction = false;
  //   // this.diaryList.length = 0;
  //   this.getSlideList();
  //   this.getHomefeedList();
  //   this.getInterestedList();
  // }
  checkAppVersion(){
    let self = this;
    let appVersion = ServiceConfig.appVersion;
    self.http.get("check_update/", function(data){
      if(data.version != appVersion){
        let alert = self.alertCtrl.create({
          title: '提示',
          subTitle: "有新版本请更新",
          buttons:[
            {
              text: '取消',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: '确定',
              handler: () => {
                window.open(self.host + data.url, '_system', 'location=yes');
              }
            }
          ]
        });
        alert.present();
      }
    });
  }
  doInfinite(infiniteScroll): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        if(this.next != '' && this.next!= null && this.enabled) {
          this.enabled = false;
          this.pageNumber++;
          this.getHomefeedList();
          infiniteScroll.complete();
          resolve();
        }else {
          resolve();
          infiniteScroll.complete();
        }
      }, 500);
    });
  }
  // 删除感兴趣的
  deleteInterested(index){
    this.interestedList.splice(index,1);
  }
  followUser(item) {
    let self = this;
    self.http.postForm(ServiceConfig.FOLLOWUSER,{
      user_id: item.id
    }, function(){
      item.interested = true;
    });
  }
  getInterestedList(){
    let self = this;
    self.http.get(ServiceConfig.INTERESTED, function(data){
      self.interestedList = data;
    });
  }
  getHomefeedList(){
    let self = this;
    self.http.get(ServiceConfig.HOMEFEED + '?page=' + this.pageNumber, function(data){
      self.next = data.next;
      if(data.next == '' || data.next == null) {
        self.enabled = false;
      }else {
        self.enabled = true;
      }
      for(let d of data.results) {
        self.diaryList.push(d);
      }
    });
  }
  getSlideList(){
    let self = this;
    self.http.get(ServiceConfig.SLIDE, function(data){
      self.slideList = data;
    });
  }
  ionViewDidLoad() {
    this.url = ServiceConfig.getUrl();
    console.log(this.url)
    console.log(ServiceConfig.getUrl())
    // this.app.setTitle('Schedule');
    // this.updateSchedule();
  }

  // goToSessionDetail(sessionData: any) {
  //   console.log(sessionData.timeStart, typeof sessionData.timeStart)
  //   this.navCtrl.push(DiaryDetailPage, {sessionId: sessionData.id, name: sessionData.name});
  // }

  goTopicDetail(id){
    console.log("topicid:"+id);
    this.navCtrl.push(ArticleInfoPage, {id:id,type:"topic"});
  }
  goBlogDetail(id){
    console.log("blogid:"+id);
    this.navCtrl.push(ArticleInfoPage, {id:id,type:"blog"});
  }
  goDiaryDetail(id){
    console.log(id);
    this.navCtrl.push(RecordInfoPage, {id:id});
  }
  slideDetail(type,id){
    if(type == "topic"){
      this.navCtrl.push(ArticleInfoPage, {id:id,type:"topic"});
    }
    if(type == "blog"){
      this.navCtrl.push(ArticleInfoPage, {id:id,type:"blog"});
    }
    if(type == "diary"){
      this.navCtrl.push(RecordInfoPage, {id:id});
    }
  }
}