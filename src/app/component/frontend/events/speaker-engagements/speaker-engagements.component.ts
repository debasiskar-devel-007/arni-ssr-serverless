import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from '../../../../api.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-speaker-engagements',
  templateUrl: './speaker-engagements.component.html',
  styleUrls: ['./speaker-engagements.component.css']
})
export class SpeakerEngagementsComponent implements OnInit {

  public indexvallength: any=1;


  public indexval:any=6;


  public indexvalleftlengthlength: any=1;


  public indexvalleft:any=2;


  public title:any;
  public eventTitle:any;


  public  SpeakerListArry: any = []
  public dataformate: any;
  public eventImage:any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService, private readonly meta: MetaService,private sanitizer: DomSanitizer ) {
    
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
  }

  ngOnInit() {

    this.activatedRoute.data.forEach(data => {
      let result: any = {};
      result = data.speakerEngagementsListData.res;
      // console.warn(result);

      // this.eventImage=result.event_image[0].basepath[0]+result.event_image[0].image[0];
      // console.log('+++++>>>>>>>>>>>>', this.eventImage)
      // console.log('>>>>>>>>>>>>>>>>',result);
      this.SpeakerListArry = result;

      this.indexvallength = this.SpeakerListArry.length;

      this.indexvalleftlengthlength = this.SpeakerListArry.length;
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
    console.log( this.eventTitle)
    this.router.navigateByUrl("/speaker-engagements-detail/"+ this.eventTitle +'/' + val._id);
  }

}
