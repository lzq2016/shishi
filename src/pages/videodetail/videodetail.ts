import {Component,OnInit,OnDestroy} from '@angular/core'
import { HttpClient } from '../../providers/httpClient';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { ServiceConfig } from '../../providers/service.config';
import { PublishCommentPage } from '../comment/publish-comment';


@Component({
  selector: 'page-videodetail',
  templateUrl: 'videodetail.html',
})
export class VideoDetailPage implements OnInit, OnDestroy {
  requrl: string = '';
  globalId: number = 0;
  contentId: number = 0
  hasZan: boolean = false
  hasCollected:boolean = false
  info = {};
  user = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public toastCtrl: ToastController,
  ) {
  }

  ionViewDidLoad() {
    
  }

  ngOnInit(){
   console.log("init")
   let that = this;
    this.requrl = ServiceConfig.getUrl();
    let id = this.navParams.get('id');
    this.globalId = this.navParams.get('id');
    this.http.get("api/v1/vlog/" + id + "/", function (data) {
      that.info = data;
      that.user = data.user;
      that.contentId = data.data.id;
      that.hasZan = data.has_liked;
      that.hasCollected = data.has_collected;
    });
  }

  ngOnDestroy(){ 
    console.log("destroy")
  }

  makeComment() {
    let that = this
    this.navCtrl.push(PublishCommentPage, { id: that.contentId, content_type: 'vlog', type: "comment" });
  }

  like() {
    let that = this
    this.http.post("/api/v1/like/", { content_type: 'vlog', object_id: that.globalId }, function (data) {
      if (data.success) {
        that.hasZan = true
        let toast = that.toastCtrl.create({
          message: '点赞成功',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      } else if (data.detail == "你已经赞过了") {
        that.hasZan = true
        let toast = that.toastCtrl.create({
          message: data.detail,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      } else {
        that.hasZan = true
        let toast = that.toastCtrl.create({
          message: data.detail,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    });
  }

}
