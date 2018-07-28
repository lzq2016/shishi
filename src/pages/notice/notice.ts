import {Component} from '@angular/core'
import {ModalController, NavController, NavParams} from 'ionic-angular'
// import {BookmarkPage} from '../bookmark/bookmark'
import {GetlikePage} from '../getlike/getlike'
import {AttentionPage} from '../attention/attention';
import {MsgcommentPage} from '../msgcomment/msgcomment';
import {MsgcollectionallPage} from '../msgcollectionall/msgcollectionall';
import {MsgnoticePage} from '../msgnotice/msgnotice';

@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})
export class NoticePage {
  items = [
    {
      icon: 'heart',
      color: '#FD7F8E',
      page:"getlike",
      title: '获赞'
    },
    {
      icon: 'bookmark',
      color: '#9EDDFD',
      page:"msgcollection",
      title: '收藏'
    },
    {
      icon: 'chatboxes',
      color: '#B0E680',
      page:"msgcomment",
      title: '评论'
    },
    {
      icon: 'people',
      color: '#A6E8C7',
      page:"attention",
      title: '关注'
    },
    {
      icon: 'alert',
      color: '#FDD89D',
      page:"notice",
      title: '通知消息',
      info: '和清华学霸在一起'
    }
  ]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticePage')
  }

  itemSelected(page) {
    // let modal = this.modalCtrl.create(BookmarkPage)
    if(page == "getlike"){
      this.navCtrl.push(GetlikePage);
    }
    if(page == "attention"){
      this.navCtrl.push(AttentionPage);
    }
    if(page == "msgcomment"){
      this.navCtrl.push(MsgcommentPage);
    }
    if(page == "msgcollection"){
      // let modal = this.modalCtrl.create(MsgcollectionallPage) 
      // modal.present()
      // modal.onWillDismiss((data: any) => {
      //   console.log(data)
      // })
      this.navCtrl.push(MsgcollectionallPage);
    }
    if(page == "notice"){
      this.navCtrl.push(MsgnoticePage);
    }
  }
}
