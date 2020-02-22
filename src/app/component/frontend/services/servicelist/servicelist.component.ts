import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { ApiService } from '../../../../api.service';
import { relative } from 'path';

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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private readonly meta: MetaService, public apiservice: ApiService) {

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

  }

  ngOnInit() {
/**getting data from resolve service**/
    this.activatedRoute.data.subscribe(resolveData => {
      // console.log(resolveData.serviceList.res)
      this.serviceData = resolveData.serviceList.res;
      console.log("The Service datalist",this.serviceData)

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

}










