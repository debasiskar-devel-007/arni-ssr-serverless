import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from '../../../../api.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { getLocaleDateFormat } from '@angular/common';
import { format } from 'url';
import { DatePipe } from '@angular/common';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';

@Component({
  selector: 'app-past-seminars',
  templateUrl: './past-seminars.component.html',
  styleUrls: ['./past-seminars.component.css']
})
export class PastSeminarsComponent implements OnInit {
  public indexvallength: any = 1;


  public indexval: any = 6;


  public indexvalleftlengthlength: any = 1;


  public indexvalleft: any = 2;
  public indexvalright:any=12

  public SeminarsListArry: any = []
  public dataformate: any;
  public eventImage: any;
  public title: any;
  public eventTitle: any;
  public profile: any;
  public upComingEvent:any=[];
  public pastEvent:any=[];
  public eventsem:any;
  public pasteventsem:any;

  constructor(public activatedRoute: ActivatedRoute, public router: Router, public apiService: ApiService, private readonly meta: MetaService, public datePipe: DatePipe, public FB: FacebookService) { 

    this.meta.setTitle('Arnie Fonseca - Seminars');
    this.meta.setTag('og:description', 'Check out the dates and locations of upcoming Seminars By Arnie Fonseca, and book your seats to Seminars By Coach Arnie near you. Attend Arnie Fonseca Seminars to help improve your life.');
    this.meta.setTag('twitter:description', 'Check out the dates and locations of upcoming Seminars By Arnie Fonseca, and book your seats to Seminars By Coach Arnie near you. Attend Arnie Fonseca Seminars to help improve your life.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca Seminars, Seminars By Arnie Fonseca, Seminars By Coach Arnie');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca Seminars, Seminars By Arnie Fonseca, Seminars By Coach Arnie');

    this.meta.setTag('og:title', 'Arnie Fonseca - Seminars');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Seminars');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.dataformate = moment();

    FB.init({
      appId: '2540470256228526',
      version: 'v2.9'
    });


  }

  ngOnInit() {


    this.activatedRoute.data.forEach(data => {
      // console.log('test',data);
      let result: any = {};
      result = data.seminarsListData.past_events;
      // console.log('>>>>>>>', result);

      // this.eventImage=result.event_image[0].basepath[0]+result.event_image[0].image[0];
      // console.log('+++++>>>>>>>>>>>>', this.eventImage)
      // console.log('>>>>>>>>>>>>>>>>',result);
      this.SeminarsListArry = result;


      this.indexvallength = this.SeminarsListArry.length;

      this.indexvalleftlengthlength = this.SeminarsListArry.length;
    })


    
  }

  detail(val: any) {
    // console.log(val)
    this.title = val.title;
    this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log(this.eventTitle)
    this.router.navigateByUrl("/seminars-detail/" + this.eventTitle + '/' + val._id);
  }


  blogloadmore(){
    this.indexvalright=this.indexvalright + 6
  }


  
  //facebook share for event

  login() {
    this.FB.login()
      .then((res: LoginResponse) => {

        this.getProfile();
      })
      .catch();
  }
  getProfile() {
    this.FB.api('me/?fields=id,name,email,picture')
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
    var url = 'https://arniefonseca.influxiq.com/seminars-detail/' + this.eventTitle + '/' + val._id;
    // console.log(url)

    let params: UIParams = {
      href: url,
      method: 'share',
      quote: 'https://arniefonseca.influxiq.com/'
    };
    this.FB.ui(params).then((res: UIResponse) => {
    }).catch(facebook => {
      // console.log(facebook)
    });
  }

  logoutWithFacebook(): void {

    this.FB.logout().then();
  }


  twitterShare(val: any) {

    this.title = val.title;
    this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log(this.eventTitle)
    window.open('https://twitter.com/intent/tweet?url=arniefonseca.influxiq.com/seminars-detail/' + this.eventTitle + '/' + val._id);
    // console.log(url)

  }

  linkedinShare(val: any) {

    this.title = val.title;
    this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log(this.eventTitle)

    window.open('https://www.linkedin.com/sharing/share-offsite/?url=arniefonseca.influxiq.com/seminars-detail/' + this.eventTitle + '/' + val._id);
    // console.log(url)

  }


  // tumblr share 

  tumblrShare(val: any) {

    this.title = val.title;
    this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log(this.eventTitle)

    window.open('http://www.tumblr.com/share?url=arniefonseca.influxiq.com/seminars-detail/' + this.eventTitle + '/' + val._id);
    // console.log(url)

  }


}
