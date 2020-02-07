import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from '../../../../api.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-seminars-detail',
  templateUrl: './seminars-detail.component.html',
  styleUrls: ['./seminars-detail.component.css']
})
export class SeminarsDetailComponent implements OnInit {

  public indexvallength: any=1;


  public indexval:any=6;
  public seminer_img:any
public seminer:any;
  public SeminarsdetailArry: any = []
  public dataformate: any;
  public eventImage:any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService, private readonly meta: MetaService,private sanitizer: DomSanitizer ) {

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
      this.seminer = data.seminarsDetailData.res;
      console.log('>>>>>>>kb>>>>>>>',this.seminer)
      this.seminer_img=this.seminer[0].Image;

    })


  }


  //***********load more view blog *************//
  blogloadmore(){
    // console.log('load more')
    this.indexval=this.indexval+1;

  }


  copyText(val:any){
    console.log('copyText');
  }

}