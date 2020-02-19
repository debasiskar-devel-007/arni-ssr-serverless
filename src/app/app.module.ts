import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { DemoMaterialModule } from "../material-module";


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { LoginModule } from 'login-lib-influxiq';
import { ContactusModule } from 'contactus-lib-influxiq';
/**Frontend Component**/
import { FacebookModule } from 'ngx-facebook';

import { LoginComponent } from './component/frontend/login/login.component';
import { HeaderComponent, comingSoonDialog } from './layout/header/header.component';
import { FooterComponent, DialogTermsDialog, DialogPrivacyDialog, NewslatterDialogComponent, NewslattersuccessDialogComponent, comingSoonDialogfooter} from './layout/footer/footer.component';
import { HomeComponent } from './component/frontend/home/home.component';
import { ContactusComponent } from './component/frontend/contactus/contactus.component';
import { ForgetPasswordComponent } from './component/frontend/forget-password/forget-password.component';
import { ResetPasswordComponent } from './component/frontend/reset-password/reset-password.component';
import { SignUpComponent } from './component/frontend/sign-up/sign-up.component';
import { BlogComponent } from './component/frontend/blog/blog.component';
import { BloglistComponent,  CommonVideoModalComponent} from './component/frontend/bloglist/bloglist.component';
import { BlogdetailComponent, VideoModalComponent } from './component/frontend/blogdetail/blogdetail.component';
import { AboutusComponent } from './component/frontend/aboutus/aboutus.component';
import { ServiceComponent } from './component/frontend/service/service.component';
import { ServicelistComponent } from './component/frontend/services/servicelist/servicelist.component';
import { TesimonialComponent } from './component/frontend/tesimonial/tesimonial.component';
import { TesimoniallistComponent, CommonTestimonialVideoModalComponent } from './component/frontend/tesimoniallist/tesimoniallist.component';
import { EmployeeTrainingComponent } from './component/frontend/services/employee-training/employee-training.component';
import { CouplesCounselingComponent } from './component/frontend/services/couples-counseling/couples-counseling.component';
import { PersonalDevelopmentCoachingComponent } from './component/frontend/services/personal-development-coaching/personal-development-coaching.component';
import { HighPerformanceCoachingComponent } from './component/frontend/services/high-performance-coaching/high-performance-coaching.component';
import { SpecialProgramsForYoungMenComponent } from './component/frontend/services/special-programs-for-young-men/special-programs-for-young-men.component';
import { ImageGalleryComponent } from './component/frontend/gallery/image-gallery/image-gallery.component';
import { VideoGalleryComponent } from './component/frontend/gallery/video-gallery/video-gallery.component';
import { TeamComponent } from './component/frontend/team/team.component';
import { SeminarsComponent } from './component/frontend/events/seminars/seminars.component';
import { SeminarsDetailComponent } from './component/frontend/events/seminars-detail/seminars-detail.component';
import { WorkshopsComponent } from './component/frontend/events/workshops/workshops.component';
import { WorkshopDetailComponent } from './component/frontend/events/workshop-detail/workshop-detail.component';
import { SpeakerEngagementsComponent } from './component/frontend/events/speaker-engagements/speaker-engagements.component';
import { SpeakerEngagementsDetailComponent } from './component/frontend/events/speaker-engagements-detail/speaker-engagements-detail.component';
import { BioComponent } from './component/frontend/bio/bio.component';
import { MetaModule } from '@ngx-meta/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpLoaderComponent } from './http-loader/http-loader.component';
import { HttpLoaderService } from './http-loader.service';
import { LoaderInterceptor } from './loader.interceptor';

import { SidenavService } from './../app/services/sidenav.service';
import { PastSeminarsComponent } from './component/frontend/events/past-seminars/past-seminars.component';
import { PastSpeakerEngagementsComponent } from './component/frontend/events/past-speaker-engagements/past-speaker-engagements.component';
import { PastWorkshopsComponent } from './component/frontend/events/past-workshops/past-workshops.component';

/**End Frontend Component**/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    SignUpComponent,
    LoginComponent,
    /**Frontend Component**/
    HomeComponent,
    BlogComponent,
    BloglistComponent,
    BlogdetailComponent,
    AboutusComponent,
    ServiceComponent,
    ServicelistComponent,
    TesimonialComponent,
    TesimoniallistComponent,
    EmployeeTrainingComponent,
    CouplesCounselingComponent,
    PersonalDevelopmentCoachingComponent,
    HighPerformanceCoachingComponent,
    SpecialProgramsForYoungMenComponent,
    ImageGalleryComponent,
    VideoGalleryComponent,
    TeamComponent,
    SeminarsComponent,
    SeminarsDetailComponent,
    WorkshopsComponent,
    WorkshopDetailComponent,
    SpeakerEngagementsComponent,
    SpeakerEngagementsDetailComponent,
    BioComponent,
    ContactusComponent,
    /**end Frontend Component**/
    comingSoonDialog,
    comingSoonDialogfooter,
    DialogTermsDialog,
    DialogPrivacyDialog,
    NewslatterDialogComponent,
    NewslattersuccessDialogComponent,
    CommonVideoModalComponent,
    VideoModalComponent,
    CommonTestimonialVideoModalComponent,

    HttpLoaderComponent,

    PastSeminarsComponent,

    PastSpeakerEngagementsComponent,

    PastWorkshopsComponent,


  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule,
    DemoMaterialModule,
    MetaModule.forRoot(),
    FacebookModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    OwlModule,
    LoginModule,
    ContactusModule
  ],
  providers: [CookieService,SidenavService,DatePipe, HttpLoaderService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true, }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [comingSoonDialog,comingSoonDialogfooter,DialogTermsDialog,DialogPrivacyDialog,NewslatterDialogComponent,NewslattersuccessDialogComponent,CommonVideoModalComponent,VideoModalComponent,CommonTestimonialVideoModalComponent]
})
export class AppModule { }
