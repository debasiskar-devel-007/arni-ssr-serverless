import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-special-programs-for-young-men',
  templateUrl: './special-programs-for-young-men.component.html',
  styleUrls: ['./special-programs-for-young-men.component.css']
})
export class SpecialProgramsForYoungMenComponent implements OnInit {

  constructor(private readonly meta: MetaService) { 
    this.meta.setTitle('Arnie Fonseca - Special Programs For Young Men');
    this.meta.setTag('og:description', 'Allow your child to learn and grow within the protected environment of your home with Arnie Fonseca’s Special Programs For Young Men with custom subjects, lessons, and assessment methods.');
    this.meta.setTag('twitter:description', 'Allow your child to learn and grow within the protected environment of your home with Arnie Fonseca’s Special Programs For Young Men with custom subjects, lessons, and assessment methods.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca’s Special Programs For Young Men, Special Programs For Young Men By Coach Arnie, K12 Education For Young Ones');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca’s Special Programs For Young Men, Special Programs For Young Men By Coach Arnie, K12 Education For Young Ones');

    this.meta.setTag('og:title', 'Arnie Fonseca - Special Programs For Young Men');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Special Programs For Young Men');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
  }

  ngOnInit() {
  }

}
