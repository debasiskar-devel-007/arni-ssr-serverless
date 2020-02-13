import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from "@angular/router";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

import { HttpService } from "./http.service";

export interface EndpointComponent {
  endpoint: string;
}

@Injectable({
  providedIn: "root"
})
export class ResolveService implements Resolve<any> {
  public userid: any;

  constructor(
    private _apiService: HttpService,
    public cookieservice: CookieService,
    public activedrouter: ActivatedRoute
  ) {
    if (this.cookieservice.get("userid") != null)
      this.userid = this.cookieservice.get("userid");
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    let _id = route.params["id"];

    if (route.data.requestcondition.condition._id == "id") {
      route.data.requestcondition.condition._id = _id;
      delete route.data.requestcondition.condition.id;
      // console.log(route.data.requestcondition.condition);
    }
    var endpoint = route.data.link;
    var source = route.data.source;
    var condition = route.data.condition;
    var requestData: any = route.data.requestcondition;
    if (route.data.requestcondition.trainingcategory != null) {
      requestData.trainingcategory = route.params.cid;
      requestData.userid = this.userid;
    } else {
      requestData.condition = Object.assign(
        requestData.condition,
        route.params
      );
      delete route.data.requestcondition.condition.id;
      // console.log("route.data");
      // console.log(route.data);
      // console.log(requestData.condition);
      if (route.url[0].path == "blogdetail") {
        route.data.requestcondition.condition._id_object = route.params["id"];
      }
      return new Promise(resolve => {
        this._apiService
          .CustomRequest(route.data.requestcondition, route.data.endpoint)
          .subscribe(api_object => {
            if (api_object) {
              //console.log(api_object);
              return resolve(api_object);
            } else {
              // id not found
              return true;
            }
          });
      });
    }

    // /* will come into play while editing otherwise no effect */
    // let requestData: any = route.data.requestcondition;
    // requestData.condition = Object.assign(requestData.condition, route.params);

    // return new Promise((resolve) => {
    //   this._apiService.CustomRequest(route.data.requestcondition, route.data.endpoint).subscribe(api_object => {
    //     if (api_object) {
    //       return resolve(api_object);
    //     } else { // id not found
    //       return true;
    //     }
    //   });
    // });
  }
}
