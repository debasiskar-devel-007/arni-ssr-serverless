import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  public ServiceListArray:any=[];
  
  public serviceListConfig: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,  public apiservice: ApiService) {
    let data: any = {
      source:"service_view",
      endpoint: "datalistwithouttoken"
      // token: this.cookieService.get('jwtToken')

    }
    this.apiservice.getDatalist(data).subscribe((result: any)=>{
      //console.log(result.res);
      this.serviceListConfig= result.res;
      //console.log('service list', this.serviceListConfig.datasource);
    });
   }

  ngOnInit() {
    this.activatedRoute.data.forEach((data: any)=>{
      //console.log(data)
      // this.ServiceListArray=data;
      // console.log("ojjjjjjjjhgdfhgdf",this.ServiceListArray);   
    })
  }

  btnClick= function () {
    this.router.navigateByUrl('/servicelist');
  };

}
