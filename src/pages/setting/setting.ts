import {Component} from '@angular/core';

import {AlertController, NavController, ToastController, Events, App} from 'ionic-angular';
import {SchedulePage} from '../schedule/schedule';
import {ProfilePage} from '../profile/profile';
import {SupportPage} from '../support/support';
// import {AccountPage} from '../account/account';
import {UploadavatarPage} from '../uploadavatar/uploadavatar';
import {NoticePage} from '../notice/notice';
import {PageInterface} from '../../app/app.component';
import {SpeakerListPage} from '../speaker-list/speaker-list';
import {TabsPage} from '../tabs-page/tabs-page';
import {UserData} from '../../providers/user-data'
import {LoginPage} from "../login/login";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  appPages: PageInterface[] = [
    {title: '首页', name: 'TabsPage', component: TabsPage, tabComponent: SchedulePage, index: 0, icon: 'home'},
    {title: '精选', name: 'TabsPage', component: TabsPage, tabComponent: SpeakerListPage, index: 1, icon: 'rose'},
    // {title: '消息', name: 'TabsPage', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map'},
    {title: '消息', name: 'TabsPage', component: TabsPage, tabComponent: NoticePage, index: 2, icon: 'notifications'},
    // {title: '我的', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle'}
    {title: '我的', name: 'TabsPage', component: ProfilePage, tabComponent: ProfilePage, index: 3, icon: 'contact'}
  ]
  loggedInPages: PageInterface[] = [
    {title: '用户信息', name: 'AccountPage', component: UploadavatarPage, icon: 'person'},
    {title: '支持', name: 'SupportPage', component: SupportPage, icon: 'help'},
    {title: '登出', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true}
  ]

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public userData: UserData,
              public events: Events,
              public storage: Storage,
              public app: App,
              public toast: ToastController) {

  }

  ionViewDidEnter() {
  }
  back() {
    this.navCtrl.pop();
  }
  isActive(page: PageInterface) {
    let childNav = this.navCtrl.getActiveChildNavs()[0]

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary'
      }
      return
    }

    if (this.navCtrl.getActive() && this.navCtrl.getActive().name === page.name) {
      return 'primary'
    }
    return
  }
  openPage(page: PageInterface) {
    if (page.logsOut === true) {
      this.storage.remove(this.userData.HAS_LOGGED_IN);
      this.storage.remove('username');
      this.storage.remove('token');
      this.events.publish('user:logout');
      this.app.getRootNav().setRoot(LoginPage)
    }
    if(page.name == "AccountPage"){
      this.navCtrl.push(page.component);
    }
  }
}
