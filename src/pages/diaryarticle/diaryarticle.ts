import {Component,OnInit,OnDestroy} from '@angular/core'
import {NavController, NavParams,ViewController} from 'ionic-angular'
import {HttpClient} from '../../providers/httpClient';


@Component({
  selector: 'page-diaryarticle',
  templateUrl: 'diaryarticle.html',
})
export class DiaryArticlePage implements OnInit, OnDestroy {
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpClient:HttpClient,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  
  }

  ngOnInit(){
   
  }

  ngOnDestroy(){ 
    console.log("destroy")
  }

  goDiaryPublish() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
}
