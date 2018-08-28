import {Component,OnInit,OnDestroy} from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
import { ServiceConfig } from '../../../providers/service.config';
import {ModalController} from 'ionic-angular';
import { VideoDetailPage } from '../../videodetail/videodetail'

@Component({
  selector: 'page-videohotlist',
  templateUrl: 'videohotlist.html',
})
export class VideoHotListPage implements OnInit, OnDestroy {
  videoList = [];
  nextPage:string = ""

  constructor(
    public http: HttpClient,
    public modalCtrl: ModalController
    ) {
  }

  ngOnInit(){
   console.log("init")
   this.initVideoList();
  }   

  initVideoList(){
    let that = this;
    that.http.get(ServiceConfig.HOMEFEED + '?content_type=vlog', function (data) {
        console.log(data);
        that.videoList = that.videoList.concat(data.results);
        that.nextPage = data.next;
    });
  }

  getVideoList(){
    let that = this;
    that.http.get(that.nextPage, function (data) {
        console.log(data);
        that.videoList = that.videoList.concat(data.results);
        that.nextPage = data.next;
    });
  }

  doInfinite(infiniteScroll) {
    let that = this;
    infiniteScroll.enable(false);
    if(that.nextPage){
      that.getVideoList();
      infiniteScroll.complete();
    }else{
      infiniteScroll.enable(false);
    }
  }

  goVideoDetail(id){
    let profileModal = this.modalCtrl.create(VideoDetailPage, { id:id },{showBackdrop:true,enableBackdropDismiss:true});
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }
  
  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
