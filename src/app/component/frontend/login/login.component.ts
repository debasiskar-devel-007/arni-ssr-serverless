import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
/***************** This is use for image upload ********************/ 
  // public configData: any = {
  //   baseUrl: "http://3.15.236.141:5005/",
  //   endpoint: "uploads",
  //   size: "51200", // kb
  //   format: ["jpg", "jpeg", "png", "bmp", "zip", 'html'], // use all small font
  //   type: "profile-picture",
  //   path: "files",
  //   prefix: "profile_picture_"
  // }

  
  public logo: any = 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png';      // logo url 
  public fromTitle: any = "Login";    // This is a From Title 
  // public fullUrl: any = "https://63zzhpnoti.execute-api.us-east-1.amazonaws.com/production/api/";  // server url
  public fullUrl: any = this.apiService.serverUrl;
  public endpoint: any = "login";  // login endpoint
  public buttonName:any= 'Login';
  public signUpRouteingUrl: any = { 
    "path":"sign-up",
    // "buttonName":"sign up",
    "customLink":"",
    "customURl":""
  };

  public forgetRouteingUrl: any = {
    "path":"forget-password",
    "buttonName":"Forgot Password ?",
    "customLink":"",
    "customURl":""
  };
  public routerStatus: any;
  public userData: any = {};  
  public defaultLoginUrl = '/login';

    constructor(private readonly meta: MetaService, public apiService: ApiService, public router: Router, public cookieService: CookieService) { 

    this.meta.setTitle('Arniefonseca - Login');
    this.meta.setTag('og:description', '');
    this.meta.setTag('twitter:description', '');

    this.meta.setTag('og:keyword', '');
    this.meta.setTag('twitter:keyword', '');

    this.meta.setTag('og:title', 'Arniefonseca - Login');
    this.meta.setTag('twitter:title', 'Arniefonseca - Login');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');

      this.routerStatus = {   
        "data": [
          {
           "type":"admin",
           "routerNav":"admin-dashboard"
          },
          {
            "type":"affiliate",
           "routerNav":"affiliate-dashboard"
          }
        ]
      }
  
    }
  
    ngOnInit() {
      //console.log(this.apiService.serverUrl)
    }
  

    goto() {
      //console.log('sadfdff');
      // if (this.router.url == '/login') {
      //   this.router.navigateByUrl('/admin-dashboard');
  
      // } else if (this.router.url == '/login') {
  
      //   this.router.navigateByUrl('/affiliate-dashboard');
  
      // } 
    }

  }
  