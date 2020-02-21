import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from '../../../../api.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-past-speaker-engagements',
  templateUrl: './past-speaker-engagements.component.html',
  styleUrls: ['./past-speaker-engagements.component.css']
})
export class PastSpeakerEngagementsComponent implements OnInit {
  public indexvallength: any;


  public indexvalright:any=12;

  public searchLoadMore:boolean=false;

  public indexvalleftlengthlength: any=1;


  public indexvalleft:any=2;


  public title:any;
  public eventTitle:any;


  public  SpeakerListArry: any = []
  public dataformate: any;
  public eventImage:any;
  public profile:any;

  public upComingEvent:any=[];
  public pastEvent:any=[];  
  public eventsem:any;
  public pasteventsem:any;
  
  constructor(private activatedRoute: ActivatedRoute, public router: Router, public apiService: ApiService, private readonly meta: MetaService,public sanitizer: DomSanitizer,public fb:FacebookService ,public datePipe: DatePipe) { 

    this.meta.setTitle('Arnie Fonseca - Speaker Engagements');
    this.meta.setTag('og:description', 'Check out the dates and locations of upcoming Arnie Fonseca Speaker Engagements, and hear Coach Arnie speak. Attend one of these Speaker Engagements By Coach Arnie so that he can help you achieve all you want.');
    this.meta.setTag('twitter:description', 'Check out the dates and locations of upcoming Arnie Fonseca Speaker Engagements, and hear Coach Arnie speak. Attend one of these Speaker Engagements By Coach Arnie so that he can help you achieve all you want.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca Speaker Engagements, Speaker Engagements By Arnie Fonseca, Speaker Engagements By Coach Arnie');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca Speaker Engagements, Speaker Engagements By Arnie Fonseca, Speaker Engagements By Coach Arnie');

    this.meta.setTag('og:title', 'Arnie Fonseca - Speaker Engagements');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Speaker Engagements');
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
      result = data.speakerEngagementsListData.past_events;
      // console.warn(result);

      // this.eventImage=result.event_image[0].basepath[0]+result.event_image[0].image[0];
      // console.log('+++++>>>>>>>>>>>>', this.eventImage)
      // console.log('>>>>>>>>>>>>>>>>',result);
      this.SpeakerListArry = result;

      this.indexvallength = this.SpeakerListArry.length;

      this.indexvalleftlengthlength = this.SpeakerListArry.length;
    })

    //past and upcoming event

    let currentdate: Date;
    currentdate = new Date();
    let curdate = (this.datePipe.transform(currentdate, 'MM-dd-yyyy'));
    let eventDate = moment(curdate).format('x');
    // console.log('s d',eventDate);


    for(let i in  this.SpeakerListArry){
      // console.log('d', this.SpeakerListArry[i].date_unix)
      if(this.SpeakerListArry[i].date_unix > eventDate){
        // console.log('up',this.SpeakerListArry[i])
        this.upComingEvent.push(this.SpeakerListArry[i]);
      } else {
        // console.log('past',this.SpeakerListArry[i])
        this.pastEvent.push(this.SpeakerListArry[i]);
      }
    }

  }


  
  detail(val:any){

    // console.log(val)
    this.title=val.title;
    this.eventTitle=this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log( this.eventTitle)
    this.router.navigateByUrl("/speaker-engagements-detail/"+ this.eventTitle +'/' + val._id);
  }


  blogloadmore(){
    // this.indexvalright=this.indexvalright + 6;
    let data:any;
    data={
      "type":"speaker_engagement",
      "limit":10,
      "skip":this.indexvalright
    }
    this.apiService.CustomRequest(data,'pasteventdatalist').subscribe(res=>{
      let result:any=res;
      console.log(result.past_events)
      if(result.past_events.length>0){
        this.SpeakerListArry = this.SpeakerListArry.concat(result.past_events);
        this.indexvalright = this.indexvalright + 6;
      }else{
           this.searchLoadMore=true;
      }
    })
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
  var url='https://arniefonseca.influxiq.com/speaker-engagements-detail/'+ this.eventTitle+'/'+val._id;
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
  window.open('https://twitter.com/intent/tweet?url=arniefonseca.influxiq.com/speaker-engagements-detail/'+this.eventTitle+'/'+ val._id);
  // console.log(url)

}

linkedinShare(val:any){

  this.title = val.title;
  this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
  // console.log(this.eventTitle)

  window.open('https://www.linkedin.com/sharing/share-offsite/?url=arniefonseca.influxiq.com/speaker-engagements-detail/'+this.eventTitle+'/'+ val._id);
  // console.log(url)

}


 // tumblr share 

 tumblrShare(val:any){

  this.title = val.title;
  this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
  // console.log(this.eventTitle)

  window.open('http://www.tumblr.com/share?url=arniefonseca.influxiq.com/speaker-engagements-detail/'+this.eventTitle+'/'+ val._id);
  // console.log(url)

}

}
