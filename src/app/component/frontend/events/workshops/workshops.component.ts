import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from '../../../../api.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  public indexvallength: any=1;


  public indexval:any=6;
  public eventTitle:any;
  public title:any;

  public indexvalleftlengthlength: any=1;


  public indexvalleft:any=2;



  public  WorkshopsListArry: any = []
  public dataformate: any;
  public eventImage:any;
  public profile:any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService, private readonly meta: MetaService,private sanitizer: DomSanitizer,public FB:FacebookService ) {
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
  }

  ngOnInit() {

    this.activatedRoute.data.forEach(data => {
      let result: any = {};
      result = data.workshopsListData.res;
      // console.warn(result);

      // this.eventImage=result.event_image[0].basepath[0]+result.event_image[0].image[0];
      // console.log('+++++>>>>>>>>>>>>', this.eventImage)
      // console.log('>>>>>>>>>>>>>>>>',result);
      this.WorkshopsListArry = result;

      this.indexvallength = this.WorkshopsListArry.length;

      this.indexvalleftlengthlength = this.WorkshopsListArry.length;
    })


  }


  //***********load more view blog *************//
  blogloadmore(){
    // console.log('load more')
    this.indexval=this.indexval+1;

  }


  blogloadmorenew(){
    // console.log('load more')
    this.indexvalleft=this.indexvalleft+1;

  }

  detail(val:any){
    console.log(val)
    this.title=val.title;
    this.eventTitle=this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log( this.eventTitle)
    this.router.navigateByUrl("/workshop-detail/"+ this.eventTitle +'/' + val._id);

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
  var url='https://arniefonseca.influxiq.com/seminars-detail/'+ this.eventTitle+'/'+val._id;
  // console.log(url)

  let params: UIParams = {
    href: url,
    method: 'share',
    quote: 'https://arniefonseca.influxiq.com/'
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
  window.open('https://twitter.com/intent/tweet?url=arniefonseca.influxiq.com/seminars-detail/'+this.eventTitle+'/'+ val._id);
  // console.log(url)

}

linkedinShare(val:any){

  this.title = val.title;
  this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
  console.log(this.eventTitle)

  window.open('https://www.linkedin.com/sharing/share-offsite/?url=arniefonseca.influxiq.com/seminars-detail/'+this.eventTitle+'/'+ val._id);
  // console.log(url)

}


 // tumblr share 

 tumblrShare(val:any){

  this.title = val.title;
  this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
  console.log(this.eventTitle)

  window.open('http://www.tumblr.com/share?url=arniefonseca.influxiq.com/seminars-detail/'+this.eventTitle+'/'+ val._id);
  // console.log(url)

}


}
