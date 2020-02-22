import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-seminars-detail',
  templateUrl: './seminars-detail.component.html',
  styleUrls: ['./seminars-detail.component.css']
})
export class SeminarsDetailComponent implements OnInit {

  public indexvallength: any = 1;


  public indexvalright:any=4;

  public indexval: any = 6;
  // public seminer_img:any
  public seminer: any;
  public SeminarsdetailArry: any;
  public dataformate: any;
  public eventImage: any;
  public profile:any;
  public title: any;
  public eventTitle: any;
  public seminerList:any='';
  public item:any;
  public upComingEvent:any=[];
  public pastEvent:any=[];

  constructor(public activatedRoute: ActivatedRoute,  private readonly meta: MetaService,public fb:FacebookService, public datePipe: DatePipe,public router:Router) {

    this.meta.setTitle('Arnie Fonseca - Seminars');
    this.meta.setTag('og:description', 'Check out the dates and locations of upcoming Seminars By Arnie Fonseca, and book your seats to Seminars By Coach Arnie near you. Attend Arnie Fonseca Seminars to help improve your life.');
    this.meta.setTag('twitter:description', 'Check out the dates and locations of upcoming Seminars By Arnie Fonseca, and book your seats to Seminars By Coach Arnie near you. Attend Arnie Fonseca Seminars to help improve your life.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca Seminars, Seminars By Arnie Fonseca, Seminars By Coach Arnie');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca Seminars, Seminars By Arnie Fonseca, Seminars By Coach Arnie');

    this.meta.setTag('og:title', 'Arnie Fonseca - Seminars');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Seminars');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://arniefonseca.influxiq.com/assets/images/logo.png');
    this.dataformate = moment();


 
    // FB.init({
    //   appId: '2540470256569874',
    //   version: 'v2.9'
    // });


    fb.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });


  }

  ngOnInit() {

    // this.activatedRoute.data.forEach(data => {
    //   //console.log('test 12',data);
    //   let result: any = {};
    //   result = data.seminarsDetailData.res;
    //   console.log('>>>>>>>>>>>>>>',result)
    //
    //   this.SeminarsdetailArry = result;
    //
    //   this.indexvallength = this.SeminarsdetailArry.length;
    //
    // })

    this.activatedRoute.data.forEach((data: any) => {
      // console.log(data)
      this.seminer = data.seminarsDetailData.results.event[0];

      this.seminerList = data.seminarsDetailData.results.event_list;


     
      this.getForPastEvent();

    })

    






    if (this.seminer != '') {
      this.meta.setTitle('Arnie Fonseca- seminars-detail');
      this.meta.setTag('og:description', this.seminer.description);
      this.meta.setTag('twitter:description', this.seminer.description);
      this.meta.setTag("description", this.seminer.description)
      this.meta.setTag("twitter:card", this.seminer.title,)

      this.meta.setTag('og:title', this.seminer.title);
      this.meta.setTag('twitter:title', this.seminer.title);
      this.meta.setTag('og:image', this.seminer.image);
      this.meta.setTag('og:image:width', 'auto');
      this.meta.setTag('og:image:height', 'auto');
      this.meta.setTag('twitter:image', this.seminer.image);
      this.meta.setTag('og:url', 'https://arniefonseca.influxiq.com/seminars-detail/' + this.activatedRoute.snapshot.params.title + '/' + this.activatedRoute.snapshot.params._id);

      this.meta.setTag('twitter:url', 'https://arniefonseca.influxiq.com/seminars-detail/' + this.activatedRoute.snapshot.params.title + '/' + this.activatedRoute.snapshot.params._id);


    }


  }




  getForPastEvent(){
    this.upComingEvent=[];
    this.pastEvent=[];
    let currentdate: Date;
    currentdate = new Date();
    let curdate = (this.datePipe.transform(currentdate, 'MM-dd-yyyy'));
    let eventDate = moment(curdate).format('x');
    // console.log('s d',eventDate);


    for(let i in  this.seminerList){
     
      // console.log('d', this.seminerList[i].date_unix)
      if(this.seminerList[i].date_unix > eventDate){
        // console.log('up',this.seminerList[i])
        this.upComingEvent.push(this.seminerList[i]);
      } else {
        // console.log('past',this.seminerList[i])
        this.pastEvent.push(this.seminerList[i]);
      }
    }
  }

  //***********load more view blog *************//
  blogloadmore() {
    // console.log('load more')
    this.indexval = this.indexval + 1;

  }



  viewDetails(val:any){

    this.title = val.title;
    this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log(this.eventTitle)
    this.router.navigateByUrl("/seminars-detail/" + this.eventTitle + '/' + val._id);
  }


  copyText(val: any) {
    // console.log('copyText');
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
    var url='https://arniefonseca.influxiq.com/seminars-detail/'+ this.eventTitle+'/'+val._id;
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
    window.open('https://twitter.com/intent/tweet?url=arniefonseca.influxiq.com/seminars-detail/'+this.eventTitle+'/'+ val._id);
    // console.log(url)

  }

  linkedinShare(val:any){
  
    this.title = val.title;
    this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log(this.eventTitle)

    window.open('https://www.linkedin.com/sharing/share-offsite/?url=arniefonseca.influxiq.com/seminars-detail/'+this.eventTitle+'/'+ val._id);
    // console.log(url)

  }


   // tumblr share 
  
   tumblrShare(val:any){
  
    this.title = val.title;
    this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log(this.eventTitle)

    window.open('http://www.tumblr.com/share?url=arniefonseca.influxiq.com/seminars-detail/'+this.eventTitle+'/'+ val._id);
    // console.log(url)

  }

  viewallbutton(){
      this.router.navigateByUrl("/past-speaker-engagements");
    }

}