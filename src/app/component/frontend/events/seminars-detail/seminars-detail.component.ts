import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';


@Component({
  selector: 'app-seminars-detail',
  templateUrl: './seminars-detail.component.html',
  styleUrls: ['./seminars-detail.component.css']
})
export class SeminarsDetailComponent implements OnInit {

  public indexvallength: any = 1;


  public title: any;
  public eventTitle: any;
  public indexval: any = 6;
  // public seminer_img:any
  public seminer: any;
  public SeminarsdetailArry: any;
  public dataformate: any;
  public eventImage: any;
  public profile:any;

  constructor(public activatedRoute: ActivatedRoute,  private readonly meta: MetaService,public FB:FacebookService) {

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
      this.seminer = data.seminarsDetailData.events_data[0];
      console.log('>>>>>>>kb>>>>>>>', this.seminer)
      // this.seminer_img=this.seminer.Image;

    })


    if (this.seminer != '') {
      this.meta.setTitle('Arnie Fonseca- seminars-detail');
      this.meta.setTag('og:description', this.seminer.description);
      this.meta.setTag('twitter:description', this.seminer.description);
      this.meta.setTag("description", this.seminer.description)

      this.meta.setTag('og:title', this.seminer.title);
      this.meta.setTag('twitter:title', this.seminer.title);
      this.meta.setTag('og:image', this.seminer.image);
      this.meta.setTag('og:image:width', 'auto');
      this.meta.setTag('og:image:height', 'auto');
      this.meta.setTag('twitter:image', this.seminer.image);
      this.meta.setTag('og:url', 'https://dev.probidauto.com/seminars-detail/' + this.activatedRoute.snapshot.params.title + '/' + this.activatedRoute.snapshot.params.id);


    }


  }

  //***********load more view blog *************//
  blogloadmore() {
    // console.log('load more')
    this.indexval = this.indexval + 1;

  }


  copyText(val: any) {
    // console.log('copyText');
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
    console.log(val)
    this.title = val.title;
    this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    console.log(this.eventTitle)
    var url='https://dev.probidauto.com/seminars-detail/'+ this.eventTitle+'/'+val._id;
    // console.log(url)

    let params: UIParams = {
      href: url,
      method: 'share',
      quote: 'https://dev.probidauto.com/'
    };
    this.FB.ui(params).then((res:UIResponse)=>{
    }).catch(facebook=>{
      // console.log(facebook)
    });
  }

  logoutWithFacebook(): void {

    this.FB.logout().then();
  }


  twitterShare(val:any){
  
    this.title = val.title;
    this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    console.log(this.eventTitle)
    window.open('https://twitter.com/intent/tweet?url=dev.probidauto.com/seminars-detail/'+this.eventTitle+'/'+ val._id);
    // console.log(url)

  }

  linkedinShare(val:any){
  
    this.title = val.title;
    this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    console.log(this.eventTitle)

    window.open('https://www.linkedin.com/sharing/share-offsite/?url=dev.probidauto.com/seminars-detail/'+this.eventTitle+'/'+ val._id);
    // console.log(url)

  }


   // tumblr share 
  
   tumblrShare(val:any){
  
    this.title = val.title;
    this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    console.log(this.eventTitle)

    window.open('http://www.tumblr.com/share?url=dev.probidauto.com/seminars-detail/'+this.eventTitle+'/'+ val._id);
    // console.log(url)

  }



}