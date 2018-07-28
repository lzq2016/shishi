import {Component} from '@angular/core'
import {NavController, Events, ToastController} from 'ionic-angular'
import {UserData} from '../../providers/user-data'
import {UserOptions} from '../../interfaces/user-options'
import {SignupPage} from '../signup/signup'
import {Storage} from '@ionic/storage';
import {HttpClient} from '../../providers/httpClient';
import {ServiceConfig} from '../../providers/service.config';
import {TabsPage} from "../tabs-page/tabs-page";
import {VerificationPage} from "../verification/verification";

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = {username: '', password: ''}
  submitted = false

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public http: HttpClient,
              public events: Events,
              public toast: ToastController,
              public userData: UserData) {
  }

  onLogin() {
    let self = this;
    this.http.post(ServiceConfig.TOKENAUTH, {
      username: self.login.username,
      password: self.login.password,
    }, function (data) {
      if (data.token != '' && data.token != null) {
        let toast = self.toast.create({
          message: '登录成功',
          position: 'top',
          duration: 2000
        });
        toast.present();
        self.storage.set(self.userData.HAS_LOGGED_IN, true);
        self.storage.set('token', data.token);
        self.userData.setUsername(data.username);
        self.events.publish('user:login');
        self.navCtrl.setRoot(TabsPage)
      } else {
        let toast = self.toast.create({
          message: '登录失败',
          position: 'top',
          duration: 2000
        });
        toast.present();
      }
    });
  }
  goResetPassword() {
    this.navCtrl.push(VerificationPage, {
      phone: '',
      type: 'resetPassword',
    })
  }
  navigate(name) {
    if (name === 'x') {
      this.storage.get('token').then(data => {
        if (data != '' && data != null && data != undefined) {
          this.navCtrl.popToRoot()
        }
      });
    } else if (name === 'signup') {
      this.navCtrl.push(SignupPage)
    }
  }
}
