import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { ApiService } from '../../../api.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-servicedetail',
  templateUrl: './servicedetail.component.html',
  styleUrls: ['./servicedetail.component.css']
})
export class ServicedetailComponent implements OnInit {

  public serviceListConfig: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,  public apiservice: ApiService,public meta:MetaService) { 

  }

  ngOnInit() {
    this.activatedRoute.data.forEach(res=>{
      console.log(res.serviceData.result)
      this.serviceListConfig=res.serviceData.result[0];

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

}
