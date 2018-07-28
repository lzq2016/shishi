import {Component} from '@angular/core'
import {NavController, Events, ToastController} from 'ionic-angular'
import {UserData} from '../../providers/user-data'
import {UserOptions} from '../../interfaces/user-options'
import {VerificationPage} from '../verification/verification'
import {LoginPage} from '../login/login'
import { Storage } from '@ionic/storage';
import { HttpClient } from '../../providers/httpClient';
import { ServiceConfig } from '../../providers/service.config';
import {TipsPage} from '../tips/tips';

@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  user: UserOptions = {username: '', password: '', phone: '', gender: ''}
  submitted = false

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public http: HttpClient,
              public events: Events,
              public userData: UserData,
              public toast: ToastController) {
  }

  onSignup() {
    let self = this;
    this.http.post(ServiceConfig.SIGNUP, {
      phone_number: self.user.phone,
      gender: self.user.gender,
      username: self.user.username,
      password: self.user.password,
    }, function(data){
      if(data.success == true || data.success == 'true'){
        self.navCtrl.push(VerificationPage,{
          phone: self.user.phone,
          type: 'signup',
        })
      }else {
        let toast = self.toast.create({
          message: '注册失败',
          position: 'top',
          duration: 2000
        });
        toast.present();
      }
    });
  }

  navigate(name) {
    if (name === 'x') {
      this.navCtrl.pop()
    } else if (name === 'login') {
      this.navCtrl.push(LoginPage)
    }
  }

  selectGender(gender) {
    this.user.gender = gender
  }
  goTips(){
    this.navCtrl.push(TipsPage);
  }
}
