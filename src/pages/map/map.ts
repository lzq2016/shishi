import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit } from "@angular/core";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage implements OnInit{

  name:string;

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor() {
  }

  ngOnInit(){
    this.name = 'stiles sugerman';
  }

}
