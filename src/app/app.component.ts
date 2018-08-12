import {Component, ViewChild} from '@angular/core'
import {Events, MenuController, Nav, Platform} from 'ionic-angular'
import {SplashScreen} from '@ionic-native/splash-screen'
import {Storage} from '@ionic/storage'
import {AccountPage} from '../pages/account/account'
import {LoginPage} from '../pages/login/login'
import {SignupPage} from '../pages/signup/signup'
import {TabsPage} from '../pages/tabs-page/tabs-page'
// import {GuidePage} from '../pages/guide/guide'
import {TutorialPage} from '../pages/tutorial/tutorial'
import {SchedulePage} from '../pages/schedule/schedule'
import {SpeakerListPage} from '../pages/speaker-list/speaker-list'
import {SupportPage} from '../pages/support/support'
// import {testPage} from '../pages/test/test'
import {ConferenceData} from '../providers/conference-data'
import {UserData} from '../providers/user-data'
import {NoticePage} from '../pages/notice/notice'
import {ProfilePage} from '../pages/profile/profile'
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient } from '../providers/httpClient';
// import { ServiceConfig } from '../providers/service.config';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav

  // List of pages that can be navigated to from the left menu the left menu only works after login the login page disables the left menu
  appPages: PageInterface[] = [
    {title: '首页', name: 'TabsPage', component: TabsPage, tabComponent: SchedulePage, index: 0, icon: 'home'},
    {title: '精选', name: 'TabsPage', component: TabsPage, tabComponent: SpeakerListPage, index: 1, icon: 'rose'},
    // {title: '消息', name: 'TabsPage', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map'},
    {title: '消息', name: 'TabsPage', component: TabsPage, tabComponent: NoticePage, index: 2, icon: 'notifications'},
    // {title: '我的', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle'}
    {title: '我的', name: 'TabsPage', component: ProfilePage, tabComponent: ProfilePage, index: 3, icon: 'contact'}
  ]
  loggedInPages: PageInterface[] = [
    {title: '用户信息', name: 'AccountPage', component: AccountPage, icon: 'person'},
    {title: '支持', name: 'SupportPage', component: SupportPage, icon: 'help'},
    {title: '登出', name: 'TabsPage', component: LoginPage, icon: 'log-out', logsOut: true}
  ]
  loggedOutPages: PageInterface[] = [
    {title: '登录', name: 'LoginPage', component: LoginPage, icon: 'log-in'},
    {title: '支持', name: 'SupportPage', component: SupportPage, icon: 'help'},
    {title: '注册', name: 'SignupPage', component: SignupPage, icon: 'person-add'}
  ]
  rootPage: any

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    public splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public http: HttpClient,
  ) {

    // Check if the user has already seen the tutorial
    // this.storage.get('hasSeenTutorial')
    //   .then((hasSeenTutorial) => {
    //     if (hasSeenTutorial) {
    //       this.rootPage = TabsPage
    //     } else {
    //       this.rootPage = TutorialPage
    //     }
    //     this.platformReady()
    //   })

    // load the conference data
    // confData.load()
    // let that = this
    this.splashScreen.show()
    // this.storage.get('appFirstIn')
    // .then((data) => {
    //   console.log("appFirstIn data:" + data);
    //   if (data == null) {
    //     that.rootPage = GuidePage
    //     that.platformReady()
    //   }else {
    //     that.storage.get('token')
    //     .then((data) => {
    //       console.log("token data:" + data);
    //       if (data) {
    //         that.rootPage = TabsPage
    //       }else {
    //         that.rootPage = LoginPage
    //       }
    //       that.platformReady()
    //     });
    //   }
    // });
    // that.rootPage = testPage
    // that.platformReady()

    this.storage.get('token')
    .then((data) => {
      console.log("token data:" + data);
      // if(data){
      //   this.http.get(ServiceConfig.SLIDE, function (data1) {
      //     if(data1.detail == 'Signature has expired.'){
      //       this.rootPage = LoginPage;
      //     }else{
      //       this.rootPage = TabsPage
      //     }
      //   });
      // }else{
      //   this.rootPage = LoginPage;
      // }
      if (data) {
        this.rootPage = TabsPage
      }else {
        this.rootPage = LoginPage
      }
      this.platformReady()
    });
    

    // decide which menu items should be hidden by current login status stored in local storage
    // this.userData.hasLoggedIn().then(hasLoggedIn => {
    //   this.enableMenu(hasLoggedIn === true)
    // })
    // this.enableMenu(false)

    this.listenToLoginEvents()
  }

  openPage(page: PageInterface) {

    if ([LoginPage, SignupPage].includes(page.component)) {
      this.nav.push(page.component)
    } else {

      let params = {}

      // the nav component was found using @ViewChild(Nav) setRoot on the nav to remove previous pages and only have this page we wouldn't want the back button to show in this scenario
      if (page.index) {
        params = {tabIndex: page.index}
      }

      // If we are already on tabs just change the selected tab don't setRoot again, this maintains the history stack of the tabs even if changing them from the menu
      if (this.nav.getActiveChildNavs().length && page.index != undefined) {
        this.nav.getActiveChildNavs()[0].select(page.index)
      } else {
        // Set the root of the nav with params if it's a tab index
        this.nav.setRoot(page.name, params).catch((err: any) => {
          console.log(`Didn't set nav root: ${err}`)
        })
      }

      if (page.logsOut === true) {
        // Give the menu time to close before changing to logged out
        this.userData.logout()
      }

    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage)
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      // this.enableMenu(true)
    })

    this.events.subscribe('user:signup', () => {
      // this.enableMenu(true)
    })

    this.events.subscribe('user:logout', () => {
      // this.enableMenu(false)
    })
  }

  // enableMenu(loggedIn: boolean) {
  //   this.menu.enable(loggedIn, 'loggedInMenu')
  //   this.menu.enable(!loggedIn, 'loggedOutMenu')
  // }

  platformReady() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide()
    })
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0]

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary'
      }
      return
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary'
    }
    return
  }
}
