import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../environments/environment';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'arni-ssr';
  public loading: boolean = false;
public ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
        const bases = this.document.getElementsByTagName('base');

        if (bases.length > 0) {
            bases[0].setAttribute('href', environment.baseHref);
        }
    }
}


 constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: any, public router: Router) {
   // console.log('URL'+this.router.url);
   this.router.events.subscribe((event:Event) =>{
    switch(true){
      case event instanceof NavigationStart:{
        this.loading = true;
        break;

      }

      case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:

        case event instanceof NavigationEnd:

       case event instanceof NavigationError:{

        this.loading = false;
        break;

       }

       default:{
        break;

       }

      }

    });
 }
}
