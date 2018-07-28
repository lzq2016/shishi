import {AfterViewInit, Component, ElementRef, ChangeDetectorRef} from '@angular/core';

import {
  ActionSheet,
  ActionSheetController,
  ActionSheetOptions,
  Config,
  NavController
} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';

import {ConferenceData} from '../../providers/conference-data';

import {SessionDetailPage} from '../session-detail/session-detail';
import {SpeakerDetailPage} from '../speaker-detail/speaker-detail';
import {animate, state, style, transition, trigger} from "@angular/animations";
//import {LoginPage} from "../login/login";

// import { NewsBaseInfo } from "../../components/newsBaseInfo/newsBaseInfo";
import { HttpClient } from '../../providers/httpClient';
import { ServiceConfig } from '../../providers/service.config';

import {ArticleInfoPage} from '../article-info/article-info'
import {RecordInfoPage} from '../record-info/record-info';

export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean | void;
}

export interface point {
  x: number;
  y: number;
}
//flipDown给上半页
@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  animations: [
    trigger('flipDown', [
      state('last', style({
        'transform': 'perspective(1000px) rotate3d(1, 0, 0, 90deg)',
        'animation-timing-function': 'ease-in'
      })),
      state('first', style({
        'transform': 'perspective(1000px) rotate3d(1, 0, 0, 90deg)',
        'animation-timing-function': 'ease-in'
      })),
      transition('last => first', animate('500ms ease-out'))
    ]),
    trigger('contentTop', [
      state('top', style({
        top: '0',
        height: '100%'
      })),
      state('notTop', style({
        top: '40%',
        height: '60%'
      })),
      transition('top => notTop', animate('500ms ease-out')),
      transition('notTop => top', animate('500ms ease-in')),
    ]),
  ]
})
export class SpeakerListPage implements AfterViewInit {
  actionSheet: ActionSheet;
  speakers: any[] = [];
  type: number = 3;
  neverPanned: boolean = true;
  cardList = [];
  contentHeight: number;
  pagePointer: number = 0;
  pageCount: number;
  pageNumber: number = 1;
  pageUpperSet: any[];
  pageLowerSet: any[];
  endDistance: number = 200;
  pos: point = {x: 0, y: 0};
  nextPgae: string;
  count: number = 1;

  constructor(public actionSheetCtrl: ActionSheetController,
              public navCtrl: NavController,
              public confData: ConferenceData,
              public config: Config,
              public http: HttpClient,
              public inAppBrowser: InAppBrowser,
              public ref: ChangeDetectorRef,
              private el: ElementRef,) {
  }

  ngAfterViewInit() {
    this.getCareselectList();
  }
  // 回到首页
  goHomePage() {
    this.pagePointer = 0;
    this.endDistance = 200;
    this.pos.x = 0;
    this.pos.y = 0;
    setTimeout(() => {
      this.pageCount = this.cardList.length;
      this.contentHeight = this.el.nativeElement.querySelector('.flipBoard').clientHeight;
      this.pageUpperSet = this.el.nativeElement.querySelectorAll('.flipPage>.up-half');
      this.pageLowerSet = this.el.nativeElement.querySelectorAll('.flipPage>.down-half');
      this.initPageFlip();
    }, 500);
  }
  getCareselectList(){
    let self = this;
    self.http.get(ServiceConfig.OPERATIONSELECTED + '?page=' + this.pageNumber, function(data){
      self.nextPgae = data.next;
      for (let d of data.results) {
        self.cardList.push(d);
      }
    });
    setTimeout(() => {
      this.pagePointer = 0;
      this.endDistance = 200;
      this.pos.x = 0;
      this.pos.y = 0;
      this.pageCount = this.cardList.length;
      this.contentHeight = this.el.nativeElement.querySelector('.flipBoard').clientHeight;
      this.pageUpperSet = this.el.nativeElement.querySelectorAll('.flipPage>.up-half');
      this.pageLowerSet = this.el.nativeElement.querySelectorAll('.flipPage>.down-half');
      this.initPageFlip();
    }, 500);
  }
  duringPan(ev) {
    this.neverPanned = false;
    this.pos.x = ev.deltaX;
    this.pos.y = ev.deltaY;
    // 拖动某个页面的时候，通过计算角度倾斜上方或者下方的页面
    // y值为正代表向下，负值代表向上
    if (this.pos.y <= 0) {
      // 翻上
      if (this.pos.y <= -this.endDistance && this.pageCount - this.pagePointer <= 1) {
        this.pos.y = -this.endDistance;
      }
      let deg = (this.pos.y / (this.contentHeight / 2)) * (-90);
      this.updatePos(deg, this.pageLowerSet[this.pagePointer]);
      this.updateZIndex(this.pageCount + 1, this.pageLowerSet[this.pagePointer]);

      let lowerDeg = (2 + (this.pos.y / (this.contentHeight / 2))) * (-90);
      this.updatePos(lowerDeg, this.pageUpperSet[this.pagePointer + 1]);
      this.updateZIndex(this.pageCount, this.pageUpperSet[this.pagePointer + 1]);
    } else {
      // 翻下
      if (this.pos.y >= this.endDistance && this.pagePointer === 0) {
        this.pos.y = this.endDistance;
      }
      let deg = (this.pos.y / (this.contentHeight / 2)) * (-90);
      this.updatePos(deg, this.pageUpperSet[this.pagePointer]);
      this.updateZIndex(this.pageCount, this.pageUpperSet[this.pagePointer]);

      let lowerDeg = (2 - (this.pos.y / (this.contentHeight / 2))) * (90);
      this.updatePos(lowerDeg, this.pageLowerSet[this.pagePointer - 1]);
      this.updateZIndex(this.pageCount + 1, this.pageLowerSet[this.pagePointer - 1]);
    }
  }

