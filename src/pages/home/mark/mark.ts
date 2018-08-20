import {Component,OnInit} from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import {Storage} from '@ionic/storage';
import { HttpClient } from '../../../providers/httpClient';
import { NavParams,NavController,ViewController } from 'ionic-angular';

@Component({
  selector: 'mark',
  templateUrl: 'mark.html'
})
export class MarkPage implements OnInit {

  myType = [
    {
      name:"音乐剧",
      code:"a"
    },
    {
      name:"歌剧",
      code:"b"
    },
    {
      name:"舞剧",
      code:"c"
    },
    {
      name:"话剧",
      code:"d"
    },
    {
      name:"戏曲",
      code:"e"
    },
    {
      name:"街舞",
      code:"f"
    },
    {
      name:"拉丁舞",
      code:"g"
    },
    {
      name:"摩登舞",
      code:"h"
    },
    {
      name:"芭蕾舞",
      code:"i"
    },
    {
      name:"民族古典舞",
      code:"j"
    },
    {
      name:"小型现场",
      code:"k"
    },
    {
      name:"音乐会",
      code:"l"
    }
  ];
  type1 = [
    {
      name:"音乐节",
      code:"m"
    },
    {
      name:"演唱会",
      code:"n"
    }
  ];
  normalOptions: SortablejsOptions = {
    group: 'normal-group',
    onUpdate: () => {
      console.log(123);
    }
};
  
  constructor(
    public storage: Storage,
    private httpClient: HttpClient,
    public navParams: NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController) {
  
  }
  ngOnInit() {
    this.storage.get('tabsList').then(data => {
      if (data != '' && data != null && data != undefined) {
        let tabList = JSON.parse(data);
        this.myType.length = 0;
        for(let i=0;i<tabList.length;i++){
          this.myType.push(tabList[i]);
        }
      }
    });
  }

  finishEdit(){
    let that = this;
    let id = this.navParams.get('id');
    this.storage.set('tabsList', JSON.stringify(this.myType));
    let paramObj = {
      "tab_json": [],
    };
    for (var i=0;i<this.myType.length;i++) {
      paramObj["tab_json"].push(this.myType[i].code);
    }
        debugger;
    this.httpClient.post("api/v1/entry/" + id + "/update_user_tab", paramObj, function (data) {
      console.log(data);
      // that.navCtrl.pop();
      that.viewCtrl.dismiss(data);
    });
  }
}
