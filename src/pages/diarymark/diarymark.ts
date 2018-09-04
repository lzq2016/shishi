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
      selected: false,
      level:1
    },
    {
      name: "歌剧",
      code: "b",
      selected: false,
      level:1
    },
    {
      name: "舞剧",
      code: "c",
      selected: false,
      level:1
    },
    {
      name: "话剧",
      code: "d",
      selected: false,
      level:1
    },
    {
      name: "戏曲",
      code: "e",
      selected: false,
      level:1
    },
    {
      name: "街舞",
      code: "f",
      selected: false,
      level:1
    },
    {
      name: "拉丁舞",
      code: "g",
      selected: false,
      level:1
    },
    {
      name: "摩登舞",
      code: "h",
      selected: false,
      level:1
    },
    {
      name: "芭蕾舞",
      code: "i",
      selected: false,
      level:1
    },
    {
      name: "民族古典舞",
      code: "j",
      selected: false,
      level:1
    },
    {
      name: "小型现场",
      code: "k",
      selected: false,
      level:1
    },
    {
      name: "音乐会",
      code: "l",
      selected: false,
      level:1
    },
    {
      name: "音乐节",
      code: "m",
      selected: false,
      level:1
    },
    {
      name: "演唱会",
      code: "n",
      selected: false,
      level:1
    }
  ];
  type2 = {
    "f": [
      {
        name: "JAZZ",
        code: "0",
        selected: false,
        level:2
      },
      {
        name: "Locking",
        code: "1",
        selected: false,
        level:2
      },
      {
        name: "Popping",
        code: "2",
        selected: false,
        level:2
      },
      {
        name: "Breaking",
        code: "3",
        selected: false,
        level:2
      },
      {
        name: "Hip-Hop",
        code: "4",
        selected: false,
        level:2
      },
      {
        name: "House",
        code: "5",
        selected: false,
        level:2
      },
      {
        name: "Reggae",
        code: "6",
        selected: false,
        level:2
      },
      {
        name: "Clown&Krump",
        code: "7",
        selected: false,
        level:2
      },
      {
        name: "Waacking&Punking&Voguing",
        code: "8",
        selected: false,
        level:2
      },
      {
        name: "Turfing",
        code: "9",
        selected: false,
        level:2
      }
    ],
    "h": [
      {
        name: "华尔兹",
        code: "10",
        selected: false,
        level:2
      },
      {
        name: "探戈",
        code: "11",
        selected: false,
        level:2
      },
      {
        name: "快步",
        code: "12",
        selected: false,
        level:2
      },
      {
        name: "狐步",
        code: "13",
        selected: false,
        level:2
      },
      {
        name: "维也纳华尔兹",
        code: "14",
        selected: false,
        level:2
      }
    ],
    "g": [
      {
        name: "伦巴",
        code: "15",
        selected: false,
        level:2
      },
      {
        name: "恰恰",
        code: "16",
        selected: false,
        level:2
      },
      {
        name: "牛仔",
        code: "17",
        selected: false,
        level:2
      },
      {
        name: "桑巴",
        code: "18",
        selected: false,
        level:2
      },
      {
        name: "斗牛",
        code: "19",
        selected: false,
        level:2
      }
    ],
    "k": [
      {
        name: "中国风",
        code: "20",
        selected: false,
        level:2
      },
      {
        name: "流行",
        code: "21",
        selected: false,
        level:2
      },
      {
        name: "民谣",
        code: "22",
        selected: false,
        level:2
      },
      {
        name: "摇滚",
        code: "23",
        selected: false,
        level:2
      },
      {
        name: "嘻哈(说唱)",
        code: "24",
        selected: false,
        level:2
      },
      {
        name: "节奏布鲁斯",
        code: "25",
        selected: false,
        level:2
      },
      {
        name: "R&B",
        code: "26",
        selected: false,
        level:2
      },
      {
        name: "电子",
        code: "27",
        selected: false,
        level:2
      },
      {
        name: "金属",
        code: "28",
        selected: false,
        level:2
      },
      {
        name: "朋克",
        code: "29",
        selected: false,
        level:2
      },
      {
        name: "爵士",
        code: "30",
        selected: false,
        level:2
      },
      {
        name: "布鲁斯",
        code: "31",
        selected: false,
        level:2
      },
      {
        name: "古典",
        code: "32",
        selected: false,
        level:2
      },
      {
        name: "实验",
        code: "33",
        selected: false,
        level:2
      },
      {
        name: "舞台影视音乐",
        code: "34",
        selected: false,
        level:2
      },
      {
        name: "雷鬼",
        code: "35",
        selected: false,
        level:2
      },
      {
        name: "新世纪",
        code: "36",
        selected: false,
        level:2
      },
      {
        name: "ACG",
        code: "37",
        selected: false,
        level:2
      }
    ],
    "l": [
      {
        name: "中国风",
        code: "20",
        selected: false,
        level:2
      },
      {
        name: "流行",
        code: "21",
        selected: false,
        level:2
      },
      {
        name: "民谣",
        code: "22",
        selected: false,
        level:2
      },
      {
        name: "摇滚",
        code: "23",
        selected: false,
        level:2
      },
      {
        name: "嘻哈(说唱)",
        code: "24",
        selected: false,
        level:2
      },
      {
        name: "节奏布鲁斯",
        code: "25",
        selected: false,
        level:2
      },
      {
        name: "R&B",
        code: "26",
        selected: false,
        level:2
      },
      {
        name: "电子",
        code: "27",
        selected: false,
        level:2
      },
      {
        name: "金属",
        code: "28",
        selected: false,
        level:2
      },
      {
        name: "朋克",
        code: "29",
        selected: false,
        level:2
      },
      {
        name: "爵士",
        code: "30",
        selected: false,
        level:2
      },
      {
        name: "布鲁斯",
        code: "31",
        selected: false,
        level:2
      },
      {
        name: "古典",
        code: "32",
        selected: false,
        level:2
      },
      {
        name: "实验",
        code: "33",
        selected: false,
        level:2
      },
      {
        name: "舞台影视音乐",
        code: "34",
        selected: false,
        level:2
      },
      {
        name: "雷鬼",
        code: "35",
        selected: false,
        level:2
      },
      {
        name: "新世纪",
        code: "36",
        selected: false,
        level:2
      },
      {
        name: "ACG",
        code: "37",
        selected: false,
        level:2
      }
    ],
    "m": [
      {
        name: "中国风",
        code: "20",
        selected: false,
        level:2
      },
      {
        name: "流行",
        code: "21",
        selected: false,
        level:2
      },
      {
        name: "民谣",
        code: "22",
        selected: false,
        level:2
      },
      {
        name: "摇滚",
        code: "23",
        selected: false,
        level:2
      },
      {
        name: "嘻哈(说唱)",
        code: "24",
        selected: false,
        level:2
      },
      {
        name: "节奏布鲁斯",
        code: "25",
        selected: false,
        level:2
      },
      {
        name: "R&B",
        code: "26",
        selected: false,
        level:2
      },
      {
        name: "电子",
        code: "27",
        selected: false,
        level:2
      },
      {
        name: "金属",
        code: "28",
        selected: false,
        level:2
      },
      {
        name: "朋克",
        code: "29",
        selected: false,
        level:2
      },
      {
        name: "爵士",
        code: "30",
        selected: false,
        level:2
      },
      {
        name: "布鲁斯",
        code: "31",
        selected: false,
        level:2
      },
      {
        name: "古典",
        code: "32",
        selected: false,
        level:2
      },
      {
        name: "实验",
        code: "33",
        selected: false,
        level:2
      },
      {
        name: "舞台影视音乐",
        code: "34",
        selected: false,
        level:2
      },
      {
        name: "雷鬼",
        code: "35",
        selected: false,
        level:2
      },
      {
        name: "新世纪",
        code: "36",
        selected: false,
        level:2
      },
      {
        name: "ACG",
        code: "37",
        selected: false,
        level:2
      }
    ],
    "n": [
      {
        name: "中国风",
        code: "20",
        selected: false,
        level:2
      },
      {
        name: "流行",
        code: "21",
        selected: false,
        level:2
      },
      {
        name: "民谣",
        code: "22",
        selected: false,
        level:2
      },
      {
        name: "摇滚",
        code: "23",
        selected: false,
        level:2
      },
      {
        name: "嘻哈(说唱)",
        code: "24",
        selected: false,
        level:2
      },
      {
        name: "节奏布鲁斯",
        code: "25",
        selected: false,
        level:2
      },
      {
        name: "R&B",
        code: "26",
        selected: false,
        level:2
      },
      {
        name: "电子",
        code: "27",
        selected: false,
        level:2
      },
      {
        name: "金属",
        code: "28",
        selected: false,
        level:2
      },
      {
        name: "朋克",
        code: "29",
        selected: false,
        level:2
      },
      {
        name: "爵士",
        code: "30",
        selected: false,
        level:2
      },
      {
        name: "布鲁斯",
        code: "31",
        selected: false,
        level:2
      },
      {
        name: "古典",
        code: "32",
        selected: false,
        level:2
      },
      {
        name: "实验",
        code: "33",
        selected: false,
        level:2
      },
      {
        name: "舞台影视音乐",
        code: "34",
        selected: false,
        level:2
      },
      {
        name: "雷鬼",
        code: "35",
        selected: false,
        level:2
      },
      {
        name: "新世纪",
        code: "36",
        selected: false,
        level:2
      },
      {
        name: "ACG",
        code: "37",
        selected: false,
        level:2
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
