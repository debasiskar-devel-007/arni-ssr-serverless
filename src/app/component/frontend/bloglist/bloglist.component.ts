import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatAccordion, MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../api.service';
import { MetaService } from '@ngx-meta/core';
import { Title } from '@angular/platform-browser';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NestedTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, observable, of as observableOf } from 'rxjs';

import { FacebookService, UIParams, UIResponse, LoginResponse } from 'ngx-facebook';

export interface DialogData {data: any;} 

export class FileNode{
  children: FileNode[];
  filename: string;
  type:any;
}

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css']
})
export class BloglistComponent implements OnInit {

  public blogList: any=[];
  public blogCategory:any;
  public blogcount:any;
  public blogcategorysearch:any;
  public blogcategorycount:any;
  public blogcat:any;
  public blogsubcategorycount:any;
  public count:any=0;
  public indexval:any=4;
  public bloglisting:any=[];
  public videourl:any='';
  public dataformate: any;
  public p_id: any;
  public profile: any;
  public url:"https://www.youtube.com/embed/"
  public catBlogs:any=[];

  
  
  safeSrc: SafeResourceUrl;


  @ViewChild('myaccordion', { static: false }) myPanels: MatAccordion;

  openAll(){
    this.myPanels.openAll();
  }
  closeAll(){
    this.myPanels.closeAll();
  }

  copyText(val:any){
    console.log('copyText');
  }
  /*------------TREE NESTEDDATA-----*/

  public nestedTreeControl: NestedTreeControl<FileNode>;
  public blogCategoryDataSource:MatTreeNestedDataSource<FileNode>;
  public dataChange:BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);

  /*------------TREE NESTEDDATA-----*/

  constructor(private readonly meta: MetaService, private readonly title: Title, private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService, public apiService: ApiService,private sanitizer: DomSanitizer,public dialog:MatDialog, private facebook:FacebookService) {
    facebook.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });
    this.meta.setTitle('Arnie Fonseca - Blogs');
    this.meta.setTag('og:description', 'Check out the latest blogs by “Coach Arnie” about everything that is happening in the Personal Development industry and learn of the best ways to improve your lives and achieve success.');
    this.meta.setTag('twitter:description', 'Check out the latest blogs by “Coach Arnie” about everything that is happening in the Personal Development industry and learn of the best ways to improve your lives and achieve success.');

    this.meta.setTag('og:keyword', 'Arnie Fonseca Blogs, Personal Development Blogs, Blogs on Personal Development');
    this.meta.setTag('twitter:keyword', 'Arnie Fonseca Blogs, Personal Development Blogs, Blogs on Personal Development');

    this.meta.setTag('og:title', 'Arnie Fonseca - Blogs');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Blogs');

    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');


      /*------------TREE NESTEDDATA-----*/
    this.nestedTreeControl = new NestedTreeControl<FileNode> (this._getChildren);
    this.blogCategoryDataSource = new MatTreeNestedDataSource();

    this.dataChange.subscribe(data => this.blogCategoryDataSource.data = data);

    this.dataChange.next([
      {
        filename: "test",
        type: "",
        children:[
          {
            filename: "test3",
            type: "exe",
            children: [],
          }
        ],
      },
      {
        filename: "test2",
        type: "exe",
        children:[],
      },
    ]);
   }

   private _getChildren = (item: FileNode) => { return observableOf(item.children); };
   hasNestedChild = (_: number, nodeData: FileNode) => { return ! (nodeData.type); };

     /*------------TREE NESTEDDATA-----*/
     

panelOpenState = false;

//***********blog list view in blog detail************//
  blogdetail(val:any){
    //console.log(val)
    let title=val.blogtitle.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    this.router.navigateByUrl('/blogdetail/'+title+'/'+val._id)
  }
  

  ngOnInit() {

    //**all blog category and blog list from resolve in routing**//

    this.activatedRoute.data.forEach((data: any) => {
     
      this.blogList = data;
      //console.log('>>>>>>>>>>>>>>',this.blogList)

    })


    
    
   //****total blog list****//
          this.bloglisting = this.blogList.blogCatList.blogs
         // console.log('---------------',this.bloglisting)
        
          // console.log('++++++++++++++++++',this.blogcategory)

    /**api service for blog_catagory total count by uttam */  
          this.blogcategorycount = this.blogList.blogCatList.blog_category;
          //console.log('>>>>>>>>>>>>>>>>>',this.blogcategorycount)
}

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

