import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { ApiService } from '../../../api.service';
import { MetaService } from '@ngx-meta/core';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';

@Component({
  selector: 'app-servicedetail',
  templateUrl: './servicedetail.component.html',
  styleUrls: ['./servicedetail.component.css']
})
export class ServicedetailComponent implements OnInit {

  public serviceListConfig: any;
  public serviceTitle:any;
  public profile:any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,  public apiservice: ApiService,public meta:MetaService,public fb:FacebookService) {
    
    fb.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });

  }

  ngOnInit() {
    this.activatedRoute.data.forEach(res=>{
      // console.log(res.serviceData.result)
      this.serviceListConfig=res.serviceData.result[0];

      this.serviceTitle = this.serviceListConfig.service_title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');

      // console.log('>><<',this.serviceTitle)


      this.meta.setTitle(this.serviceListConfig.service_title);
      this.meta.setTag('og:description', this.serviceListConfig.description);
      this.meta.setTag('twitter:description', this.serviceListConfig.description);
  
      this.meta.setTag('og:keyword', this.serviceListConfig.service_title);
      this.meta.setTag('twitter:keyword', this.serviceListConfig.service_title);
  
      this.meta.setTag('og:title',this.serviceListConfig.service_title);
      this.meta.setTag('twitter:title', this.serviceListConfig.service_title);
      this.meta.setTag('og:type', 'website');
      this.meta.setTag('og:url', 'https://arniefonseca.influxiq.com/service-detail/' + this.activatedRoute.snapshot.params.service_title + '/' + this.serviceListConfig._id);
      this.meta.setTag('twitter:url', 'https://arniefonseca.influxiq.com/service-detail/' + this.activatedRoute.snapshot.params.service_title + '/' + this.serviceListConfig._id);
      this.meta.setTag('og:image', this.serviceListConfig.service_img);
      this.meta.setTag('twitter:image',this.serviceListConfig.service_img);
    })
  }

  backbutton(){
    this.router.navigateByUrl('/ourservices')
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
    window.open('http://www.twitter.com/share?url=https://arniefonseca.influxiq.com/service-detail/'+this.serviceTitle+'/'+ val._id);
    
  }


  linkedinShare(val:any){
    // console.log(val)
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=https://arniefonseca.influxiq.com/service-detail/'+this.serviceTitle+'/'+ val._id);
    
  }

  tumblrShare(val:any){
    // console.log(val)
    window.open('http://www.tumblr.com/share?url=https://arniefonseca.influxiq.com/service-detail/'+this.serviceTitle+'/'+ val._id);
  }

}
