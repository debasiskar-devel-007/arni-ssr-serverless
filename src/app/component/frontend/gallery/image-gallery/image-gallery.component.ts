import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {

  constructor(private readonly meta: MetaService) { 
    this.meta.setTitle('Arnie Fonseca - Image Gallery');
    this.meta.setTag('og:description', 'Check out the latest images and pictures of Arnie Fonseca and the events he has attended. This gallery is updated after each event, so you can regularly check it for the images of the latest events.');
    this.meta.setTag('twitter:description', 'Check out the latest images and pictures of Arnie Fonseca and the events he has attended. This gallery is updated after each event, so you can regularly check it for the images of the latest events.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca Images, Arnie Fonseca Event Pictures, Arnie Fonseca Pictures');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca Images, Arnie Fonseca Event Pictures, Arnie Fonseca Pictures');

    this.meta.setTag('og:title', 'Arnie Fonseca - Image Gallery');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Image Gallery');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
  }

  ngOnInit() {
  }

}
