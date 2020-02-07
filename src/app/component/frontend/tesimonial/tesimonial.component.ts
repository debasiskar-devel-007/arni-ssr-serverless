import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-tesimonial',
  templateUrl: './tesimonial.component.html',
  styleUrls: ['./tesimonial.component.css']
})
export class TesimonialComponent implements OnInit {
  
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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService) { }

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

}
