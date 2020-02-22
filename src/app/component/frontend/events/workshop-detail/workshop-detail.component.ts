import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from '../../../../api.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';

@Component({
  selector: 'app-workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.css']
})
export class WorkshopDetailComponent implements OnInit {


  public indexvallength: any=1;

  public indexval:any=6;
  public workshop_img:any
  public workshop:any;
  // public SeminarsdetailArry: any = []
  public dataformate: any;
  public eventImage:any;
  public profile:any;
  public title: any;
  public eventTitle: any;
  public workshopList:any;
  public item:any;
  public upComingEvent:any=[];
  public pastEvent:any=[];
  // public indexvalleftlengthlength: any = 1;


  // public indexvalleft: any = 2;
  public indexvalright:any=4;



  constructor(private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService, private readonly meta: MetaService,private sanitizer: DomSanitizer,public fb:FacebookService ,public datePipe: DatePipe) {
    this.meta.setTitle('Arnie Fonseca - Workshops');
    this.meta.setTag('og:description', 'Check out the dates and locations of upcoming Workshops By Arnie Fonseca, and let Coach Arnie help you with your Personal Development at one of these Arnie Fonseca Workshops.');
    this.meta.setTag('twitter:description', 'Check out the dates and locations of upcoming Workshops By Arnie Fonseca, and let Coach Arnie help you with your Personal Development at one of these Arnie Fonseca Workshops.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca Workshops, Workshops By Arnie Fonseca, Workshops By Coach Arnie');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca Workshops, Workshops By Arnie Fonseca, Workshops By Coach Arnie');

    this.meta.setTag('og:title', 'Arnie Fonseca - Workshops');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Workshops');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.dataformate = moment();

    fb.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });

  }

  ngOnInit() {

    this.activatedRoute.data.forEach((data: any) => {
      this.workshop = data.workshopsDetailData.results.event[0];

      this.workshopList = data.workshopsDetailData.results.event_list

  

    })


    if (this.workshop != '') {
      this.meta.setTitle('Arnie Fonseca- workshop-detail');
      this.meta.setTag('og:description', this.workshop.description);
      this.meta.setTag('twitter:description', this.workshop.description);
      this.meta.setTag("description", this.workshop.description)

      this.meta.setTag('og:title', this.workshop.title);
      this.meta.setTag('twitter:title', this.workshop.title);
      this.meta.setTag('og:image', this.workshop.image);
      this.meta.setTag('og:image:width', 'auto');
      this.meta.setTag('og:image:height', 'auto');
      this.meta.setTag('twitter:image', this.workshop.image);
      this.meta.setTag('og:url', 'https://arniefonseca.influxiq.com/workshop-detail/' + this.activatedRoute.snapshot.params.title + '/' + this.activatedRoute.snapshot.params._id);


    }

    this.getForPastEvent();


  }


  getForPastEvent(){
    let currentdate: Date;
      currentdate = new Date();
      let curdate = (this.datePipe.transform(currentdate, 'MM-dd-yyyy'));
      let eventDate = moment(curdate).format('x');
      // console.log('s d',eventDate);
  
  
      for(let i in  this.workshopList){
        // console.log('d', this.workshopList[i].date_unix)
        if(this.workshopList[i].date_unix > eventDate){
          // console.log('up',this.workshopList[i])
          this.upComingEvent.push(this.workshopList[i]);
        } else {
          // console.log('past',this.workshopList[i])
          this.pastEvent.push(this.workshopList[i]);
        }
      }
  
  }




  //***********load more view blog *************//
  blogloadmore(){
    // console.log('load more')
    this.indexval=this.indexval+1;

  }

  detail(val:any){
    // console.log(val)
    this.title=val.title;
    this.eventTitle=this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log( this.eventTitle)
    this.router.navigateByUrl("/workshop-detail/"+ this.eventTitle +'/' + val._id);
  }

  copyText(val:any){
    // console.log('copyText');
  }

viewallbutton(){
    this.router.navigateByUrl("/past-workshops");
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
