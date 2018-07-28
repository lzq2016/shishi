import {Component,OnInit} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular'
import {Storage} from '@ionic/storage'
import {TabsPage} from '../tabs-page/tabs-page'
import {LoginPage} from '../login/login'

@Component({
  selector: 'page-guide',
  templateUrl: 'guide.html',
})
export class GuidePage implements OnInit {
  slides = ["assets/img/guide1.jpg","assets/img/guide2.jpg"];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkPage')
    const data = this.navParams.get('data')
    console.log(data)
  }

  ngOnInit(){
   console.log("init")
  }

  start(){
    let that = this
    this.storage.set('appFirstIn',"true");
    this.storage.get('token')
      .then((data) => {
        console.log("token data:" + data);
        if (data) {
          that.navCtrl.setRoot(TabsPage);
        }else {
          that.navCtrl.setRoot(LoginPage);
        }
    });
  }
}
