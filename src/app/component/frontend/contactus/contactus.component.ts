import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  
  public formTitle: any = "Contact Us";      // Enter the Forl Title
  public pageUrl: any = 'home';
  public serverUrl: any = this.apiService.serverUrl;
  public addEndpoint: any = {
    endpoint:'addorupdatedata',
    source:'contactusForm'
  };
  public getDataUrl: any = 'datalist';
  public routeingUrl: any = 'dashboard';

  constructor(private readonly meta: MetaService, public apiService: ApiService) {

    //console.log('--koushikcontact-----', this.apiService.serverUrl);    

    this.meta.setTitle('Arnie Fonseca - Contact Me');
    this.meta.setTag('og:description', 'Get in touch with Arnie Fonseca today to learn how his programs can help you or your employees in improving their performances in the workplace, as well as create better lives for themselves.');
    this.meta.setTag('twitter:description', 'Get in touch with Arnie Fonseca today to learn how his programs can help you or your employees in improving their performances in the workplace, as well as create better lives for themselves.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca Contact, Contact Arnie Fonseca, Arnie Fonseca Contact Us');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca Contact, Contact Arnie Fonseca, Arnie Fonseca Contact Us');

    this.meta.setTag('og:title', 'Arnie Fonseca - Contact Me');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Contact Me');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');

  }

  ngOnInit() {
  }

}
