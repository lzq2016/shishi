import {Component,OnInit} from '@angular/core'
import {ModalController, NavController, NavParams} from 'ionic-angular'
import {HttpClient} from '../../providers/httpClient';
import {GetlikePage} from '../getlike/getlike'
import {AttentionPage} from '../attention/attention';
import {MsgcommentPage} from '../msgcomment/msgcomment';
import {MsgcollectionallPage} from '../msgcollectionall/msgcollectionall';
import {MsgnoticePage} from '../msgnotice/msgnotice';

@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})
export class NoticePage implements OnInit{
  items = [
    {
      src:'assets/img/getlike.png',
      page:"getlike",
      title: '获赞',
      new:false,
    },
    {
      page:"msgcollection",
      title: '收藏',
      src:'assets/img/collection.png',
      new:false,
    },
    {
      page:"msgcomment",
      title: '评论',
      src:'assets/img/comment.png',
      new:false,
    },
    {
      page:"attention",
      title: '关注',
      src:'assets/img/attention.png',
      new:false,
    },
    {
      page:"notice",
      title: '通知消息',
      info: '和清华学霸在一起',
      src:'assets/img/notice.png',
      new:false,
    }
  ]

  test = true
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private httpClient:HttpClient) {
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

  ngOnInit(){
   console.log("init")
   let that = this;
   this.httpClient.get("api/v1/notification/unread_count/?verb=liked",function(data){
      console.log(data);
      if(data.unread_count > 0){
       for(let item in that.items){
         if(that.items[item].page == "getlike"){
             that.items[item].new = true
         }
       }
      }
    });
   this.httpClient.get("api/v1/notification/unread_count/?verb=commented",function(data){
      console.log(data);
      if(data.unread_count > 0){
        for(let item in that.items){
         if(that.items[item].page == "msgcomment"){
             that.items[item].new = true
         }
       }
      }
    });
   this.httpClient.get("api/v1/notification/unread_count/?verb=collected",function(data){
      console.log(data);
      if(data.unread_count > 0){
        for(let item in that.items){
         if(that.items[item].page == "msgcollection"){
             that.items[item].new = true
         }
       }
      }
    });
   this.httpClient.get("api/v1/notification/unread_count/?verb=followed",function(data){
      console.log(data);
      if(data.unread_count > 0){
        for(let item in that.items){
         if(that.items[item].page == "notice"){
             that.items[item].new = true
         }
       }
      }
    });
  }
}
