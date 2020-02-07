import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public savedUrl: any = [];
  public savedId: any = [];


  safeSrc: SafeResourceUrl;
  public videos = ['https://www.youtube.com/embed/TOzJRrGdMCs', 'https://www.youtube.com/embed/0a-TwOCLqII', 'https://www.youtube.com/embed/TOzJRrGdMCs', 'https://www.youtube.com/embed/1AmZy4bSleY', 'https://www.youtube.com/embed/fQVf9Ruauko?list=RDfQVf9Ruauko', 'https://www.youtube.com/embed/1AmZy4bSleY', 'https://www.youtube.com/embed/fQVf9Ruauko?list=RDfQVf9Ruauko'];
  private currentSlide = 0;
  constructor(public sanitizer: DomSanitizer) {

   

    for (const i of this.videos) {
      var re = "https://www.youtube.com/embed/";
      // var str: any = "https://www.youtube.com/embed/TOzJRrGdMCs";
      var str: any = i;
      var newstr = str.replace(re, "");
      this.videos = newstr;
      this.savedId.push(newstr);
      // console.log(this.savedId)
    }


    this.safeSrc = this.videos;
    for (let i in this.safeSrc) {
      this.savedUrl.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.safeSrc[i]));

    }

    // console.log(this.safeSrc);


  }


  prev() {
    if (this.currentSlide === this.savedUrl.length) return;
    this.currentSlide = (this.currentSlide - 1) % this.savedUrl.length;

    // console.log(this.currentSlide)
  }
  next() {
    if (this.currentSlide === this.savedUrl.length) return;
    this.currentSlide = (this.currentSlide + 1) % this.savedUrl.length;
    // console.log(this.currentSlide)
  }



  ngOnInit() { }



  public video1: any = '';
  public temp: any = '';



  onSelect(video) {
    // console.log(video)

    this.video1 = "https://www.youtube.com/embed/" + video;
      this.safeSrc = this.video1;

      this.temp = this.safeSrc;
    // console.log(this.temp)
  }

}
