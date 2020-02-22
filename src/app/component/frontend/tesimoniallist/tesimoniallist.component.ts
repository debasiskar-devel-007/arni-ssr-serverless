import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment'; // add this 1 of 4
import { ApiService } from '../../../api.service';
import { MetaService } from '@ngx-meta/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { FacebookService, UIParams, UIResponse, LoginResponse } from 'ngx-facebook';

export interface DialogData {data: any;} 

@Component({
  selector: 'app-tesimoniallist',
  templateUrl: './tesimoniallist.component.html',
  styleUrls: ['./tesimoniallist.component.css']
})
export class TesimoniallistComponent implements OnInit {
  private indexvallength: any;
  public TestimonialListArray: any = [];
  // showMore = false;
  showme = true;
  public indexval: any = 6;
  public dataformate: any;
  public p_id: any;
  public profile: any;

  safeSrc: SafeResourceUrl;

  copyText(val:any){
    //console.log('copyText');
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService, private readonly meta: MetaService,  private sanitizer: DomSanitizer,public dialog:MatDialog,private facebook:FacebookService) { 

    this.meta.setTitle('Arnie Fonseca - Testimonials');


    this.dataformate = moment();

    facebook.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });
  }

  

  ngOnInit() {    

    if(this.activatedRoute.snapshot.params.id ==null){
      this.activatedRoute.data.forEach(data => {
        let result: any = {};
        result = data.testimonialListData.res;
        // console.warn(result);
        this.TestimonialListArray = result;
        this.indexvallength = this.TestimonialListArray.length;
      })


     


    this.meta.setTag('og:description', 'Check out what Coach Arnie’s students, clients and other people from the Personal Development Industry have to say about him and the many programs that he offers.');
    this.meta.setTag('twitter:description', 'Check out what Coach Arnie’s students, clients and other people from the Personal Development Industry have to say about him and the many programs that he offers.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca Reviews, Arnie Fonseca Testimonials, Arnie Fonseca Customer Reviews');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca Reviews, Arnie Fonseca Testimonials, Arnie Fonseca Customer Reviews');

    this.meta.setTag('og:title', 'Arnie Fonseca - Testimonials');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Testimonials');

    this.meta.setTag('og:type', 'website');

    this.meta.setTag('og:image', 'https://arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://arniefonseca.influxiq.com/assets/images/logo.png');
    }

    else {

      this.activatedRoute.data.forEach(data => {
        let result: any = {};
        result = data.testimonialListData.testimonial_list;
        // console.warn(result);
        this.TestimonialListArray = result;
        this.indexvallength = this.TestimonialListArray.length;
      })

      for(let item in  this.TestimonialListArray){
        if(this.activatedRoute.snapshot.params.id == this.TestimonialListArray[item]._id){
          //console.log('???', this.TestimonialListArray[item])
          this.meta.setTag('og:title', 'arniefonseca - Testimonials '+this.TestimonialListArray[item].name);
          this.meta.setTag('twitter:title', 'arniefonseca - Testimonials'+this.TestimonialListArray[item].name);
          this.meta.setTag('og:image', this.TestimonialListArray[item].testimonial_img);
          this.meta.setTag('twitter:image', this.TestimonialListArray[item].testimonial_img);
          this.meta.setTag('og:description', this.TestimonialListArray[item].description);
          this.meta.setTag('twitter:description', this.TestimonialListArray[item].description);  
          this.meta.setTag('og:url', 'http://arniefonseca.influxiq.com/testimonial/'+  this.TestimonialListArray[item]._id);
        }
      }
    }
    
    
  }


  detailsView(val:any){
    //console.log(val)

    this.router.navigateByUrl('/testimonial/'+val._id)
  }

  
  
  btnBackClick = function () {
    this.router.navigateByUrl('testimonial');
  };

  testimonialloadmore() {
    this.indexval = this.indexval + 3;
    // console.log(this.indexval);
  }

  showmore(index:any) {
   this.p_id = index._id;
  }

  showaudio() {
   // console.log('showaudio function is wirking')
  }

  showvideo() {
    //console.log('showvideo function is wirking')
  }

  //*********view Video modal section***********//

  openvideourl(val:any){

    let url:any;
    url="https://www.youtube.com/embed/";
     // console.log('video url....>',url+val);
     this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(url + val);
     
     // console.log('>>>>>>>>>>>>>>>>>>',this.safeSrc)
     const dialogRef = this.dialog.open(CommonTestimonialVideoModalComponent, {
      //  panelClass:['modal-md','success-modal'],       
      //  width:'450px',
      panelClass:'blogdetail_videomodal',
       data:this.safeSrc, 
     });
     dialogRef.afterClosed().subscribe(result => {  
     });
   }

//********* end Video modal section***********//


  

//facebook share for event

login() {
  this.facebook.login()
    .then((res: LoginResponse) => {
     
      this.getProfile();
    })
    .catch();
}
getProfile() {
  this.facebook.api('me/?fields=id,name,email,picture')
    .then((res: any) => {
     
      this.profile = res;
      
    })
    .catch((error: any) => {

    });
}



  // testimonial share 

  fbTestimonialShare(val:any){
    //console.log(val)
    var url='https://arniefonseca.influxiq.com/testimonial/'+ val._id;
    //console.log(url)

    let params: UIParams = {
      href: url,
      method: 'share'
    };
    this.facebook.ui(params).then((res:UIResponse)=>{
    }).catch(facebook=>{
      // console.log(facebook)
    });
  }
 
  twitterTestimonialShare(val:any){
    window.open('https://twitter.com/intent/tweet?url=arniefonseca.influxiq.com/testimonial/'+ val._id);
  }


  linkedinTestimonialShare(val:any){

    window.open('https://www.linkedin.com/sharing/share-offsite/?url=arniefonseca.influxiq.com/testimonial/'+ val._id);

  }

tumblrTestimonialShare(val:any){
    window.open('http://www.tumblr.com/share?url=arniefonseca.influxiq.com/testimonial/'+ val._id);

}


}

//**********video modal component************//

@Component({
  selector:'app-commontestimonialvideomodal',
  templateUrl:'./commontestimonialvideomodal.html'
})
export class CommonTestimonialVideoModalComponent {
  constructor( public dialogRef: MatDialogRef<CommonTestimonialVideoModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData){
  }
}
