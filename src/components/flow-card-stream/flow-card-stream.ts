import {Inject, Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {apiBase, appName} from "../const-args/const-args";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FlowCardStreamService {

  constructor(private http: Http,
              @Inject(apiBase) private apiBase: string,
              @Inject(appName) private appName: string,) {
  }

  getFlowCards(): Observable<any> {
    return this.http.get(`${this.apiBase}/posts/1`).map(
      (res: Response) => {
        console.log(this.appName);
        console.log(res.json());
        return res.json();
      }
    )
  }

}
