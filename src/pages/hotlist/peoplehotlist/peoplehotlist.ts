import {Component,OnInit,OnDestroy} from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
import { ServiceConfig } from '../../../providers/service.config';
import {ModalController} from 'ionic-angular';
import { ProfilePage } from '../../profile/profile';

@Component({
  selector: 'page-peoplehotlist',
  templateUrl: 'peoplehotlist.html',
})
export class PeopleHotListPage implements OnInit, OnDestroy {
  peopleList = [];
  nextPage:string = ""

  constructor(
    public http: HttpClient,
    public modalCtrl: ModalController
    ) {
  }

  ngOnInit(){
   console.log("init")
   this.initPeopleList();
  }   

  initPeopleList(){
    let that = this;
    that.http.get(ServiceConfig.HOTPEOPLE, function (data) {
        console.log(data);
        that.peopleList = that.peopleList.concat(data.results);
        that.nextPage = data.next;
    });
  }

  getPeopleList(infiniteScroll){
    let that = this;
    that.http.get(that.nextPage, function (data) {
        console.log(data);
        that.nextPage = data.next;
        if(data.next){
          infiniteScroll.enable(true);
        }
        that.peopleList = that.peopleList.concat(data.results);
        infiniteScroll.complete();
    });
  }

  doInfinite(infiniteScroll) {
    infiniteScroll.enable(false);
    let that = this;
    if(that.nextPage){
      that.getPeopleList(infiniteScroll);
    }else{
      infiniteScroll.complete();
    }
  }
  
  goMe(id){
    let profileModal = this.modalCtrl.create(ProfilePage, { userId:id,fromOtherUser: true },{showBackdrop:true,enableBackdropDismiss:true});
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }

  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
