import {Component,OnInit,OnDestroy} from '@angular/core'
import {NavController, NavParams,ModalController} from 'ionic-angular'
import {HttpClient} from '../../providers/httpClient';
import {ProfilePage} from '../profile/profile'

@Component({
  selector: 'page-activeuser',
  templateUrl: 'activeuser.html',
})
export class ActiveUserPage implements OnInit, OnDestroy {
  items:any = []
  nextPage:string = ""
  topicId = 0;
  activeUser:any = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpClient:HttpClient,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkPage')
  }

  ngOnInit(){
   let that = this;
   this.topicId = this.navParams.get('id')   
   this.httpClient.get("api/v1/topic/" + that.topicId + "/hot_users/",function(data){
      console.log(data);
      that.activeUser = data;
      if(data.next){
        that.nextPage = data.next;
      }else{
        that.nextPage = "";
      }
    });
  }
  
  goMe(id){
    let profileModal = this.modalCtrl.create(ProfilePage, { userId:id,fromOtherUser:true },{showBackdrop:true,enableBackdropDismiss:true});
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }

  

  ngOnDestroy(){ 
    console.log("destroy")
  }
}
