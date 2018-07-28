import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'flippage-fresh',
  templateUrl: 'flippage-fresh.html'
})
export class FlippageFreshComponent {

  @Output() fresh = new EventEmitter<string>();

  constructor() {
  }

  emitFresh() {
    this.fresh.emit('refresh')
  }

}
