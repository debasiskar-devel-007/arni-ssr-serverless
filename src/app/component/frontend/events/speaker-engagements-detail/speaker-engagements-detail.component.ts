import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from '../../../../api.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';


@Component({
  selector: 'app-speaker-engagements-detail',
  templateUrl: './speaker-engagements-detail.component.html',
  styleUrls: ['./speaker-engagements-detail.component.css']
})
export class SpeakerEngagementsDetailComponent implements OnInit {

  public indexvallength: any=1;


  public indexval:any=6;
  public speaker_img:any
  public speaker:any;

  public dataformate: any;
  public eventImage:any;

  public profile:any;
  public title: any;
  public eventTitle: any;
public speakerList:any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService, private readonly meta: MetaService,private sanitizer: DomSanitizer,public FB:FacebookService ) {

    this.meta.setTitle('Arnie Fonseca - Speaker Engagements');
    this.meta.setTag('og:description', 'Check out the dates and locations of upcoming Arnie Fonseca Speaker Engagements, and hear Coach Arnie speak. Attend one of these Speaker Engagements By Coach Arnie so that he can help you achieve all you want.');
    this.meta.setTag('twitter:description', 'Check out the dates and locations of upcoming Arnie Fonseca Speaker Engagements, and hear Coach Arnie speak. Attend one of these Speaker Engagements By Coach Arnie so that he can help you achieve all you want.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca Speaker Engagements, Speaker Engagements By Arnie Fonseca, Speaker Engagements By Coach Arnie');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca Speaker Engagements, Speaker Engagements By Arnie Fonseca, Speaker Engagements By Coach Arnie');

    this.meta.setTag('og:title', 'Arnie Fonseca - Speaker Engagements');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Speaker Engagements');
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

    this.activatedRoute.data.forEach((data: any) => {
      this.speaker = data.speakerengagementsDetailData.results.event[0];

      this.speakerList = data.speakerengagementsDetailData.results.event_list;

      // console.log('>>>>>>>kb>>>>>>>',this.speaker)
      // this.speaker_img=this.speaker[0].Image[0];    

    })


    if (this.speaker != '') {
      this.meta.setTitle('Arnie Fonseca- speaker-engagements-detail');
      this.meta.setTag('og:description', this.speaker.description);
      this.meta.setTag('twitter:description', this.speaker.description);
      this.meta.setTag("description", this.speaker.description)

      this.meta.setTag('og:title', this.speaker.title);
      this.meta.setTag('twitter:title', this.speaker.title);
      this.meta.setTag('og:image', this.speaker.image);
      this.meta.setTag('og:image:width', 'auto');
      this.meta.setTag('og:image:height', 'auto');
      this.meta.setTag('twitter:image', this.speaker.image);
      this.meta.setTag('og:url', 'https://arniefonseca.influxiq.com/speaker-engagements-detail/' + this.activatedRoute.snapshot.params.title + '/' + this.activatedRoute.snapshot.params.id);


    }


  }




  //***********load more view blog *************//
  blogloadmore(){
    // console.log('load more')
    this.indexval=this.indexval+1;

  }

  copyText(val:any){
    console.log('copyText');
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
    var url='https://arniefonseca.influxiq.com/speaker-engagements-detail/'+ this.eventTitle+'/'+val._id;
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
    window.open('https://twitter.com/intent/tweet?url=arniefonseca.influxiq.com/speaker-engagements-detail/'+this.eventTitle+'/'+ val._id);
    // console.log(url)

  }

  linkedinShare(val:any){
  
    this.title = val.title;
    this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    console.log(this.eventTitle)

    window.open('https://www.linkedin.com/sharing/share-offsite/?url=arniefonseca.influxiq.com/speaker-engagements-detail/'+this.eventTitle+'/'+ val._id);
    // console.log(url)

  }


   // tumblr share 
  
   tumblrShare(val:any){
  
    this.title = val.title;
    this.eventTitle = this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    console.log(this.eventTitle)

    window.open('http://www.tumblr.com/share?url=arniefonseca.influxiq.com/speaker-engagements-detail/'+this.eventTitle+'/'+ val._id);
    // console.log(url)

  }



}