  panDone() {
    this.count++;
    if(this.count.toString().indexOf('9') > 0){
      if(this.nextPgae!='' && this.nextPgae != null){
        this.pageNumber++;
        this.getCareselectList();
        this.ref.detectChanges();
      }
    }
    // 一次拖动结束之后的处理事件
    if (this.pos.y < -200 && (this.pageCount - this.pagePointer > 1)) {
      // 当y小于-100时，换下一页，下一页转动到0°位置，本页转到180°位置，上一页复位
      // 如果没有下一页，本页归位

      this.updateAni(0, this.pageLowerSet[this.pagePointer + 1]);
      this.updateAni(0, this.pageUpperSet[this.pagePointer + 1]);
      this.updateAni(-180, this.pageUpperSet[this.pagePointer + 1 + 1]);
      this.updateAni(180, this.pageLowerSet[this.pagePointer + 1 - 1]);
      this.pos.x = 0;
      this.pos.y = 0;
      this.pagePointer++;
      setTimeout(() => {
        this.updateZIndex(this.pageCount, this.pageUpperSet[this.pagePointer - 1]);
        this.updateZIndex(this.pageCount, this.pageLowerSet[this.pagePointer - 1]);

        this.updateZIndex(this.pageCount, this.pageUpperSet[this.pagePointer]);
        this.updateZIndex(this.pageCount, this.pageLowerSet[this.pagePointer]);

      }, 0);

    } else if (this.pos.y > 200 && (this.pagePointer > 0)) {
      // 当y大于100时，换上一页，上一页转动到0°位置，本页转到-180°位置，下一页复位
      // 如果没有上一页，本页归位

      this.updateAni(0, this.pageLowerSet[this.pagePointer - 1]);
      this.updateAni(0, this.pageUpperSet[this.pagePointer - 1]);
      this.updateAni(-180, this.pageUpperSet[this.pagePointer - 1 + 1]);
      this.updateAni(180, this.pageLowerSet[this.pagePointer - 1 - 1]);
      this.pos.x = 0;
      this.pos.y = 0;
      this.pagePointer--;

      setTimeout(() => {

        this.updateZIndex(this.pageCount - this.pagePointer - 1, this.pageUpperSet[this.pagePointer + 1]);
        this.updateZIndex(this.pageCount - this.pagePointer - 1, this.pageLowerSet[this.pagePointer + 1]);

        this.updateZIndex(this.pageCount, this.pageUpperSet[this.pagePointer]);
        this.updateZIndex(this.pageCount, this.pageLowerSet[this.pagePointer]);

      }, 0);

    } else {
      // 拖动距离没有超过阈值，全部归位
      this.updateAni(0, this.pageLowerSet[this.pagePointer]);
      this.updateAni(0, this.pageUpperSet[this.pagePointer]);
      this.updateAni(-180, this.pageUpperSet[this.pagePointer + 1]);
      this.updateAni(180, this.pageLowerSet[this.pagePointer - 1]);

      this.updateZIndex(this.pageCount, this.pageUpperSet[this.pagePointer]);
      this.updateZIndex(this.pageCount, this.pageLowerSet[this.pagePointer]);
      this.updateZIndex(this.pageCount - this.pagePointer - 1, this.pageUpperSet[this.pagePointer + 1]);
      this.updateZIndex(this.pageCount, this.pageLowerSet[this.pagePointer - 1]);
      this.pos.x = 0;
      this.pos.y = 0;
    }
  }

