import { Component, OnInit, ViewChild, ɵConsole,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { MetaService } from '@ngx-meta/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FacebookService, UIParams, UIResponse } from 'ngx-facebook';

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

  public name: string;
  
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

  constructor(public apiService: ApiService,public facebook:FacebookService) {

    facebook.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });


   }

  ngOnInit() {
    var data: any = {};
    data = {
      source:"testimonial_view",
      endpoint: "datalist"
    }

    this.apiService.getTempToken().subscribe((res:any)=>{      
      if(res.status == 'success') {
        this.apiService.getDatalistWithToken(data, res).subscribe((res2:any)=>{
          this.TestimonialListArray = res2.res;
          console.log(this.TestimonialListArray);
        });
      }
    });
    // this.activatedRoute.data.forEach((data:any)=>{
    //   this.TestimonialListArray=data.testimonialListData;
    //   //console.log('>>>>>>koushik testimonial>>>>>>>>>',this.TestimonialListArray)
    // })

  }


  

  showBut() {
    console.log('show button')
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
    console.log(val)
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
