import {Component, Input} from '@angular/core'

/**
 * Generated class for the TimelineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timeline',
  templateUrl: 'timeline.html'
})
export class TimelineComponent {

  text: string
  @Input('endIcon') endIcon = 'ionic'

  constructor() {
    console.log('Hello TimelineComponent Component')
    this.text = 'Hello World'
  }

}

@Component({
  selector: 'timeline-item',
  template: '<ng-content></ng-content>'
})
export class TimelineItemComponent {
  constructor() {

  }
}


@Component({
  selector: 'timeline-time',
  template: '<span>{{time.substring(1)}}月</span>'
})
export class TimelineTimeComponent {
  @Input('time') time: string = '';
  constructor() {

  }
}
