import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-servicedetail',
  templateUrl: './servicedetail.component.html',
  styleUrls: ['./servicedetail.component.css']
})
export class ServicedetailComponent implements OnInit {

  public serviceListConfig: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,  public apiservice: ApiService) { 
    let data: any = {
      source:"service_view"
    }
    this.apiservice.addDataWithoutToken(data,"datalistwithouttoken").subscribe((result: any)=>{
      //console.log('service',result.res);
      this.serviceListConfig= result.res;
      // console.log('service list', this.serviceListConfig);
    });
  }

  ngOnInit() {
  }

}
