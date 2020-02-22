import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public logo: any = 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png';
  public fromTitleName: any = 'Reset Password';
  // public serverUrl: any = 'https://9v41bpikik.execute-api.us-east-1.amazonaws.com/production/api/';
  public serverUrl: any = this.apiService.serverUrl;
  public addEndpoint: any = {
    endpoint:'addorupdatedata',
    source:'usermanagement'
  };
  
  constructor(private readonly meta: MetaService, public apiService: ApiService) {

    this.meta.setTitle('Arniefonseca - Reset Password');
    this.meta.setTag('og:description', '');
    this.meta.setTag('twitter:description', '');

    this.meta.setTag('og:keyword', '');
    this.meta.setTag('twitter:keyword', '');

    this.meta.setTag('og:title', 'Arniefonseca - Reset Password');
    this.meta.setTag('twitter:title', 'Arniefonseca - Reset Password');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');

 }

  ngOnInit() {
  }

}
  
