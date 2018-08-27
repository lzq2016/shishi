import {Component,OnInit,OnDestroy} from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
import { ServiceConfig } from '../../../providers/service.config';
import {NavParams,NavController,ModalController} from 'ionic-angular';
import { ProfilePage } from '../../profile/profile';
import { ArticleInfoPage } from '../../article-info/article-info'

@Component({
  selector: 'page-longArticle',
  templateUrl: 'longArticle.html',
})
export class LongArticlePage implements OnInit, OnDestroy {
  articleList = [];
    count = 0
  nextPage:string = ""
  title = ''

  constructor(
    public http: HttpClient,
    public navParams:NavParams,
    public navCtrl: NavController,
    public modalCtrl: ModalController
    ) {
  }

  ngOnInit(){
   console.log("init")
   this.title = this.navParams.data.topicTitle
   this.initArticleList();
  }   

  initArticleList(){
    let that = this;
    that.http.get(ServiceConfig.TOPICFEED + '?content_type=blog&topic_title=' + this.title, function (data) {
        console.log(data);
        that.count = data.count
        that.articleList = that.articleList.concat(data.results);
        that.nextPage = data.next;
    });
  }

  doInfinite(infiniteScroll) {
    let that = this;
    if(that.nextPage){
      that.initArticleList();
    }else{
      infiniteScroll.enable(false);
    }
  }

  goMe(id) {
    let profileModal = this.modalCtrl.create(ProfilePage, { userId: id, fromOtherUser: true });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }

  goArticleDetail(id,title){
    let profileModal = this.modalCtrl.create(ArticleInfoPage, { id:id,title:title });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }

  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
