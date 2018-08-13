import { Component, OnInit, OnDestroy } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'


@Component({
  selector: 'page-diarymark',
  templateUrl: 'diarymark.html',
})
export class DiaryMarkPage implements OnInit, OnDestroy {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    console.log('UserId', navParams.get('userId'));
  }

  ionViewDidLoad() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    console.log("destroy")
  }

  goDiaryPublish() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
}