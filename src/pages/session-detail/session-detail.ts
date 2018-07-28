import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ModalController} from "ionic-angular";
import {CommentModalPage} from "../comment-modal/comment-modal";

import {ConferenceData} from '../../providers/conference-data';
import {ShareModalPage} from "../share-modal/share-modal";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html',
  animations: [
    trigger('darken', [
      state('dark', style({
        display:'block',
        backgroundColor:'rgba(0,0,0,.4)',
      })),
      state('light', style({
        display:'none',
        backgroundColor:'rgba(0,0,0,0)',
      })),
      transition('light => dark', animate('200ms ease-out')),
      transition('dark => light', animate('200ms ease-in')),
    ]),
  ]
})
export class SessionDetailPage{
  session: any;
  detail: object;
  isSharing: boolean = false;
  love:boolean = false;
  isCommenting: boolean = false;
  showModalOccupy: boolean = false;
  lastTapTime;
  lastTapEffect:boolean=false;

  constructor(public dataProvider: ConferenceData,
              public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
    this.detail = {
      title: '带个人信息栏的新闻卡片:上栏中图下文字(满宽',
      source: '2018年1月25日 19:45 ' + '来自 ' + '中央电视台',
      content: `事实上任何私有制的意识形态最终都会演化成纳粹，这是必然，至于中间是个什么过程，那就多式多样了。
      为啥？私有制就是等级制，等级制的特征就是资源向上汇集，风险向下转移。每个人都必须往上爬，掉下去就是死。
      所谓富不过三代，穷不过三代就是对这一规律的朴素认识。可是啊，人活不下去就会闹的。
      那么私有制的意识形态是怎么解决这一根本矛盾的呢？思路也很简单，看马尔萨斯的人口论就好了。
      想想这些贱种又懒又笨又不思进取，还想白吃白喝，为什么会这样，文化问题？基因问题？怎么办呢？
      不能让这些贱种一直闹啊，这样大家怎么生活嘛。自己穷还不让别人活，游行堵路，耽误我上班。
      有了，把他们撵走，或者关起来，这样也很费钱，干脆全部剁了吧。这样世界就清静了。
      差不多就是这么想的，私有制的意识形态解决问题的方法就是把说出问题的人解决了。
      这个事情已经不知如何解释了，不知道用“作死”来形容是否恰当。才道歉几天，才开除给“藏独”点赞的临时工几天，就又开始玩新的把戏了，把中国台湾的城市划到日本去了。
      台湾虽然有皇民，但大部分台湾民众也不会承认台湾是日本领土。万豪，你这是要闹哪出呢？嫌在中国赚的钱太多？顺带把台湾也羞辱一把？
      我想，这个馊主意应该不是万豪老板想出来的，万豪作为一家大型跨国公司，老板不至于蠢到这个地步。
      是否有商业间谍卧底万豪，想把万豪往死里整？还是万豪的网站被人黑了？万豪内部该清理一下门户了。
      这样就没有问题了，（唯心脸。jpg）所以啊，台湾搞出这种事情也是正常的，毕竟自然规律是无敌的。
      咦？？？？按照这个划分标准看看国内，突然发现一大片。。。。。`
    };
    this.lastTapTime = +new Date;
  }

  onSLCClick(evType: string) {
    switch (evType) {
      case 'callShare':
        this.isSharing = !this.isSharing;
        console.log("dady receive share signal " + this.isSharing);
        this.presentModal('share');
        break;
      case 'callComment':
        this.isCommenting = !this.isCommenting;
        console.log("dady receive comment signal " + this.isCommenting);
        this.presentModal('comment');
        break;
      case 'callLove':
        this.love = !this.love;
        console.log("dady receive love signal " + this.love);
        break;
      default:
        console.log('SLC emit signal I do not know');
        break;
    }
  }

  presentModal(modalType:string) {
    let modal,data;
    switch (modalType){
      case 'comment':
        data = {
          key:'comment',
          value:{
            id:12345,
          }
        };
        modal = this.modalCtrl.create(CommentModalPage,data);
        break;
      case 'share':
        data = {
          key:'share',
          value:{
            id:12345,
          }
        };
        modal = this.modalCtrl.create(ShareModalPage,data);
        break;
      default:
        console.log('no this type of modal');
        break;
    }
    modal.onDidDismiss(data => {
      console.log('when modal dead',data);
      switch (data){
        case 'comment':
          this.isCommenting = !this.isCommenting;
          break;
        case 'share':
          this.isSharing = !this.isSharing;
          break;
      }
    });
    modal&&modal.present();
  }

  goBack() {
    this.navCtrl.canGoBack()&&this.navCtrl.pop();
  }

  listenDoubleTap() {
    let newTapTime = +new Date;
    if (!this.lastTapEffect) {
      if (newTapTime-this.lastTapTime<=300){
        console.log('double tapped');
        this.love = !this.love;
      }else{
        this.lastTapTime = newTapTime;
        console.log('not double tapped');
        return;
      }
    }
    this.lastTapTime = newTapTime;
    this.lastTapEffect=!this.lastTapEffect;//下一个tap生效与否
  }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === this.navParams.data.sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
      }
    });
  }
}
