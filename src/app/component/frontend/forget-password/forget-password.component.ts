import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  public logo: any = 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png';
  public loginRouteingUrl: any = { 
    "path":"",
    "buttonName":"Login",
    "customLink":"",
    "customURl":"https://dev.arniefonseca.influxiq.com/login"
  };
  public signUpRouteingUrl: any = { 
    "path":"",
    // "buttonName":"Sign Up",
    "customLink":"/sign-up",
    "customURl":""
  };
  public buttonName: any = 'Forget Password';
  // public signUpRouteingUrl: any = 'sign-up';
  public formTitle: any = 'Forget Password';
  // public serverUrl:any = 'http://166.62.39.137:5050/';
  public serverUrl:any = this.apiService.serverUrl;
  public addEndpoint: any = {
    endpoint:'forgetpassword'
  };
  // public domanUrl: any = 'http://localhost:4200/reset-password';
  public domainUrl: any = 'https://dev.arniefonseca.influxiq.com/reset-password';
  constructor(private readonly meta: MetaService, public apiService: ApiService) {
    
    // this.meta.setTitle('Forget Password dynamic');
    // this.meta.setTag('og:description', 'This is dynamic decription ');
    // this.meta.setTag('og:title', 'This is dynamic title with meta og ');
    // this.meta.setTag('og:type', 'website');
    // this.meta.setTag('og:image', 'https://upload.wikimedia.org/wikipedia/commons/f/f8/superraton.jpg');

    this.meta.setTitle('Arniefonseca - Forget Password');
    this.meta.setTag('og:description', '');
    this.meta.setTag('twitter:description', '');

    this.meta.setTag('og:keyword', '');
    this.meta.setTag('twitter:keyword', '');

    this.meta.setTag('og:title', 'Arniefonseca - Forget Password');
    this.meta.setTag('twitter:title', 'Arniefonseca - Forget Password');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');

 }

  ngOnInit() {
  }
  

}
