import { Component, ViewChild, OnInit } from '@angular/core';
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
import { ArticleInfoPage } from '../article-info/article-info'
import { RecordInfoPage } from '../record-info/record-info';
import { MarkPage } from './mark/mark';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page = {
    pageNum: 0,
    pageString: '0',
  };
  tabs = [{
    tabslabel: '测试1',
    tabsValue: '0',
  }, {
    tabslabel: '测试2',
    tabsValue: '1',
  }, {
    tabslabel: '测试3',
    tabsValue: '2',
  }, {
    tabslabel: '测试4',
    tabsValue: '3',
  }, {
    tabslabel: '测试5',
    tabsValue: '4',
  }, {
    tabslabel: '测试6',
    tabsValue: '5',
  }]

  tabContentCache = [];

  slideH = screen.width * 0.7 + 'px'
  slideList: any = []
  diaryList: any = []
  pageNumber: number = 1;
  next: string = '';
  enabled: boolean = true;
  host: string = "";
  testImg: any = ["https://shishifiles.oss-cn-beijing.aliyuncs.com/media%2FDiaryImage%2F2018%2F06%2F08%2Fb20c718da-4f8d-41fc-a3be-adcafcf0dbe4r_750w_750h_ss1.jpg",
    "https://shishifiles.oss-cn-beijing.aliyuncs.com/media%2FDiaryImage%2F2018%2F06%2F08%2Fb1ca99c65-96bc-42e6-969c-612d8e7817c9r_750w_750h_ss1.jpg",
    "https://shishifiles.oss-cn-beijing.aliyuncs.com/media%2FDiaryImage%2F2018%2F06%2F08%2Fbe5cfcbe6-cf81-4087-80fe-ad394b45c0b1r_750w_750h_ss1.jpg",
    "https://shishifiles.oss-cn-beijing.aliyuncs.com/media%2FDiaryImage%2F2018%2F06%2F08%2Fb8a27fe1b-7b58-4163-8691-fd44d0c4cb05r_750w_750h_ss1.jpg",
    "https://shishifiles.oss-cn-beijing.aliyuncs.com/media%2FDiaryImage%2F2018%2F06%2F08%2Fb3e48904a-93a8-477b-b0ab-a0d3a14fcda9r_750w_750h_ss1.jpg",
    "https://shishifiles.oss-cn-beijing.aliyuncs.com/media%2FDiaryImage%2F2018%2F06%2F08%2Fb3e48904a-93a8-477b-b0ab-a0d3a14fcda9r_750w_750h_ss1.jpg",
    "https://shishifiles.oss-cn-beijing.aliyuncs.com/media%2FDiaryImage%2F2018%2F06%2F08%2Fb3e48904a-93a8-477b-b0ab-a0d3a14fcda9r_750w_750h_ss1.jpg",
    "https://shishifiles.oss-cn-beijing.aliyuncs.com/media%2FDiaryImage%2F2018%2F06%2F08%2Fb3e48904a-93a8-477b-b0ab-a0d3a14fcda9r_750w_750h_ss1.jpg"];
  testImg1: any = ["https://shishifiles.oss-cn-beijing.aliyuncs.com/media%2FDiaryImage%2F2018%2F06%2F08%2Fb20c718da-4f8d-41fc-a3be-adcafcf0dbe4r_750w_750h_ss1.jpg"];
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

  ionViewDidLoad() {
    this.centerScroll();
  }

  ngOnInit() {
    // this.initTabContentCache();
    this.getHomefeedList();
  }

  // initTabContentCache(){
  //   for(let i = 0;i<this.tabs.length;i++){
  //     this.tabContentCache[this.tabs[i].tabsValue] = {};
  //   }
  // }

  checkAppVersion() {
    let self = this;
    let appVersion = ServiceConfig.appVersion;
    self.http.get("check_update/", function (data) {
      if (data.version != appVersion) {
        let alert = self.alertCtrl.create({
          title: '提示',
          subTitle: "有新版本请更新",
          buttons: [
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

  slideDetail(type, id) {
    if (type == "topic") {
      this.navCtrl.push(ArticleInfoPage, { id: id, type: "topic" });
    }
    if (type == "blog") {
      this.navCtrl.push(ArticleInfoPage, { id: id, type: "blog" });
    }
    if (type == "diary") {
      this.navCtrl.push(RecordInfoPage, { id: id });
    }
  }

  getHomefeedList() {
    let self = this;
    let obj = {};
    self.http.get(ServiceConfig.SLIDE, function (data1) {
      // self.slideList = data;
      obj['slideList'] = data1;
      self.http.get(ServiceConfig.HOMEFEED + '?page=' + self.pageNumber, function (data2) {
        self.next = data2.next;
        if (data2.next == '' || data2.next == null) {
          self.enabled = false;
        } else {
          self.enabled = true;
        }
        // for(let d of data.results) {
        //   self.diaryList.push(d);
        //   obj['feedList'] = d;
        // }
        obj['feedList'] = data2.results;
        self.tabContentCache.push(obj);
      });
    });
  }

  doInfinite(infiniteScroll): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.next != '' && this.next != null && this.enabled) {
          this.enabled = false;
          this.pageNumber++;
          this.getHomefeedList();
          infiniteScroll.complete();
          resolve();
        } else {
          resolve();
          infiniteScroll.complete();
        }
      }, 500);
    });
  }

  goTabSelect(){
    this.navCtrl.push(MarkPage,{id:1});
  }

  goTopicDetail(id) {
    console.log("topicid:" + id);
    this.navCtrl.push(ArticleInfoPage, { id: id, type: "topic" });
  }
  goBlogDetail(id) {
    console.log("blogid:" + id);
    this.navCtrl.push(ArticleInfoPage, { id: id, type: "blog" });
  }
  goDiaryDetail(id) {
    console.log(id);
    this.navCtrl.push(RecordInfoPage, { id: id });
  }


  selectedTab(index) {
    this.slider.slideTo(index);
  }
  // On slide changed
  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    this.page.pageNum = currentIndex;
    this.page.pageString = String(currentIndex);
    this.centerScroll();
  }

  // Center current scroll
  centerScroll() {
    if (!this.segments || !this.segments.nativeElement)
      return;

    let sizeLeft = this.sizeLeft();
    let sizeCurrent = this.segments.nativeElement.children[this.page.pageNum].clientWidth;
    let result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent / 2);

    result = (result > 0) ? result : 0;
    this.smoothScrollTo(result);
  }

  // Get size start to current
  sizeLeft() {
    let size = 0;
    for (let i = 0; i < this.page.pageNum; i++) {
      size += this.segments.nativeElement.children[i].clientWidth;
    }
    return size;
  }

  // Easing function
  easeInOutQuart(time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  }

  // Animate scroll
  smoothScrollTo(endX) {
    let startTime = new Date().getTime();
    let startX = this.segments.nativeElement.scrollLeft;
    let distanceX = endX - startX;
    let duration = 400;

    let timer = setInterval(() => {
      var time = new Date().getTime() - startTime;
      var newX = this.easeInOutQuart(time, startX, distanceX, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      this.segments.nativeElement.scrollLeft = newX;
    }, 1000 / 60); // 60 fps
  }
}
