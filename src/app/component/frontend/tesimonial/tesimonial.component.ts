import { Component, OnInit, ViewChild, ɵConsole,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { MetaService } from '@ngx-meta/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FacebookService, UIParams, UIResponse } from 'ngx-facebook';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

export interface DialogData {
  errorMsg: string;
  loginMsg: string;
  name: string;
}



@Component({
  selector: 'app-tesimonial',
  templateUrl: './tesimonial.component.html',
  styleUrls: ['./tesimonial.component.css']
})
export class TesimonialComponent implements OnInit {

  public youtubeFlage:boolean=false;
  public hideSpan:boolean=true;
  safeSrc: SafeResourceUrl;
  
  carouselOptions = {
    margin: 5,
    nav: true,
    loop: true,
    navText: ["<div class='nav-btn prev-slide'><i class='material-icons'>keyboard_backspace</i></div>", "<div class='nav-btn next-slide'><i class='material-icons'>keyboard_backspace</i></div>"],
    responsiveClass: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        center: true,
        loop: true,
        nav: true,
      },
      600: {
        items: 1,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        center: true,
        loop: true,
        nav: true,
      },
      991: {
        items: 1,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        center: true,
        loop: true,
        nav: true,         
      },
      1500: {
        items: 1,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        center: true,
        loop: true,
        nav: true,
        dot:false,
      }
    }
  }

  public TestimonialListArray: any = [];

  constructor(public apiService: ApiService,public facebook:FacebookService,public sanitizer: DomSanitizer) {

    facebook.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });


   }

  ngOnInit() {
    
      

    let data: any = {};
    data = {
      source:"testimonial_view"
    }
        this.apiService.addDataWithoutToken(data, "datalistwithouttoken").subscribe((res2:any)=>{
         
           setTimeout(()=>{  
          this.TestimonialListArray = res2.res;
          for(let i in this.TestimonialListArray){
            if(this.TestimonialListArray[i].video_url!='' && this.TestimonialListArray[i].video_url!=null){
              this.TestimonialListArray[i].video_full=''
              let url:any;
              url="https://www.youtube.com/embed/";
               // console.log('video url....>',url+val);
               this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(url + this.TestimonialListArray[i].video_url);
               this.TestimonialListArray[i].video_full=this.safeSrc;

            }
          }
          // console.warn(this.TestimonialListArray);
         }, 3000);
    
        });



     
  }


    /**show video modal on click of thamnail function by sourav */
    fetchvideo(){
      
      this.youtubeFlage=true;
      this.hideSpan=false;
      console.log(this.youtubeFlage);
      console.log(this.hideSpan);
    }  


  //*********** Coming Soon ************//
  // comingSoonDialogTestimonhome(): void {
  //   const dialogRef = this.dialog.open(comingSoonDialogTestimonhome, {

  //     data: { name: this.name }
  //   });

  //   setTimeout(() => {
  //     this.dialog.closeAll();
  //   }, 4000);
  // }
  //*********** Coming Soon ************//





  
  // testimonial share 

  fbTestimonialShare(val:any){
    //console.log(val)
    var url='https://arniefonseca.influxiq.com/testimonial/'+ val._id;
    console.log(url)

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



// @Component({
//   selector: 'app-coming-soon',
//   templateUrl: '../../../layout/coming-soon.html'
// })
// export class comingSoonDialogTestimonhome {

//   constructor(
//     public dialogRef: MatDialogRef<comingSoonDialogTestimonhome>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
