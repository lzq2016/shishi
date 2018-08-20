import { Component, ViewChild, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
  ToastController,
  LoadingController,
} from 'ionic-angular';
import { HttpClient } from '../../providers/httpClient';
import {Storage} from '@ionic/storage';
import { ServiceConfig } from '../../providers/service.config';
import { Slides } from 'ionic-angular';
import { ArticleInfoPage } from '../article-info/article-info'
import { RecordInfoPage } from '../record-info/record-info';
import { MarkPage } from './mark/mark';


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
  currentActiveTabIndex = 0;
  tabs = [{
    tabslabel: '音乐剧',
    tabsValue: '0',
  }, {
    tabslabel: '歌剧',
    tabsValue: '1',
  }, {
    tabslabel: '舞剧',
    tabsValue: '2',
  }, {
    tabslabel: '话剧',
    tabsValue: '3',
  }, {
    tabslabel: '戏曲',
    tabsValue: '4',
  }, {
    tabslabel: '街舞',
    tabsValue: '5',
  }, {
    tabslabel: '拉丁舞',
    tabsValue: '6',
  }, {
    tabslabel: '摩登舞',
    tabsValue: '7',
  }, {
    tabslabel: '芭蕾舞',
    tabsValue: '8',
  }, {
    tabslabel: '民族古典舞',
    tabsValue: '9',
  }, {
    tabslabel: '小型现场',
    tabsValue: '10',
  }, {
    tabslabel: '音乐会',
    tabsValue: '11',
  }, {
    tabslabel: '音乐节',
    tabsValue: '12',
  }, {
    tabslabel: '演唱会',
    tabsValue: '13',
  }]

  tabContentCache = [];

  slideH = screen.width * 0.7 + 'px'
  // slideList: any = []
  // diaryList: any = []
  pageNumber: number = 1;
  next: string = '';
  enabled: boolean = true;
  host: string = "";
  
  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public storage: Storage) {
    this.host = ServiceConfig.getUrl();
    this.checkAppVersion();
  }

  ionViewDidLoad() {
    this.centerScroll();
  }

  ngOnInit() {
    this.storage.get('tabsList').then(data => {
      if (data != '' && data != null && data != undefined) {
        let tabList = JSON.parse(data);
        this.tabs.length = 0;
        for(let i=0;i<tabList.length;i++){
          let obj = {
            tabslabel:'',
            tabsValue:''
          };
          obj["tabslabel"] = tabList[i].name;
          obj["tabsValue"] = String(i);
          this.tabs.push(obj);
        }
        this.tabContentCache.length = 0;
        this.initTabContentCache();
        this.initHomefeedList();
      }else{
        this.initTabContentCache();
        this.initHomefeedList();
      }
    });
  }

  initTabContentCache(){
    for(let i = 0;i<this.tabs.length;i++){
      this.tabContentCache[this.tabs[i].tabsValue] = {};
      this.tabContentCache[this.tabs[i].tabsValue]["pageNumber"] = 1;
      this.tabContentCache[this.tabs[i].tabsValue]["next"] = "";
      this.tabContentCache[this.tabs[i].tabsValue]["enabled"] = true;
    }
  }

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

  initHomefeedList() {
    let self = this;
    for(let i=0;i<this.tabContentCache.length;i++){
      self.http.get(ServiceConfig.SLIDE, function (data1) {
        self.tabContentCache[i]['slideList'] = data1;
        self.http.get(ServiceConfig.HOMETAGFEED + '?page=' + self.tabContentCache[i].pageNumber + '&tag_name=' + self.tabs[i].tabslabel, function (data2) {
          self.tabContentCache[i].next = data2.next;
          if (data2.next == '' || data2.next == null) {
            self.tabContentCache[i].enabled = false;
          } else {
            self.tabContentCache[i].enabled = true;
          }
          // for(let d of data.results) {
          //   self.diaryList.push(d);
          //   obj['feedList'] = d;
          // }
          self.tabContentCache[i]['feedList'] = data2.results;
        });
      });
    }
  }

  getHomefeedList(index) {
    let self = this;
    self.http.get(ServiceConfig.HOMEFEED + '?page=' + self.tabContentCache[index].pageNumber + '&tag_name=' + self.tabs[index].tabslabel, function (data) {
      self.tabContentCache[index].next = data.next;
      if (data.next == '' || data.next == null) {
        self.tabContentCache[index].enabled = false;
      } else {
        self.tabContentCache[index].enabled = true;
      }
      self.tabContentCache[index]['feedList'] = self.tabContentCache[index]['feedList'].concat(data.results);
    });
  }

  // doInfinite(infiniteScroll): Promise<any> {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       if (this.next != '' && this.next != null && this.enabled) {
  //         this.enabled = false;
  //         this.pageNumber++;
  //         this.getHomefeedList();
  //         infiniteScroll.complete();
  //         resolve();
  //       } else {
  //         resolve();
  //         infiniteScroll.complete();
  //       }
  //     }, 500);
  //   });
  // }

  doInfinite(infiniteScroll) {
    let index = this.currentActiveTabIndex;
   if(this.tabContentCache[index].next != '' && this.tabContentCache[index].next != null && this.tabContentCache[index].enabled) {
      this.tabContentCache[index].enabled = false;
      this.tabContentCache[index].pageNumber++;
      this.getHomefeedList(index);
      infiniteScroll.complete();
    } else {
      infiniteScroll.complete();
    }
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
    this.currentActiveTabIndex = index;
  }
  // On slide changed
  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    this.page.pageNum = currentIndex;
    this.currentActiveTabIndex = currentIndex;
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
