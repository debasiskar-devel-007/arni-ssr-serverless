import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment'; // add this 1 of 4
import { ApiService } from '../../../api.service';
import { MetaService } from '@ngx-meta/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { FacebookService, UIParams, UIResponse, LoginResponse } from 'ngx-facebook';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface DialogData { data: any; }
import { CookieService } from 'ngx-cookie-service';
import { FileUploader } from 'ng2-file-upload';
import { AudioService } from '../../../services/audio.service';
import { ViewChild}from '@angular/core';
import * as RecordRTC from 'recordrtc';

export interface DialogDataTestimonial { details: any; }

@Component({
  selector: 'app-tesimoniallist',
  templateUrl: './tesimoniallist.component.html',
  styleUrls: ['./tesimoniallist.component.css']
})
export class TesimoniallistComponent implements OnInit {
  private indexvallength: any;
  public TestimonialListArray: any = [];

  // showMore = false;
  showme = true;
  public indexval: any = 6;
  public dataformate: any;
  public p_id: any;
  public profile: any;

  safeSrc: SafeResourceUrl;



  copyText(val: any) {
    //console.log('copyText');
  }

  constructor(public Cookie: CookieService, public _snackBar: MatSnackBar, private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService, private readonly meta: MetaService, private sanitizer: DomSanitizer, public dialog: MatDialog, private facebook: FacebookService) {

    this.meta.setTitle('Arnie Fonseca - Testimonials');


    this.dataformate = moment();


    facebook.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });
  }



  ngOnInit() {

    if (this.activatedRoute.snapshot.params.id == null) {
      this.activatedRoute.data.forEach(data => {
        let result: any = {};
        result = data.testimonialListData.res;
        // console.warn(result);
        this.TestimonialListArray = result;
        this.indexvallength = this.TestimonialListArray.length;
      })



      this.meta.setTag('og:description', 'Check out what Coach Arnie’s students, clients and other people from the Personal Development Industry have to say about him and the many programs that he offers.');
      this.meta.setTag('twitter:description', 'Check out what Coach Arnie’s students, clients and other people from the Personal Development Industry have to say about him and the many programs that he offers.');

      this.meta.setTag('og:keyword', 'Arnie Fonseca Reviews, Arnie Fonseca Testimonials, Arnie Fonseca Customer Reviews');
      this.meta.setTag('twitter:keyword', 'Arnie Fonseca Reviews, Arnie Fonseca Testimonials, Arnie Fonseca Customer Reviews');

      this.meta.setTag('og:title', 'Arnie Fonseca - Testimonials');
      this.meta.setTag('twitter:title', 'Arnie Fonseca - Testimonials');

      this.meta.setTag('og:type', 'website');

      this.meta.setTag('og:image', 'https://arniefonseca.influxiq.com/assets/images/logo.png');
      this.meta.setTag('twitter:image', 'https://arniefonseca.influxiq.com/assets/images/logo.png');
    }

    else {

      this.activatedRoute.data.forEach(data => {
        let result: any = {};
        result = data.testimonialListData.testimonial_list;
        // console.warn(result);
        this.TestimonialListArray = result;
        this.indexvallength = this.TestimonialListArray.length;
      })

      for (let item in this.TestimonialListArray) {
        if (this.activatedRoute.snapshot.params.id == this.TestimonialListArray[item]._id) {
          //console.log('???', this.TestimonialListArray[item])
          this.meta.setTag('og:title', 'arniefonseca - Testimonials ' + this.TestimonialListArray[item].name);
          this.meta.setTag('twitter:title', 'arniefonseca - Testimonials' + this.TestimonialListArray[item].name);
          this.meta.setTag('og:image', this.TestimonialListArray[item].testimonial_img);
          this.meta.setTag('twitter:image', this.TestimonialListArray[item].testimonial_img);
          this.meta.setTag('og:description', this.TestimonialListArray[item].description);
          this.meta.setTag('twitter:description', this.TestimonialListArray[item].description);
          this.meta.setTag('og:url', 'http://arniefonseca.influxiq.com/testimonial/' + this.TestimonialListArray[item]._id);
          this.meta.setTag('twitter:url', 'http://arniefonseca.influxiq.com/testimonial/' + this.TestimonialListArray[item]._id);
        }
      }
    }


  }




  detailsView(val: any) {
    //console.log(val)

    this.router.navigateByUrl('/testimonial/' + val._id)
  }



  btnBackClick = function () {
    this.router.navigateByUrl('testimonial');
  };

  testimonialloadmore() {
    this.indexval = this.indexval + 3;
    // console.log(this.indexval);
  }

  showmore(index: any) {
    this.p_id = index._id;
  }

  showaudio() {
    // console.log('showaudio function is wirking')
  }

  showvideo() {
    //console.log('showvideo function is wirking')
  }

  //*********view Video modal section***********//

  openvideourl(val: any) {
    //console.warn(val);
    let url: any;
    url = "https://www.youtube.com/embed/";
    // console.log('video url....>',url+val);
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url + val);

    // console.log('>>>>>>>>>>>>>>>>>>',this.safeSrc)
    const dialogRef = this.dialog.open(CommonTestimonialVideoModalComponent, {
      panelClass: 'blogdetail_videomodal',
      data: this.safeSrc,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  //********* end Video modal section***********//
  /**audio modal */
  openAudioUrl(aud: any) {
    // console.log(aud.testimonial_audio);
    const dialogRef = this.dialog.open(CommonTestimonialAudioModalComponent, {

      panelClass: 'blogdetail_audiomodal',
      data: aud.testimonial_audio,

    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  /**Submit Review modal */
  openReviewUrl() {
    if (this.Cookie.check('user_details') == true) {
      const dialogRef = this.dialog.open(timonialreviewmodal, {
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    } else {

      this.openDialog();

    }
  }

  /*******************Open Login Modal ********************************/
  openDialog(): void {
    const dialogRef = this.dialog.open(Dialoglogin, {
      panelClass: 'Login_confirm',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  /***************************************************** */


   /************************detail***************************** */

  openDialogDetail(testmon:any): void {
    const dialogRef = this.dialog.open(testimonial_detail, {
      panelClass: 'Login_confirm',
      data: { details: testmon },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }



  //facebook share for event

  login() {
    this.facebook.login()
      .then((res: LoginResponse) => {

        this.getProfile();
      })
      .catch();
  }
  getProfile() {
    this.facebook.api('me/?fields=id,name,email,picture')
      .then((res: any) => {

        this.profile = res;

      })
      .catch((error: any) => {

      });
  }



  // testimonial share 

  fbTestimonialShare(val: any) {
    //console.log(val)
    var url = 'https://arniefonseca.influxiq.com/testimonial/' + val._id;
    //console.log(url)

    let params: UIParams = {
      href: url,
      method: 'share'
    };
    this.facebook.ui(params).then((res: UIResponse) => {
    }).catch(facebook => {
      // console.log(facebook)
    });
  }

  twitterTestimonialShare(val: any) {
    window.open('https://twitter.com/intent/tweet?url=https://arniefonseca.influxiq.com/testimonial/' + val._id);
  }


  linkedinTestimonialShare(val: any) {

    window.open('https://www.linkedin.com/shareArticle?mini=true&url=https://arniefonseca.influxiq.com/testimonial/' + val._id);

  }

  tumblrTestimonialShare(val: any) {
    window.open('http://www.tumblr.com/share?url=https://arniefonseca.influxiq.com/testimonial/' + val._id);

  }


}

//**********video modal component************//

@Component({
  selector: 'app-commontestimonialvideomodal',
  templateUrl: './commontestimonialvideomodal.html'
})
export class CommonTestimonialVideoModalComponent {
  constructor(public dialogRef: MatDialogRef<CommonTestimonialVideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}

//**********Audio modal component************//

@Component({
  selector: 'app-commontestimonialaudiomodal',
  templateUrl: './commontestimonialaudiomodal.html'
})
export class CommonTestimonialAudioModalComponent {
  constructor(public dialogRef: MatDialogRef<CommonTestimonialAudioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    //console.log(data);
  }
}





//********** Submit Review modal component************//
const uploadAPI = 'http://127.0.0.1:8000/api/upload';


@Component({
  selector: 'timonialreviewmodal',
  templateUrl: './timonialreviewmodal.html'
})
export class timonialreviewmodal implements OnInit{
  public stream: MediaStream;
  public recordRTC: any;
  @ViewChild('video',{static:false}) video;

  public audio: boolean = false;
  public vdo:boolean=false;
  public serverData: any;
  public videoserverData:any;
  public testimonialReviewForm: FormGroup;
  isRecording = false;
  recordedTime;
  public blobUrl: any;
  public blobUrl1: any;
  public fileUploadProgress: string = null;
  public uploadButton:boolean=false;
  public downloadButton:boolean=false;
  public configData: any = {
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format: ["jpg", "jpeg", "png"], // use all small font
    type: "testimonial-review-image",
    path: "testimonial",
    prefix: "tesindexvaltimonial-review_",
    formSubmit: false,
    conversionNeeded: 0,
    bucketName: "crmfiles.influxhostserver"
  }

  constructor(public activatedRoute: ActivatedRoute, public audioService: AudioService, public _snackBar: MatSnackBar, public sanitizer: DomSanitizer, public formBuilder: FormBuilder, public api: ApiService, public dialogRef: MatDialogRef<timonialreviewmodal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    //console.log(data);
    this.audioService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.blobUrl1 = data;
      //console.log('====================', this.blobUrl1);
    });
    //genarete form
    this.testimonialReviewForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      // review:[null,[Validators.required]],
      testimonial_img: [],
      description: [null, [Validators.required]],
      testimonial_audio: [null],
      video_url:[null],
      video_name:[null],
      video_desc:[null],
      youtubefilename:[null],
      flag: ["review"],
      priority: 0,
      status: 3
    });
  }

  openaudio() {
    this.audio = true;
  }
  openVideo(){
    this.vdo=true;
  }
  /**audio recording here */
  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });

  ngOnInit() {
    this.abortRecording();
   
    setTimeout(()=>{   
      // set the initial state of the video
      let video:HTMLVideoElement = this.video.nativeElement;
      video.muted = false;
      video.controls = true;
      video.autoplay = false;
 }, 3000);
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioService.startRecording();
    }
  }
  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }
  /**file upload */
  onClick() {
    let url = "https://fileupload.influxhostserver.com/uploads?path=audio&prefix=audio"
    const formData = new FormData();
    formData.append('file', this.blobUrl1.blob);
    formData.append('bucketname', 'testimonial-assets');
    this.fileUploadProgress = '0%';

    this.api.audioUpload(url, formData)
      .subscribe((events: any) => {
        if (events.status == "success") {
          this.serverData = events;
        }
      })

  }
  /**audio record end here */


/**video recording start here */
toggleControls() {
  let video: HTMLVideoElement = this.video.nativeElement;
  video.muted = !video.muted;
  video.controls = !video.controls;
  video.autoplay = !video.autoplay;
}

successCallback(stream: MediaStream) {

  var options = {
    mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 128000,
    bitsPerSecond: 128000 // if this line is provided, skip above two
  };
  const mediaStream = new MediaStream();
  this.stream = stream;
  this.recordRTC = RecordRTC(stream, options);
  //console.log('++++++++++',this.recordRTC);
  this.recordRTC.startRecording();
  let video: HTMLVideoElement = this.video.nativeElement;
  video.srcObject = mediaStream;
  this.toggleControls();
}
errorCallback() { 
  //handle error here
}
processVideo(audioVideoWebMURL) {
  let video: HTMLVideoElement = this.video.nativeElement;
  let recordRTC = this.recordRTC;
  video.src = audioVideoWebMURL;
  this.toggleControls();
  var recordedBlob = recordRTC.getBlob();
  // console.log('++++++++++++',recordedBlob);
  recordRTC.getDataURL(function (dataURL) { });
}
recordingData() {
  let video: HTMLVideoElement = this.video.nativeElement;
  var mediaConstraints = {
    audio: true,
    video: {
      width: 1000,
      height: 420
  }
  };
  // let stream = this.stream;
  navigator.mediaDevices
    .getUserMedia(mediaConstraints)
    // .then(this.successCallback.bind(this), this.errorCallback.bind(this));
    .then(this.successCallback.bind(this),this.errorCallback.bind(this))

}

startVideoRecording() {
  let video: HTMLVideoElement = this.video.nativeElement;
  var mediaConstraints = {
    audio: true,
    video: {
      width: 510,
      height: 620
  }
  };
  // let stream = this.stream;
  this.recordingData();
   navigator.mediaDevices.getUserMedia(mediaConstraints).then(function success(stream) {
    video.srcObject = stream;
    stream.getTracks().forEach(function(track) {
        console.log(track.getSettings());
    })
});

}

stopVideoRecording() {
 
  // this.successCallback.bind(this)
  let recordRTC = this.recordRTC;
  recordRTC.stopRecording(this.processVideo.bind(this));
  let stream = this.stream;
stream.getAudioTracks().forEach(track => track.stop());
stream.getVideoTracks().forEach(track => track.stop());
this.downloadButton=true;
this.uploadButton=true;
}

download() {
  this.recordRTC.save('video.webm');
}
videoUpload(){

  let url = "https://fileupload.influxhostserver.com/uploads?path=video&prefix=video"
  let recordRTC = this.recordRTC;
  const formData = new FormData();
  formData.append('file', recordRTC.getBlob());
  formData.append('bucketname','testimonial-assets');


  this.api.audioUpload(url, formData)
    .subscribe((events: any) => {
     //console.log("video upload",events)
     if (events.status == "success") {
      this.videoserverData = events.data.fileservername;
    }
    })
}



  /**submit Function */
  submitfunction() {
    //console.warn(this.testimonialReviewForm.value)

    for (let x in this.testimonialReviewForm.controls) {
      this.testimonialReviewForm.controls[x].markAsTouched();
    }

    if (this.testimonialReviewForm.valid) {
      // Image File Upload Works 
      if (this.configData.files) {
        this.testimonialReviewForm.value.testimonial_img =
        {
          "basepath": this.configData.files[0].upload.data.basepath + '/' + this.configData.path + '/',
          "image": this.configData.files[0].upload.data.data.fileservername,
          "name": this.configData.files[0].name,
          "type": this.configData.files[0].type
        };
      }
      /**record audio save in database */
      if (this.serverData!=null) {
      this.testimonialReviewForm.value.testimonial_audio = {
        "basepath": this.serverData.basepath + '/audio/',
        "audio": this.serverData.data.fileservername,
        "name": this.serverData.data.fileservername,
        "type": "audio",
      };
    }
      this.testimonialReviewForm.value.youtubefilename=this.videoserverData;


      //api submit function
      let postData: any = {
        "source": 'testimonial',
        "data": this.testimonialReviewForm.value
      }
      //console.warn(postData);
      this.api.CustomRequest(postData, 'testimonialaddandreview').subscribe((res: any) => {
        //console.warn(res);
        if (res.status == "success") {
          this.testimonialReviewForm.reset();
          this._snackBar.open('Review Submitted Successfully', '', {
            duration: 2000,
          });
          this.dialogRef.close();
        }
      })
    }
  }
  /** blur function **/
  inputBlur(val: any) {
    this.testimonialReviewForm.controls[val].markAsUntouched();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

/** Login Modal*/
@Component({
  selector: 'Dialoglogin',
  templateUrl: 'login.html',
  // styleUrls: ['./inventory.component.css']
})
export class Dialoglogin {

  constructor(
    public dialogRef: MatDialogRef<Dialoglogin>, public router: Router,
    @Inject(MAT_DIALOG_DATA) public DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  acceptToLoginPage() {
    this.router.navigateByUrl('/login' + this.router.url);
    this.onNoClick();
  }

}




@Component({
  selector: 'testimonial_detail',
  templateUrl: 'testimonial_detail.html',
})
export class testimonial_detail {

  public detailsView:any;
  public testmon:any;

  constructor(
    public dialogRef: MatDialogRef<testimonial_detail>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataTestimonial) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}