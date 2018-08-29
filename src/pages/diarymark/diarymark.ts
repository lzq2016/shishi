import { Component, OnInit, OnDestroy } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'


@Component({
  selector: 'page-diarymark',
  templateUrl: 'diarymark.html',
})
export class DiaryMarkPage implements OnInit, OnDestroy {
  type1 = [
    {
      name: "音乐剧",
      code: "a",
      selected: false
    },
    {
      name: "歌剧",
      code: "b",
      selected: false
    },
    {
      name: "舞剧",
      code: "c",
      selected: false
    },
    {
      name: "话剧",
      code: "d",
      selected: false
    },
    {
      name: "戏曲",
      code: "e",
      selected: false
    },
    {
      name: "街舞",
      code: "f",
      selected: false
    },
    {
      name: "拉丁舞",
      code: "g",
      selected: false
    },
    {
      name: "摩登舞",
      code: "h",
      selected: false
    },
    {
      name: "芭蕾舞",
      code: "i",
      selected: false
    },
    {
      name: "民族古典舞",
      code: "j",
      selected: false
    },
    {
      name: "小型现场",
      code: "k",
      selected: false
    },
    {
      name: "音乐会",
      code: "l",
      selected: false
    },
    {
      name: "音乐节",
      code: "m",
      selected: false
    },
    {
      name: "演唱会",
      code: "n",
      selected: false
    }
  ];
  type2 = {
    "f": [
      {
        name: "JAZZ",
        code: "0",
        selected: false
      },
      {
        name: "Locking",
        code: "1",
        selected: false
      },
      {
        name: "Popping",
        code: "2",
        selected: false
      },
      {
        name: "Breaking",
        code: "3",
        selected: false
      },
      {
        name: "Hip-Hop",
        code: "4",
        selected: false
      },
      {
        name: "House",
        code: "5",
        selected: false
      },
      {
        name: "Reggae",
        code: "6",
        selected: false
      },
      {
        name: "Clown&Krump",
        code: "7",
        selected: false
      },
      {
        name: "Waacking&Punking&Voguing",
        code: "8",
        selected: false
      },
      {
        name: "Turfing",
        code: "9",
        selected: false
      }
    ],
    "h": [
      {
        name: "华尔兹",
        code: "10",
        selected: false
      },
      {
        name: "探戈",
        code: "11",
        selected: false
      },
      {
        name: "快步",
        code: "12",
        selected: false
      },
      {
        name: "狐步",
        code: "13",
        selected: false
      },
      {
        name: "维也纳华尔兹",
        code: "14",
        selected: false
      }
    ],
    "g": [
      {
        name: "伦巴",
        code: "15",
        selected: false
      },
      {
        name: "恰恰",
        code: "16",
        selected: false
      },
      {
        name: "牛仔",
        code: "17",
        selected: false
      },
      {
        name: "桑巴",
        code: "18",
        selected: false
      },
      {
        name: "斗牛",
        code: "19",
        selected: false
      }
    ],
    "k": [
      {
        name: "中国风",
        code: "20",
        selected: false
      },
      {
        name: "流行",
        code: "21",
        selected: false
      },
      {
        name: "民谣",
        code: "22",
        selected: false
      },
      {
        name: "摇滚",
        code: "23",
        selected: false
      },
      {
        name: "嘻哈(说唱)",
        code: "24",
        selected: false
      },
      {
        name: "节奏布鲁斯",
        code: "25",
        selected: false
      },
      {
        name: "R&B",
        code: "26",
        selected: false
      },
      {
        name: "电子",
        code: "27",
        selected: false
      },
      {
        name: "金属",
        code: "28",
        selected: false
      },
      {
        name: "朋克",
        code: "29",
        selected: false
      },
      {
        name: "爵士",
        code: "30",
        selected: false
      },
      {
        name: "布鲁斯",
        code: "31",
        selected: false
      },
      {
        name: "古典",
        code: "32",
        selected: false
      },
      {
        name: "实验",
        code: "33",
        selected: false
      },
      {
        name: "舞台影视音乐",
        code: "34",
        selected: false
      },
      {
        name: "雷鬼",
        code: "35",
        selected: false
      },
      {
        name: "新世纪",
        code: "36",
        selected: false
      },
      {
        name: "ACG",
        code: "37",
        selected: false
      }
    ],
    "l": [
      {
        name: "中国风",
        code: "20",
        selected: false
      },
      {
        name: "流行",
        code: "21",
        selected: false
      },
      {
        name: "民谣",
        code: "22",
        selected: false
      },
      {
        name: "摇滚",
        code: "23",
        selected: false
      },
      {
        name: "嘻哈(说唱)",
        code: "24",
        selected: false
      },
      {
        name: "节奏布鲁斯",
        code: "25",
        selected: false
      },
      {
        name: "R&B",
        code: "26",
        selected: false
      },
      {
        name: "电子",
        code: "27",
        selected: false
      },
      {
        name: "金属",
        code: "28",
        selected: false
      },
      {
        name: "朋克",
        code: "29",
        selected: false
      },
      {
        name: "爵士",
        code: "30",
        selected: false
      },
      {
        name: "布鲁斯",
        code: "31",
        selected: false
      },
      {
        name: "古典",
        code: "32",
        selected: false
      },
      {
        name: "实验",
        code: "33",
        selected: false
      },
      {
        name: "舞台影视音乐",
        code: "34",
        selected: false
      },
      {
        name: "雷鬼",
        code: "35",
        selected: false
      },
      {
        name: "新世纪",
        code: "36",
        selected: false
      },
      {
        name: "ACG",
        code: "37",
        selected: false
      }
    ],
    "m": [
      {
        name: "中国风",
        code: "20",
        selected: false
      },
      {
        name: "流行",
        code: "21",
        selected: false
      },
      {
        name: "民谣",
        code: "22",
        selected: false
      },
      {
        name: "摇滚",
        code: "23",
        selected: false
      },
      {
        name: "嘻哈(说唱)",
        code: "24",
        selected: false
      },
      {
        name: "节奏布鲁斯",
        code: "25",
        selected: false
      },
      {
        name: "R&B",
        code: "26",
        selected: false
      },
      {
        name: "电子",
        code: "27",
        selected: false
      },
      {
        name: "金属",
        code: "28",
        selected: false
      },
      {
        name: "朋克",
        code: "29",
        selected: false
      },
      {
        name: "爵士",
        code: "30",
        selected: false
      },
      {
        name: "布鲁斯",
        code: "31",
        selected: false
      },
      {
        name: "古典",
        code: "32",
        selected: false
      },
      {
        name: "实验",
        code: "33",
        selected: false
      },
      {
        name: "舞台影视音乐",
        code: "34",
        selected: false
      },
      {
        name: "雷鬼",
        code: "35",
        selected: false
      },
      {
        name: "新世纪",
        code: "36",
        selected: false
      },
      {
        name: "ACG",
        code: "37",
        selected: false
      }
    ],
    "n": [
      {
        name: "中国风",
        code: "20",
        selected: false
      },
      {
        name: "流行",
        code: "21",
        selected: false
      },
      {
        name: "民谣",
        code: "22",
        selected: false
      },
      {
        name: "摇滚",
        code: "23",
        selected: false
      },
      {
        name: "嘻哈(说唱)",
        code: "24",
        selected: false
      },
      {
        name: "节奏布鲁斯",
        code: "25",
        selected: false
      },
      {
        name: "R&B",
        code: "26",
        selected: false
      },
      {
        name: "电子",
        code: "27",
        selected: false
      },
      {
        name: "金属",
        code: "28",
        selected: false
      },
      {
        name: "朋克",
        code: "29",
        selected: false
      },
      {
        name: "爵士",
        code: "30",
        selected: false
      },
      {
        name: "布鲁斯",
        code: "31",
        selected: false
      },
      {
        name: "古典",
        code: "32",
        selected: false
      },
      {
        name: "实验",
        code: "33",
        selected: false
      },
      {
        name: "舞台影视音乐",
        code: "34",
        selected: false
      },
      {
        name: "雷鬼",
        code: "35",
        selected: false
      },
      {
        name: "新世纪",
        code: "36",
        selected: false
      },
      {
        name: "ACG",
        code: "37",
        selected: false
      }
    ]
  };
  currentType2 = [];
  currentType2Index = '';
  selectedTags = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    console.log('UserId', navParams.get('userId'));
  }

  ionViewDidLoad() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    console.log("destroy")
  }

  goDiaryPublish() {
    let data = [];
    let datacode = [];
    for (let i = 0; i < this.type1.length; i++) {
      if (this.type1[i].selected) {
        data.push(this.type1[i]);
        datacode.push(this.type1[i].code);
      }
    }
    // Object.keys(this.type2).forEach(function (key) {
    //   for (let j = 0; j < this.type2[key].length; j++) {
    //     if (datacode.indexOf(this.type2[key][j].code) > -1) {

    //     } else {
    //       data.push(this.type2[key][j]);
    //     }
    //   }
    // });
    for (var key in this.type2) {
      for (let j = 0; j < this.type2[key].length; j++) {
        if (datacode.indexOf(this.type2[key][j].code) > -1) {

        } else {
          this.type2[key][j].selected ? data.push(this.type2[key][j]) : "";
        }
      }
    }
    this.viewCtrl.dismiss(data);
  }

  selectTag1(code) {
    this.currentType2Index = code;
    for (let j = 0; j < this.type1.length; j++) {
      if (this.type1[j].code == code) {
        this.type1[j].selected ? this.type1[j].selected = false : this.type1[j].selected = true;

      }
    }
    if (this.type2[code]) {
      this.currentType2.length = 0;
      for (let i = 0; i < this.type2[code].length; i++) {
        this.currentType2.push(this.type2[code][i]);
      }
    }
  }

  selectTag2(code) {
    for (let j = 0; j < this.currentType2.length; j++) {
      if (this.currentType2[j].code == code) {
        this.currentType2[j].selected ? this.currentType2[j].selected = false : this.currentType2[j].selected = true;
        this.type2[this.currentType2Index][j].selected == true;
      }
    }
  }
}