fbTestimonialShare(val:any){
  //console.log(val)
  var url='https://arniefonseca.influxiq.com/blog/'+ val._id;
  //console.log(url)

  let params: UIParams = {
    href: url,
    method: 'share'
  };
  this.facebook.ui(params).then((res:UIResponse)=>{
  }).catch(facebook=>{
    // console.log(facebook)
  });
}

twitterTestimonialShare(val:any){
  window.open('https://twitter.com/intent/tweet?url=arniefonseca.influxiq.com/blog/'+ val._id);
}


linkedinTestimonialShare(val:any){

  window.open('https://www.linkedin.com/sharing/share-offsite/?url=arniefonseca.influxiq.com/blog/'+ val._id);

}

tumblrTestimonialShare(val:any){
  window.open('http://www.tumblr.com/share?url=arniefonseca.influxiq.com/blog/'+ val._id);

}

/**total blog Searchlist*/  
titleSearchblogListFilter(filterValue: string) {
  this.bloglisting.filter = filterValue.trim().toLowerCase();
  //console.log('---kb---', this.bloglisting.filter);
}

/**total blog Categorylist*/  
titleSearchCategoryFilter(filterValue: string) {
    this.blogCategory.filter = filterValue.trim().toLowerCase();
  //console.log('---kb---', this.bloglisting.filter);
}



  /** end api service for blog_catagory total count by uttam */

    //*********view Video modal section***********//

    openvideourl(val:any){

     let url:any;
     url="https://www.youtube.com/embed/";
      // console.log('video url....>',url+val);
      this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(url + val);
      
      // console.log('>>>>>>>>>>>>>>>>>>',this.safeSrc)
      const dialogRef = this.dialog.open(CommonVideoModalComponent, {
        panelClass:['modal-md','success-modal'],       
        width:'450px',
        data:this.safeSrc, 
      });
      dialogRef.afterClosed().subscribe(result => {  
      });
    }

//********* end Video modal section***********//

//*********** sub blog list view in blog detail************//
    blog(val:any){
      this.blogcat = val._id;
      // this.router.navigateByUrl('/blogdetail/'+val._id)
    }

//*********** end sub blog list view in blog detail************//


//***********load more view blog *************//
    blogloadmore(){
      let data: any = {};
    // if(this.blogCat==''){
    data={
      "condition": {
        "limit": 10,
        "skip": this.indexval
      }
    }
  // }
    // }else{

    //   data={
    //     endpoint: 'loadmoreblogdata',
    //     "condition": {
    //       "limit": 10,
    //       "skip": this.indexval,
    //       "catid":this.blogCat
    //   }
    // }

    // }
    this.apiService.CustomRequest(data,'loadmoreblogdata').subscribe((res:any)=>{
      // if(res.blogs.length > 0){
        //console.log(res);
        this.bloglisting = this.bloglisting.concat(res.blogs);
        // this.indexval = this.indexval + 10;
      // }else{
      //   this.highLoadMore=true;
      // }
      
    })
    }
    getAllBlogs(val:any) {
      // console.log("clicked",val);
      let data: any = {
        "blogcat":val
      }
  
      this.apiService.CustomRequest(data,"getbloglistbycategoryid").subscribe((result: any) => {
  
        this.catBlogs = result.results.blogs;
        // console.log("hiiitt",this.catBlogs.length);
  
        // this.bloglisting = result.res;
        // console.log("yy",this.allBlogs);
      });
    }
    //**blog view from blog category list**//
    openblog(val:any){
      console.log(val)
    }
}




//**********video modal component************//
@Component({
  selector:'app-commonvideomodal',
  templateUrl:'./commonvideomodal.html'
})
export class CommonVideoModalComponent {
  constructor( public dialogRef: MatDialogRef<CommonVideoModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData){
  }
}

