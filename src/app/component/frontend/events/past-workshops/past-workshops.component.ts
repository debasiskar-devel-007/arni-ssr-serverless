import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from '../../../../api.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-past-workshops',
  templateUrl: './past-workshops.component.html',
  styleUrls: ['./past-workshops.component.css']
})
export class PastWorkshopsComponent implements OnInit {

  public indexvallength: any;
  public searchLoadMore:boolean=false;


  public indexval:any=12;
  public eventTitle:any;
  public title:any;

  public indexvalleftlengthlength: any=1;


  public indexvalleft:any=2;



  public  WorkshopsListArry: any = []
  public dataformate: any;
  public eventImage:any;
  public profile:any;

  public upComingEvent:any=[];
  public pastEvent:any=[];
  public eventsem:any;
  public pasteventsem:any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService, private readonly meta: MetaService,private sanitizer: DomSanitizer,public fb:FacebookService,public datePipe: DatePipe) { 

    this.meta.setTitle('Arnie Fonseca - Workshops');
    this.meta.setTag('og:description', 'Check out the dates and locations of upcoming Workshops By Arnie Fonseca, and let Coach Arnie help you with your Personal Development at one of these Arnie Fonseca Workshops.');
    this.meta.setTag('twitter:description', 'Check out the dates and locations of upcoming Workshops By Arnie Fonseca, and let Coach Arnie help you with your Personal Development at one of these Arnie Fonseca Workshops.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca Workshops, Workshops By Arnie Fonseca, Workshops By Coach Arnie');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca Workshops, Workshops By Arnie Fonseca, Workshops By Coach Arnie');

    this.meta.setTag('og:title', 'Arnie Fonseca - Workshops');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Workshops');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://arniefonseca.influxiq.com/assets/images/logo.png');
    this.dataformate = moment();

    fb.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });

  }

  ngOnInit() {

    this.activatedRoute.data.forEach(data => {
      let result: any = {};
      result = data.workshopsListData.past_events;
      this.WorkshopsListArry = result;

      this.indexvallength = this.WorkshopsListArry.length;

      this.indexvalleftlengthlength = this.WorkshopsListArry.length;
    })

     //past and upcoming event

     let currentdate: Date;
     currentdate = new Date();
     let curdate = (this.datePipe.transform(currentdate, 'MM-dd-yyyy'));
     let eventDate = moment(curdate).format('x');
     // console.log('s d',eventDate);
 
 
     for(let i in  this.WorkshopsListArry){
       // console.log('d', this.WorkshopsListArry[i].date_unix)
       if(this.WorkshopsListArry[i].date_unix > eventDate){
         // console.log('up',this.WorkshopsListArry[i])
         this.upComingEvent.push(this.WorkshopsListArry[i]);
       } else {
         // console.log('past',this.WorkshopsListArry[i])
         this.pastEvent.push(this.WorkshopsListArry[i]);
       }
     }

  }

  
  blogloadmore(){
    // this.indexvalright=this.indexvalright + 6;
    let data:any;
    data={
      "type":"workshops",
      "limit":10,
      "skip":this.indexval
    }
    this.apiService.CustomRequest(data,'pasteventdatalist').subscribe(res=>{
      let result:any=res;
      console.log(result.past_events)
      if(result.past_events.length>0){
        this.WorkshopsListArry = this.WorkshopsListArry.concat(result.past_events);
        this.indexval = this.indexval + 6;
      }else{
           this.searchLoadMore=true;
      }
    })
  }
  
  detail(val:any){
    // console.log(val)
    this.title=val.title;
    this.eventTitle=this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log( this.eventTitle)
    this.router.navigateByUrl("/workshop-detail/"+ this.eventTitle +'/' + val._id);

  }


  
//facebook share for event

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

fbshare(val: any) {
  // console.log(val)
  this.title = val.title;
  this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
  // console.log(this.eventTitle)
  var url='https://arniefonseca.influxiq.com/workshop-detail/'+ this.eventTitle+'/'+val._id;
  // console.log(url)

  let params: UIParams = {
    href: url,
    method: 'share',
    quote: 'https://arniefonseca.influxiq.com/'
  };
  this.fb.ui(params).then((res:UIResponse)=>{
  }).catch(facebook=>{
    // console.log(facebook)
  });
}

logoutWithFacebook(): void {

  this.fb.logout().then();
}


twitterShare(val:any){

  this.title = val.title;
  this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
  // console.log(this.eventTitle)
  window.open('https://twitter.com/intent/tweet?url=arniefonseca.influxiq.com/workshop-detail/'+this.eventTitle+'/'+ val._id);
  // console.log(url)

}

linkedinShare(val:any){

  this.title = val.title;
  this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
  // console.log(this.eventTitle)

  window.open('https://www.linkedin.com/sharing/share-offsite/?url=arniefonseca.influxiq.com/workshop-detail/'+this.eventTitle+'/'+ val._id);
  // console.log(url)

}


 // tumblr share 

 tumblrShare(val:any){

  this.title = val.title;
  this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
  // console.log(this.eventTitle)

  window.open('http://www.tumblr.com/share?url=arniefonseca.influxiq.com/workshop-detail/'+this.eventTitle+'/'+ val._id);
  // console.log(url)

}


}
