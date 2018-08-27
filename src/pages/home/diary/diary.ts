import {Component, Input} from '@angular/core';
import {NavController,ModalController} from 'ionic-angular';
import { RecordInfoPage } from '../../record-info/record-info';

@Component({
  selector: 'diary',
  templateUrl: 'diary.html'
})
export class DiaryComponent {

  @Input() diaryInfo: any = [];
  @Input() from = '';
  
  constructor(
  	public navCtrl: NavController,
  	public modalCtrl: ModalController) {
  }

  goDiaryDetail() {
    // this.navCtrl.push(RecordInfoPage, { id: this.diaryInfo.object_id });
    let profileModal = this.modalCtrl.create(RecordInfoPage, { id: this.diaryInfo.object_id });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }
  

}