  autoFlip() {
    let time = 50;
    if (this.pagePointer > 0) {
      // 如果没有下一页，本页归位
      this.pagePointer--;
      this.updateZIndex(this.pageCount + 1, this.pageLowerSet[this.pagePointer]);
      this.updateAni(0, this.pageLowerSet[this.pagePointer],time);
      this.updateAni(0, this.pageUpperSet[this.pagePointer],time);
      this.updateAni(-180, this.pageUpperSet[this.pagePointer + 1],time);
      this.updateAni(180, this.pageLowerSet[this.pagePointer - 1],time);
      this.pos.x = 0;
      this.pos.y = 0;

      setTimeout(() => {

        this.updateZIndex(this.pageCount - this.pagePointer - 1, this.pageUpperSet[this.pagePointer + 1]);
        this.updateZIndex(this.pageCount - this.pagePointer - 1, this.pageLowerSet[this.pagePointer + 1]);

        this.updateZIndex(this.pageCount, this.pageUpperSet[this.pagePointer]);
        this.updateZIndex(this.pageCount, this.pageLowerSet[this.pagePointer]);

        setTimeout(() => {
          this.autoFlip()
        },time)

      }, time);
    }else{
      this.cardList.push({
        type: -1,
      });
      setTimeout(() => {
        this.pageCount = this.cardList.length;
        this.pageUpperSet = this.el.nativeElement.querySelectorAll('.flipPage>.up-half');
        this.pageLowerSet = this.el.nativeElement.querySelectorAll('.flipPage>.down-half');
        this.initPageFlip();
        console.log(this.pageCount)
        console.log(this.pageUpperSet)
        console.log(this.pageLowerSet)
      }, 500);
    }
  }

  // 初始化页面滑动效果
  initPageFlip() {
    for (let i = 0; i < this.pageCount; i++) {
      if (i !== 0) {
        this.updatePos(-180, this.pageUpperSet[i]);
      }
      this.updateZIndex(this.pageCount - i, this.pageUpperSet[i]);
      this.updateZIndex(this.pageCount - i, this.pageLowerSet[i]);
    }
  }

// 无动画更新页面位置的方法
  updatePos(deg, obj) {
    if (obj) {
      var value = [
        'perspective(1000px) rotate3d(1, 0, 0, ' + deg + 'deg)'
      ];
      obj.style.webkitTransition = 'none';
      obj.style.mozTransition = 'none';
      obj.style.transition = 'none';
      obj.style.webkitTransform = value;
      obj.style.mozTransform = value;
      obj.style.transform = value;
    }
  }

// 有动画更新页面位置的方法
  updateAni(deg, obj, duration?) {
    if (obj) {
      let value = [
        'perspective(1000px) rotate3d(1, 0, 0, ' + deg + 'deg)'
      ];
      let transition = duration? `all ${duration/1000}s`:`all 0.5s`;
      obj.style.webkitTransition = transition;
      obj.style.mozTransition = transition;
      obj.style.transition = transition;
      obj.style.webkitTransform = value;
      obj.style.mozTransform = value;
      obj.style.transform = value;
    }
  }

  updateZIndex(zIndex, obj) {
    if (obj) {
      obj.style.zIndex = zIndex;
    }
  }

  handleFresh(){
    console.log('i should refresh')
    this.autoFlip();
  }

  ionViewDidLoad() {
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, {sessionId: session.id});
  }

  goToSpeakerDetail(speaker: any) {
    this.navCtrl.push(SpeakerDetailPage, {speakerId: speaker.id});
  }

  goToSpeakerTwitter(speaker: any) {
    this.inAppBrowser.create(
      `https://twitter.com/${speaker.twitter}`,
      '_blank'
    );
  }

  openSpeakerShare(speaker: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if ((window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
              (window as any)['cordova'].plugins.clipboard.copy(
                'https://twitter.com/' + speaker.twitter
              );
            }
          }
        } as ActionSheetButton,
        {
          text: 'Share via ...'
        } as ActionSheetButton,
        {
          text: 'Cancel',
          role: 'cancel'
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }

  openContact(speaker: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        } as ActionSheetButton,
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }

  goDetail(item){
    if(item.content_type == "blog"){
      this.navCtrl.push(ArticleInfoPage, {id:item.content_object.id,type:"blog"});
    }
    if(item.content_type == "topic"){
      this.navCtrl.push(ArticleInfoPage, {id:item.content_object.id,type:"topic"});
    }
    if(item.content_type == "diary"){
      this.navCtrl.push(RecordInfoPage, {id:item.content_object.id});
    }
  }
}
