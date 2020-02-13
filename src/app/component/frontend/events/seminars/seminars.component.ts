import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from '../../../../api.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { getLocaleDateFormat } from '@angular/common';
import { format } from 'url';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-seminars',
  templateUrl: './seminars.component.html',
  styleUrls: ['./seminars.component.css']
})
export class SeminarsComponent implements OnInit {
  public indexvallength: any=1;

  
  public indexval:any=6;


  public indexvalleftlengthlength: any=1;


  public indexvalleft:any=2;


  public SeminarsListArry: any = []
  public dataformate: any;
  public eventImage:any;
  public title:any;
  public eventTitle:any;

  constructor(public activatedRoute: ActivatedRoute, public router: Router, public apiService: ApiService, private readonly meta: MetaService,public datePipe:DatePipe ) {

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
   }

  ngOnInit() {

    this.activatedRoute.data.forEach(data => {
      // console.log('test',data);
      let result: any = {};
      result = data.seminarsListData.res;
      console.log('>>>>>>>',result);

      // this.eventImage=result.event_image[0].basepath[0]+result.event_image[0].image[0];
      // console.log('+++++>>>>>>>>>>>>', this.eventImage)
      // console.log('>>>>>>>>>>>>>>>>',result);
      this.SeminarsListArry = result;

     
      this.indexvallength = this.SeminarsListArry.length;

      this.indexvalleftlengthlength = this.SeminarsListArry.length;
    })

    // this.getCurrentDate();


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
    this.router.navigateByUrl("/seminars-detail/"+ this.eventTitle +'/' + val._id);
  }

  //current date
// getCurrentDate(){  
  
//   let dateFormat = require('dateformat');
//   let now = new Date();
//   // dateFormat(now,"mm-dd-yyyy");
//   let currentDate=this.datePipe.transform(now,"MM-dd-yyyy")

//   console.log('>>>>>>>>',currentDate);
      
//     }


}
