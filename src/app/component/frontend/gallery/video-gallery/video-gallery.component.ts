import { Component, OnInit, Inject } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Route } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';

export interface DialogData {
  data: any;
}


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
  public videoDataList: any;
  public video_url: any = 'https://www.youtube.com/embed/';
  public safeUrl: any;
  public safeSrc: any;
  constructor(private readonly meta: MetaService, public activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer, public dialog: MatDialog) {
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

  ngOnInit() {
    this.activatedRoute.data.forEach(res => {
      let result: any;
      result = res;
      this.videoDataList = res.videoGallery.res;
      // console.log(this.videoDataList, '+++++')


    })


    for (let i in this.videoDataList) {
      let result: any;
      result = this.videoDataList[i].video;
      // console.log('  this.safeUrl', result);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video_url + result);
      this.videoDataList[i].safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video_url + result);
      // console.log('  this.safeUrl', this.safeUrl);


    }


  }

  openVideoModal(val: any) {
    // console.log('>>>>', val)

    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.video_url + val);

    //console.log('>>>>>>>>>>>>>>>>>>',this.safeSrc)
    const dialogRef = this.dialog.open(VideoGalleryModalComponent, {
      // panelClass:['modal-md','success-modal'],
      panelClass: 'blogdetail_videomodal',
      // width:'450px',
      data: this.safeSrc,



    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }


}





//video modal
@Component({
  selector: 'app-videoModal',
  templateUrl: './videoModal.html'
})
export class VideoGalleryModalComponent {
  constructor(public dialogRef: MatDialogRef<VideoGalleryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}

