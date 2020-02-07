import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bk-footer',
  templateUrl: './bk-footer.component.html',
  styleUrls: ['./bk-footer.component.css']
})
export class BkFooterComponent implements OnInit {

  public user_data: any;
  constructor(public router: Router, public cookieService: CookieService, public activeroute: ActivatedRoute) {
    // this.user_data = JSON.parse(this.cookieService.get('user_details'))
    // console.log(this.user_data)
   }

  ngOnInit() {
  }

}
