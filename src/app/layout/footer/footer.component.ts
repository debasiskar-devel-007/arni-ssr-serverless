import { Component, OnInit, HostListener, Inject, ViewChild  } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import  {ApiService} from '../../api.service';
import {CookieService} from "ngx-cookie-service";


export interface DialogData {}


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    myform :FormGroup;
  windowScrolled: boolean;
  public data:any;
  public serverUrl:any;
  // public tokenViaCookie : any;

  public  name: string;
  navbarOpen = false;


  constructor(public router: Router, public route: ActivatedRoute, public dialog: MatDialog, public formbuilder: FormBuilder, public apiService: ApiService, public activeroute: ActivatedRoute, public cookie: CookieService) {

    // console.log(router.url);
      this.serverUrl = apiService.serverUrl;
    //   console.log("souresh",this.serverUrl);
      this.myform = this.formbuilder.group({
          email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],

      })
  /*    this.setvalue();
      console.log("souftrgsuhdfkjshifh",this.myform.controls['email'].value);*/





    
   }



   termscondition() {
    const dialogRef = this.dialog.open(DialogTermsDialog,{
       panelClass:'footewrmoadbox',
    });

    dialogRef.afterClosed().subscribe(result => {
     
      // console.log(`Dialog result: ${result}`);
    });
  }

  privacypolicy() {
    const dialogRef = this.dialog.open(DialogPrivacyDialog,{
      panelClass:'footewrmoadbox',

    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

   @HostListener("window:scroll", [])

   onWindowScroll() {
       if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
           this.windowScrolled = true;
       }
       else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
           this.windowScrolled = false;
       }
   }

   scrollToTop() {
    (function smoothscroll() {

        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }

    })();
}

  ngOnInit() {
    this.router.events.subscribe(() =>
          window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
          })
      );
  }


  inputUntouch(form: any, val: any) {
    console.log('on blur .....');
    form.controls[val].markAsUntouched();
  }

    doSubmit() {
        // console.log('ok');
        // this.data = this.myform.value;
        // console.log(this.data);

        this.data = this.myform.get('email').value;

        this.cookie.set('email_modal',this.data);


       

        for (let i in this.myform.controls) {
            this.myform.controls[i].markAsTouched();
        }
        if (this.myform.valid) {
            this.newslatterViewModal(this.data);
           let link = '';
            let data = {data: this.myform.value};
            this.apiService.postdata(data).subscribe(res => {

                    let result: any = {};
                    result = res;
                    // console.log(result);
                    if (result.status == 'success') {
                      /*  this.newslatterViewModal();*/
                        this.myform.reset();
                        // this.opencontactDialog();
                       /* const dialogRef = this.dialog.open(SubmitpopupComponent);*/

                        // this.inputUntouch(this.myform,'email');

                        this.myform.controls['email'].updateValueAndValidity();

                    }
                })

        }

    }
   /* setvalue(){
      this.myform.controls['email'].patchValue(this.myform.value);
    }*/




/*Newslatter modal */

newslatterViewModal(deta:any){

    const dialogGenreRef = this.dialog.open(NewslatterDialogComponent, {
      panelClass: ['modal-sm', 'infomodal'],
      //disableClose: true,
      //data: {name:'testname', email:deta.email, phone:'999999999', company:'companyname'}
    });

    dialogGenreRef.afterClosed().subscribe(result => {
    });

  }

  openDialogfooter(): void {
    const dialogRef = this.dialog.open(comingSoonDialogfooter, {
     
      // data: {name: this.name}
    });

    setTimeout(() => {
      this.dialog.closeAll();
    }, 4000);
  }


}

 
@Component({
    selector: 'terms-dialog',
    templateUrl: 'terms-dialog.html',
  })
  export class DialogTermsDialog {}


  
@Component({
    selector: 'privacy-dialog',
    templateUrl: 'privacy-dialog.html',
  })
  export class DialogPrivacyDialog {}

// newslatter dialog component

@Component({
  selector: 'newslatter-dialog',
  templateUrl: 'newsletter-dialog.html',
})
export class NewslatterDialogComponent {

    

public myformnews: FormGroup

 public serverUrl:any;
public tokenViaCookie :any;
constructor(public dialogRef: MatDialogRef<NewslatterDialogComponent>,

   @Inject(MAT_DIALOG_DATA) public data: DialogData, public formbuilder:FormBuilder, public dialog:MatDialog, public apiService: ApiService,public cookie : CookieService ) {
    this.serverUrl = apiService.serverUrl;
    this.tokenViaCookie = cookie.get('jwtToken');
    this.myformnews = this.formbuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
        fullname: ['', Validators.required],
        phone: ['', Validators.required],
        company: ['', Validators.required],
        group: ['',],

    })

// this.myformnews.value.email.setvalue();
    this.myformnews.patchValue({
        email: this.cookie.get('email_modal'),
        

    });

    this.myformnews.patchValue({
        "group":"0"

       });

}

    inputUntouch(form: any, val: any) {
        console.log('on blur .....');
        form.controls[val].markAsUntouched();
    }


  public onNoClick(): void {
    this.dialogRef.close();
  }


 

    donewsSubmit() {

        console.log('ok');
        this.data = this.myformnews.value;
        console.log(this.data);


        for (let i in this.myformnews.controls) {
            this.myformnews.controls[i].markAsTouched();
        }
        if (this.myformnews.valid) {

            this.newslattersuccessViewModal();

            setTimeout(()=>{
                this.onNoClick();

            },2000);

            // let  link = this.serverUrl +;
            let data = {
                source:"subscriberList",
                token : this.tokenViaCookie,
                data: this.myformnews.value
            };
                this.apiService.addDataWithoutToken(data,'addorupdatedata').subscribe(res => {


                let result: any = {};
                result = res;
                console.log(res);
                if (result.status == 'success') {

                    this.myformnews.reset();


                    this.myformnews.controls['email'].updateValueAndValidity();
                    this.myformnews.controls['fullname'].updateValueAndValidity();
                    this.myformnews.controls['phone'].updateValueAndValidity();
                    this.myformnews.controls['company'].updateValueAndValidity();
                    this.myformnews.controls['group'].updateValueAndValidity();



                }


            })

        }

    }



    newslattersuccessViewModal(){

        const dialogGenreRef = this.dialog.open(NewslattersuccessDialogComponent, {
            panelClass: ['modal-sm', 'infomodal'],
            //disableClose: true,
        });

        dialogGenreRef.afterClosed().subscribe(result => {
        });
        setTimeout(function(){
            dialogGenreRef.close();
        }, 2000);
    }
}




// newslatter success dialog component
@Component({
    selector: 'newslatter-success-dialog',
    templateUrl: 'newsletter-success-dialog.html',
})
export class NewslattersuccessDialogComponent {

    public myformnews: FormGroup

    constructor(public dialogRef: MatDialogRef<NewslattersuccessDialogComponent>,
                /* @Inject(MAT_DIALOG_DATA) public data: DialogData*/) {}

    public onNoClick(): void {
        this.dialogRef.close();
    }

}



@Component({
  selector: 'coming',
  // templateUrl: './coming-soon.html',
  template: `
  <div class="comingwrapper">
   <img src="../../assets/images/logo.png"> 
  <h2>coming soon</h2>
  </div>
  `
})
export class comingSoonDialogfooter {

  constructor(
    public dialogRef: MatDialogRef<comingSoonDialogfooter>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
