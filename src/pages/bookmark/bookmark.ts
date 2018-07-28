import {Component} from '@angular/core'
import {NavController, NavParams, ViewController} from 'ionic-angular'


@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
})
export class BookmarkPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkPage')
    const data = this.navParams.get('data')
    console.log(data)
  }

  closeModal() {
    const data = {name: 'John'}
    this.view.dismiss(data)
  }
}
