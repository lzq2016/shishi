import {Component, Input,OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { VideoDetailPage } from '../../videodetail/videodetail'

@Component({
  selector: 'homevideo',
  templateUrl: 'homevideo.html'
})
export class VideoComponent implements OnInit{
  id = 0;
  @Input() videoInfo: any = {};
  @Input() from = '';
  
  constructor(public navCtrl: NavController) {
  }

  ngOnInit() {
    this.id = this.videoInfo.object_id;
  }

  goDetail(){
    this.navCtrl.push(VideoDetailPage,{id:this.videoInfo.object_id});
  }
  

}
