import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

export interface DialogData {
  errorMsg: string;
  loginMsg: string;
  name: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})





export class HomeComponent implements OnInit {

  public name: string;


  
  public slides: any = [
    {"img":"https://arniefonseca.influxiq.com/assets/images/arnehome-slide1img.jpg", "imgmobile":"../../assets/images/slide1img-imgmobile.jpg", "slideimg":"https://arniefonseca.influxiq.com/assets/images/slide1img-person.jpg", "subtitle2":"The Best & The Most Powerful <br>Transformation Process <br>There Is", "title":"Arnie <br>Fonseca","subtitle":"Personal Development Mentor", "description":"Invite your audience to be mentored by me at your event, and learn <b>some simple, but powerful methods that will make immediate improvements in your lives.</b>", "description3":"Personal and Professional Coaching & Training, Couples & Relationship Counselling, High-Performance Programs and many other such offerings", "description2":"You have a large variety to choose from."},
    {"img":"../../assets/images/arnehome-slide2img.jpg", "imgmobile":"../../assets/images/slide2img-imgmobile.jpg", "slideimg":"https://arniefonseca.influxiq.com/assets/images/slide1img-person.jpg", "subtitle2":"The Best & The Most Powerful <br>Transformation Process <br>There Is", "title":"The Best","subtitle":"The Best & The Most Powerful <br>Transformation Process <br>There Is", "description":"Come One, Come All! Be a part of a <b>Powerful Transformation <br>Process</b> that will show you the key to achieving success at a high <br>level, <b>Surely and Consistently!</b>", "description3":"Personal and Professional Coaching & Training, Couples & Relationship Counselling, High-Performance Programs and many other such offerings", "description2":"You have a large variety to choose from."},
    {"img":"../../assets/images/arnehome-slide3img.jpg", "imgmobile":"../../assets/images/slide3img-imgmobile.jpg", "slideimg":"https://arniefonseca.influxiq.com/assets/images/slide1img-person.jpg", "subtitle2":"Coaching, Training, <br>Counselling", "title":"It’s All Here!!","subtitle":"The Best & The Most Powerful <br>Transformation Process <br>There Is", "description":"Personal and Professional Coaching & Training, Couples & Relationship Counselling, High-Performance Programs and many other such offerings", "description3":"Personal and Professional Coaching & Training, <br>Couples & Relationship Counselling, <br>High-Performance Programs and many other such <br>offerings -", "description2":"You have a large variety to choose from."}
  ];


  // public slides: any = ["https://arniefonseca.influxiq.com/assets/images/arnehome-slide1img.jpg","https://arniefonseca.influxiq.com/assets/images/arnehome-slide1img.jpg","https://arniefonseca.influxiq.com/assets/images/arnehome-slide1img.jpg"];
  
  carouselBannerOptions = {
    autoPlay : 6000,
    stopOnHover : true,
    navigation:true,
    paginationSpeed : 1000,
    goToFirstSpeed : 2000,
    transitionStyle:"fade",
    margin: 0,
    nav: false,
    loop: false,
    rewind: true,
    autoplay: false,
    autoplayHoverPause: true,
    center: false,
    responsiveClass: true,
    dots: true,
    autoWidth: true,
    autoHeight:true,
    navText: ["<div class='nav-btn prev-slide'><i class='material-icons'>keyboard_backspace</i></div>", "<div class='nav-btn next-slide'><i class='material-icons'>keyboard_backspace</i></div>"],
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 1,
        nav: false,
      },
      991: {
        items: 1,
        nav: false,
      },
      992: {
        items: 1,
        nav: false,
      },
      1199: {
        items: 1,
        nav: false,
      }
    }
  }


  constructor(private cdr: ChangeDetectorRef, private router: Router, private readonly meta: MetaService, public dialog: MatDialog) {

    this.meta.setTitle('Arnie Fonseca - Personal Development Mentor');
    this.meta.setTag('og:description', 'Invite your audience to be mentored by “Coach Arnie” at your events, and create an environment for them to learn simple, yet powerful self-development methods that will improve their lives considerably.');
    this.meta.setTag('twitter:description', 'Invite your audience to be mentored by “Coach Arnie” at your events, and create an environment for them to learn simple, yet powerful self-development methods that will improve their lives considerably.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca, Coach Arnie, Personal Development Coach, Personal Development Mentor, Personal Development Coaching');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca, Coach Arnie, Personal Development Coach, Personal Development Mentor, Personal Development Coaching');

    this.meta.setTag('og:title', 'Arnie Fonseca - Personal Development Mentor');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Personal Development Mentor');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');

   }

  ngOnInit() {
    var data: any = {};
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  btnClick() {
    this.router.navigateByUrl('/testimonial');
  };

  
    
}

