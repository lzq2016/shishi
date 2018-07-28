import {Component} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular'
import {AboutPage} from '../about/about'
import {MapPage} from '../map/map'
// import {SchedulePage} from '../schedule/schedule'
import {SpeakerListPage} from '../speaker-list/speaker-list'
import {PublishDiaryPage} from '../diary/publish-diary'
import {NoticePage} from '../notice/notice'
import {ProfilePage} from '../profile/profile'
// import {SettingPage} from '../setting/setting'
import {HomePage} from '../home/home'

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = HomePage
  tab2Root: any = SpeakerListPage
  tab3Root: any = ''
  tab4Root: any = MapPage
  noticePage: any = NoticePage
  tab5Root: any = AboutPage
  profilePage: any = ProfilePage
  mySelectedIndex: number
  // @ViewChild('myTabs') tabRef: any;


  constructor(public navParams: NavParams, public navCtrl: NavController) {
    // this.mySelectedIndex = navParams.data.tabIndex || 0
    this.mySelectedIndex = navParams.get('tabIndex') || 0
  }

  selectTab() {
    // this.tabRef.select(2);
    this.navCtrl.push(PublishDiaryPage);
  }

}

