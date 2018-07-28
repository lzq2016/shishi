import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-share-modal',
  templateUrl: 'share-modal.html',
})
export class ShareModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtl: ViewController) {
  }

  goBack(event) {
    let data: string = this.navParams.get('key');
    this.viewCtl.dismiss(data);
    event && event.stopPropagation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareModalPage');
  }

}
