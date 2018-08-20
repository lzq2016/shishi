import {Component,OnInit,OnDestroy} from '@angular/core'
import {NavController, NavParams,ViewController} from 'ionic-angular'
import { HttpClient } from '../../providers/httpClient';

@Component({
  selector: 'page-diaryarticle',
  templateUrl: 'diaryarticle.html',
})
export class DiaryArticlePage implements OnInit, OnDestroy {
  inputVal = '';
  topicList:any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private http: HttpClient) {
  }

  ionViewDidLoad() {
  
  }

  ngOnInit(){
   
  }

  ngOnDestroy(){ 
    console.log("destroy")
  }

  // goDiaryPublish() {
  //   let data = { 'foo': 'bar' };
  //   this.viewCtrl.dismiss(data);
  // }

  changeValue(e){
    console.log(e);
    let self =this;
    self.http.get("api/v1/topic/diary_count_by_topic/?topic_title=" + self.inputVal, function (data) {
      if (data) {
        self.topicList = data;
      }else{
        self.topicList.length = 0;
      }
    });
  }

  selectTopic(index){
    this.viewCtrl.dismiss(this.topicList[index]);
  }
}
