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
      source:"service_view"
    }
    this.apiservice.addDataWithoutToken(data,"datalistwithouttoken").subscribe((result: any)=>{
      console.log('service',result.res);
      this.serviceListConfig= result.res;
      console.log('service list', this.serviceListConfig);
    });
   }


//***********blog list view in blog detail************//
servicedetail(val:any){
  this.router.navigateByUrl('/servicedetail')
  //console.log(val)
  // let title=val.blogtitle.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
  // this.router.navigateByUrl('/service/'+title+'/'+val._id)
}

  ngOnInit() {
  }

  btnClick= function () {
    this.router.navigateByUrl('/servicelist');
  };

}
