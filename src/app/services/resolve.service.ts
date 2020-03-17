import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
// import { ApiService } from './api.service';
import {HttpService} from './http.service';
import { CookieService } from 'ngx-cookie-service';
export interface EndpointComponent {
    endpoint: string;
}
@Injectable({
    providedIn: 'root'
})
export class ResolveService implements Resolve<any> {
    public userid: any;
    public userCookies: any;
    constructor(private _apiService: HttpService, public cookieservice: CookieService , public activedrouter:ActivatedRoute, public router:Router) {
        if (this.cookieservice.get('user_details') != undefined && this.cookieservice.get('user_details') != null && this.cookieservice.get('user_details') != '') {
            this.userCookies = JSON.parse(this.cookieservice.get('user_details'));
            this.userid = this.userCookies._id;
            // console.log('>>>>',this.userid)
            }
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        let _id = route.params['id'];
        // if (route.data.requestcondition.condition._id == 'id') {
        //     route.data.requestcondition.condition._id = _id;
        //     delete route.data.requestcondition.condition.id;
        //     console.log(route.data.requestcondition.condition)
        // }
        var endpoint = route.data.link;
        var source = route.data.source;
        var condition = route.data.condition;
        var requestData: any = route.data.requestcondition;
        delete requestData.condition.blogtitle;
            requestData.condition = Object.assign(requestData.condition, route.params);
            if(this.cookieservice.get('user_details') !='' && this.cookieservice.get('user_details') !=null){
                this.userCookies = JSON.parse(this.cookieservice.get('user_details'));
                this.userid = this.userCookies._id;
                // console.log('>>>>',this.userCookies)
              }
            for(let d in requestData.condition){
                if(requestData.condition[d]=='user_id' ){
                  requestData.condition[d]=this.userid;
                //   console.log('route.data');
                }
                if (requestData.condition[d] == 'for-rep') {
                    requestData.id = this.userid;
                }
                if (requestData.condition[d] == 'customer-dashboard') {
                    // console.log(requestData.condition[d])

                    requestData.id = this.userid;
                    requestData.salesrep = this.userCookies.salesrep;
                    delete requestData.condition.castomer;
                }
                if (requestData.condition[d] == 'rsvp_id') {
                    requestData.rsvp_id = requestData.condition._id;
                   

                   delete requestData.condition.rsvp_id
                   delete requestData.condition._id
                   delete requestData.condition.status
               }

               if (requestData.condition[d] == 'ticket_added_by_object') {
                requestData.condition[d] = this.userid
               
                }


                if (requestData.condition[d] == '_id') {
                    requestData.condition[d] = requestData.condition._id;
                    // console.log( '>>>>>',requestData)

                    delete requestData.condition.blogtitle;
                    delete requestData.condition._id;
                    delete requestData.condition.service_title;
                   
              }
               
                    if (requestData.condition[d] == 'customer-dashboard') {
                        // console.log(requestData.condition[d])
    
                        requestData.id = this.userid;
                        requestData.salesrep = this.userCookies.salesrep;
                        delete requestData.condition.castomer;
                    }


               if (requestData.condition[d] == 'mysalesrep') {
                requestData.id = this.userCookies.salesrep
                requestData.customer_id=this.userCookies._id

            //    delete requestData.condition.rsvp_id
               delete requestData.condition._id
               delete requestData.condition.mysalesrep
           }
              }
          
            return new Promise((resolve) => {
                // console.log('route.data',route.data, this.userid);
                this._apiService.getDatalistForResolve(route.data).subscribe(api_object =>{
                    if (api_object) {
                        //console.log(api_object);
                        return resolve(api_object);
                    } else { // id not found
                        this.router.navigateByUrl('/home');
                        return true;
                    }
                })
            });
     
    }
}