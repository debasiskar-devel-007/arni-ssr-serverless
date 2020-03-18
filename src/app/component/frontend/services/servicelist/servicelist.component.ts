import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { ApiService } from '../../../../api.service';
import { relative } from 'path';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.css']
})
export class ServicelistComponent implements OnInit {
  public serviceData: any =[];
  private indexvallength:any;
  public ServiceListArray:any=[];
  // showMore = false;
  showme=true;
  
  public indexval:any = 4;
  public title:any;
  public serviceTitle:any;
  public profile:any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private readonly meta: MetaService, public apiservice: ApiService,public fb:FacebookService) {

    this.meta.setTitle('Arnie Fonseca - Services Overview');
    this.meta.setTag('og:description', 'Arnie Fonseca’s varied Personal Development Programs cover different areas of your life, and will help you become the best version of yourself so that you can live a fulfilling life.');
    this.meta.setTag('twitter:description', 'Arnie Fonseca’s varied Personal Development Programs cover different areas of your life, and will help you become the best version of yourself so that you can live a fulfilling life.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca Personal Development Programs, Arnie Fonseca Services, Arnie Fonseca Coaching');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca Personal Development Programs, Arnie Fonseca Services, Arnie Fonseca Coaching');

    this.meta.setTag('og:title', 'Arnie Fonseca - Services Overview');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Services Overview');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');

    fb.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });

  }

  ngOnInit() {
/**getting data from resolve service**/
    this.activatedRoute.data.subscribe(resolveData => {
      // console.log(resolveData.serviceList.res)
      this.serviceData = resolveData.serviceList.res;
      // console.log("The Service datalist",this.serviceData)

    });

   
    // this.activatedRoute.data.forEach(data=>{
    //   let result:any;
    //   result=data.serviceListData.res;
    //   this.ServiceListArray=result;
    //   // console.log("ojjjjjjjjhgdfhgdf",this.ServiceListArray);       
    //  this.indexvallength = this.ServiceListArray.length;    
    // })
  }

  btnBackClick= function () {
    this.router.navigateByUrl('service');

  };

  showMoreFunc(){
    this.indexval = this.indexval + 3;   
    // console.log(this.indexval);
  }


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










