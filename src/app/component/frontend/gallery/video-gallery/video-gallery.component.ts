import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

// declare var $:any;
// var iframe           = $('iframe:first');
// var iframe_src       = iframe.attr('src');
// var youtube_video_id = iframe_src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.css']
})
export class VideoGalleryComponent implements OnInit {
  
// videoshow(){
//   if (youtube_video_id.length == 11) {
//     var video_thumbnail = $('<img src="//img.youtube.com/vi/'+youtube_video_id+'/0.jpg">');
//     $('body').append(video_thumbnail);
  
//     $('img:first').click(function() {
//         $('iframe:first').fadeToggle('400');
//     });
//   }
// }


  constructor(private readonly meta: MetaService) {
    this.meta.setTitle('Arnie Fonseca - Video Gallery');
    this.meta.setTag('og:description', 'Check out the latest videos from the events attended or hosted by Arnie Fonseca. This gallery is updated after each event, so you can regularly check it for the videos from the latest events.');
    this.meta.setTag('twitter:description', 'Check out the latest videos from the events attended or hosted by Arnie Fonseca. This gallery is updated after each event, so you can regularly check it for the videos from the latest events.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca Videos, Arnie Fonseca Event Videos, Videos Of Arnie Fonseca');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca Videos, Arnie Fonseca Event Videos, Videos Of Arnie Fonseca');

    this.meta.setTag('og:title', 'Arnie Fonseca - Video Gallery');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Video Gallery');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
   }

  ngOnInit() {}

}

    