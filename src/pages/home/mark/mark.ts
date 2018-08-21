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
    },
    {
      name:"音乐节",
      code:"m"
    },
    {
      name:"演唱会",
      code:"n"
    }
  ];
  type1 = [
    {
      name:"JAZZ",
      code:"0",
      },
      {
        name:"Locking",
        code:"1",
      },
      {
        name:"Popping",
        code:"2",
      },
      {
        name:"Breaking",
        code:"3",
      },
      {
        name:"Hip-Hop",
        code:"4",
      },
      {
        name:"House",
        code:"5",
      },
      {
        name:"Reggae",
        code:"6",
      },
      {
        name:"Clown&Krump",
        code:"7",
      },
      {
        name:"Waacking&Punking&Voguing",
        code:"8",
      },
      {
        name:"Turfing",
        code:"9",
      },
      {
      name:"华尔兹",
      code:"10",
      },
      {
        name:"探戈",
        code:"11",
      },
      {
        name:"快步",
        code:"12",
      },
      {
        name:"狐步",
        code:"13",
      },
      {
        name:"维也纳华尔兹",
        code:"14",
      },
      {
      name:"伦巴",
      code:"15",
      },
      {
        name:"恰恰",
        code:"16",
      },
      {
        name:"牛仔",
        code:"17",
      },
      {
        name:"桑巴",
        code:"18",
      },
      {
        name:"斗牛",
        code:"19",
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
    this.storage.get('tabsList1').then(data => {
      if (data != '' && data != null && data != undefined) {
        let tabList1 = JSON.parse(data);
        this.type1.length = 0;
        for(let i=0;i<tabList1.length;i++){
          this.type1.push(tabList1[i]);
        }
      }
    });
  }

  finishEdit(){
    let that = this;
    let id = this.navParams.get('id');
    this.storage.set('tabsList', JSON.stringify(this.myType));
    this.storage.set('tabsList1', JSON.stringify(this.type1));
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
