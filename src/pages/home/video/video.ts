import {Component, Input} from '@angular/core';
import { NavController } from 'ionic-angular';
import { VideoDetailPage } from '../../videodetail/videodetail'

@Component({
  selector: 'homevideo',
  templateUrl: 'video.html'
})
export class VideoComponent {

  @Input() articleInfo: any = {};
  
  constructor(public navCtrl: NavController) {
  }

  goDetail(){
    this.navCtrl.push(VideoDetailPage);
  }
  

}
