import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { ApiService } from '../../../api.service';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  public ServiceListArray:any=[];
  
  public serviceListConfig: any;
  public title:any;
  public serviceTitle:any;
  public profile:any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,  public apiservice: ApiService,public fb:FacebookService) {
    let data: any = {
      source:"service_view"
    }
    this.apiservice.addDataWithoutToken(data,"datalistwithouttoken").subscribe((result: any)=>{
      console.log('service',result.res);
      this.serviceListConfig= result.res;
      console.log('service list', this.serviceListConfig);
    });

    fb.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });


   }


//***********blog list view in blog detail************//
servicedetail(val:any){
  this.router.navigateByUrl('/servicedetail')
  //console.log(val)
  // let title=val.blogtitle.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
  // this.router.navigateByUrl('/service/'+title+'/'+val._id)
}

  ngOnInit() {
  }

  btnClick= function () {
    this.router.navigateByUrl('/servicelist');
  };


  // view service 
  viewService(val:any){
    this.title = val.service_title;
    this.serviceTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log(this.serviceTitle);
    this.router.navigateByUrl('/service-detail/'+this.serviceTitle+'/'+val._id);

  }

    //share function


    login() {
      this.fb.login()
        .then((res: LoginResponse) => {
  
          this.getProfile();
        })
        .catch();
    }
    getProfile() {
      this.fb.api('me/?fields=id,name,email,picture')
        .then((res: any) => {
  
          this.profile = res;
  
        })
        .catch((error: any) => {
  
        });
    }
  
    fbShare(val:any){
      // console.log(val)
          this.title = val.service_title;
          this.serviceTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
          
          var url = 'https://arniefonseca.influxiq.com/service-detail/' + this.serviceTitle + '/' + val._id;
          // console.log(url)
      
          let params: UIParams = {
            href: url,
            method: 'share',
            quote: 'https://arniefonseca.influxiq.com/'
          };
          this.fb.ui(params).then((res: UIResponse) => {
          }).catch(facebook => {
            // console.log(facebook)
          });
    }
  
    twitterShare(val:any){
      // console.log(val);
      this.title = val.service_title;
      this.serviceTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
      window.open('http://www.twitter.com/share?url=https://arniefonseca.influxiq.com/service-detail/'+this.serviceTitle+'/'+ val._id);
      
    }
  
  
    linkedinShare(val:any){
      // console.log(val)
      this.title = val.service_title;
      this.serviceTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
      window.open('https://www.linkedin.com/sharing/share-offsite/?url=https://arniefonseca.influxiq.com/service-detail/'+this.serviceTitle+'/'+ val._id);
      
    }
  
    tumblrShare(val:any){
      // console.log(val)
      this.title = val.service_title;
      this.serviceTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
      window.open('http://www.tumblr.com/share?url=https://arniefonseca.influxiq.com/service-detail/'+this.serviceTitle+'/'+ val._id);
    }


}
