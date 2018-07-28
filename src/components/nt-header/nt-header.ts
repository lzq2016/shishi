import { Component, Input } from '@angular/core';
import {HttpClient} from '../../providers/httpClient';


@Component({
  selector: 'nt-header',
  templateUrl: 'nt-header.html'
})
export class NtHeaderComponent {

  @Input() show="true";
  @Input() title:string;
  text: string;

  constructor(public http:HttpClient) {

  }

  collection(){

  }
  love(){

  }
}
