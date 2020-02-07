import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-couples-counseling',
  templateUrl: './couples-counseling.component.html',
  styleUrls: ['./couples-counseling.component.css']
})
export class CouplesCounselingComponent implements OnInit {

  constructor(private readonly meta: MetaService) {
    this.meta.setTitle('Arnie Fonseca - Couples Counseling Program');
    this.meta.setTag('og:description', 'Allow your relationship with your partner or spouse to thrive by getting rid of the many nuances, with the help of Arnie Fonseca’s Couples Counseling Program, and enjoy a fulfilling relationship.');
    this.meta.setTag('twitter:description', 'Allow your relationship with your partner or spouse to thrive by getting rid of the many nuances, with the help of Arnie Fonseca’s Couples Counseling Program, and enjoy a fulfilling relationship.');

    this.meta.setTag('og:keyword', 'Couples Counseling Program, Counseling For Couples, Counseling Program For Couples');
    this.meta.setTag('twitter:keyword', 'Couples Counseling Program, Counseling For Couples, Counseling Program For Couples');

    this.meta.setTag('og:title', 'Arnie Fonseca - Couples Counseling Program');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Couples Counseling Program');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
   }

  ngOnInit() {
  }

}
