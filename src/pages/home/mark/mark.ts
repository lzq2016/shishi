import {Component} from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'mark',
  templateUrl: 'mark.html'
})
export class MarkPage {

  myType = ['推荐1','推荐2','推荐3','推荐4','推荐5','推荐6','推荐7','推荐8','推荐9','推荐10'];
  type1 = ['推荐11','推荐12','推荐13','推荐14','推荐15','推荐16'];
  normalOptions: SortablejsOptions = {
    group: 'normal-group',
    onUpdate: () => {
      console.log(123);
    }
};
  
  constructor() {
  }

  

}
