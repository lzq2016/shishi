import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler,Slides} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {ImagePicker} from '@ionic-native/image-picker';
import {Camera} from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage';
import {ConferenceApp} from './app.component';
import {AboutPage} from '../pages/about/about';
import {PopoverPage} from '../pages/about-popover/about-popover';
import {AccountPage} from '../pages/account/account';
import {LoginPage} from '../pages/login/login';
import {MapPage} from '../pages/map/map';
import {SchedulePage} from '../pages/schedule/schedule';
import {ScheduleFilterPage} from '../pages/schedule-filter/schedule-filter';
import {SessionDetailPage} from '../pages/session-detail/session-detail';
import {SignupPage} from '../pages/signup/signup';
import {SpeakerDetailPage} from '../pages/speaker-detail/speaker-detail';
import {SpeakerListPage} from '../pages/speaker-list/speaker-list';
import {TabsPage} from '../pages/tabs-page/tabs-page';
import {TutorialPage} from '../pages/tutorial/tutorial';
import {SupportPage} from '../pages/support/support';
import {NoticePage} from '../pages/notice/notice';
import {BookmarkPage} from '../pages/bookmark/bookmark';
import {NodataPage} from '../pages/nodata/nodata';
import {GetlikePage} from '../pages/getlike/getlike';
import {AttentionPage} from '../pages/attention/attention';
import {MsgcommentPage} from '../pages/msgcomment/msgcomment';
import {MsgcollectionPage} from '../pages/msgcollection/msgcollection';
import {MsgcollectionallPage} from '../pages/msgcollectionall/msgcollectionall';
import {MsgnoticePage} from '../pages/msgnotice/msgnotice';
import {GuidePage} from '../pages/guide/guide';
import {UploadavatarPage} from '../pages/uploadavatar/uploadavatar';
import {ArticleInfoPage} from '../pages/article-info/article-info';
import {CommentInfoPage} from '../pages/comment-info/comment-info';
import {RecordInfoPage} from '../pages/record-info/record-info';
import {ProfilePage} from '../pages/profile/profile';
import {TipsPage} from '../pages/tips/tips';

import {SettingPage} from '../pages/setting/setting';
import {ResetPasswordPage} from '../pages/resetPassword/resetPassword';
import {VerificationPage} from '../pages/verification/verification';

import {ConferenceData} from '../providers/conference-data';
import {UserData} from '../providers/user-data';
import {HttpClient} from '../providers/httpClient';
import {NewsBaseInfo} from "../components/newsBaseInfo/newsBaseInfo";
import {RecordHeadComponent} from "../components/record-head/record-head";
import {RecordFollowComponent} from "../components/record-follow/record-follow";
import {RecordFooterComponent} from "../components/record-footer/record-footer";
import {NtHeaderComponent} from "../components/nt-header/nt-header";
import {RectCardComponent} from "../components/rect-card/rect-card";
import {SsAvatarInfoBarComponent} from "../components/ss-avatar-info-bar/ss-avatar-info-bar";
import {SsAvatarNewsBarComponent} from "../components/ss-avatar-news-bar/ss-avatar-news-bar";
import {SsHNewsCardComponent} from "../components/ss-h-news-card/ss-h-news-card";
import {SsNewsFooterComponent} from "../components/ss-news-footer/ss-news-footer";
import {SsVInImageNewsCardComponent} from "../components/ss-v-in-image-news-card/ss-v-in-image-news-card";
import {SsVOutImageNewsCardComponent} from "../components/ss-v-out-image-news-card/ss-v-out-image-news-card";
import {OutsideContentCardComponent} from "../components/outside-content-card/outside-content-card";
import {InsideContentCardComponent} from "../components/inside-content-card/inside-content-card";
import {OccupyParentDirective} from "../directives/occupy-parent/occupy-parent";
import {FullCardDirective} from "../directives/full-card/full-card";
import {NoLineCutDirective} from "../directives/no-line-cut/no-line-cut";
import {SlcComponent} from "../components/slc/slc";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommentModalPage} from "../pages/comment-modal/comment-modal";
import {ShareListComponent} from "../components/share-list/share-list";
import {ShareModalPage} from "../pages/share-modal/share-modal";
import {CommentItemComponent} from "../components/comment-item/comment-item";
import {CommentReplyComponent} from "../components/comment-reply/comment-reply";
import {FlippageOneComponent} from "../components/flippage-one/flippage-one";
import {FlippageTwoComponent} from "../components/flippage-two/flippage-two";
import {FlippageThreeComponent} from "../components/flippage-three/flippage-three";
import {DownHalfDirective} from "../directives/down-half/down-half";
import {EditZindexDirective} from "../directives/edit-zindex/edit-zindex";
import {FlippageFreshComponent} from "../components/flippage-fresh/flippage-fresh";
import {CONSTARGS} from "../components/const-args/const-args";
import {FlowCardStreamService} from "../components/flow-card-stream/flow-card-stream";
import {PublishDiaryPage} from '../pages/diary/publish-diary'
import {PublishCommentPage} from '../pages/comment/publish-comment'
import {CommentDetailPage} from '../pages/comment/comment-detail'
import {CommentAttachmentsComponent} from '../components/comment/comment-attachments'
import { TimelineComponent,TimelineTimeComponent,TimelineItemComponent } from '../components/timeline/timeline';
import {HomePage} from '../pages/home/home'
import {Tab1} from '../pages/home/tab1-page/tab1-page'
import {Tab2} from '../pages/home/tab2-page/tab2-page'
import {Tab3} from '../pages/home/tab3-page/tab3-page'
import {Tab4} from '../pages/home/tab4-page/tab4-page'
import {Tab5} from '../pages/home/tab4-page/tab4-page'
import {Tab6} from '../pages/home/tab4-page/tab4-page'
import {Tab7} from '../pages/home/tab4-page/tab4-page'
import {Tab8} from '../pages/home/tab4-page/tab4-page'
import {Tab9} from '../pages/home/tab4-page/tab4-page'
import {Tab10} from '../pages/home/tab4-page/tab4-page'
import {testPage} from '../pages/test/test'
import {DiaryDetailPage} from '../pages/diary/diary-detail'
import { FileTransfer } from '@ionic-native/file-transfer';
import { SafeHtmlPipe } from '../pipe/safehtml/safehtml';

export class myHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'pan':{velocity: 0.4, threshold: 0}
  }
}

@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    NoticePage,
    BookmarkPage,
    NodataPage,
    GetlikePage,
    AttentionPage,
    MsgcommentPage,
    MsgcollectionallPage,
    MsgcollectionPage,
    MsgnoticePage,
    GuidePage,
    UploadavatarPage,
    ArticleInfoPage,
    CommentInfoPage,
    RecordInfoPage,
    ProfilePage,
    TipsPage,
    SettingPage,
    ResetPasswordPage,
    VerificationPage,
    NewsBaseInfo,
    NtHeaderComponent,
    RecordHeadComponent,
    RecordFollowComponent,
    RecordFooterComponent,
    RectCardComponent,
    SsAvatarInfoBarComponent,
    SsAvatarNewsBarComponent,
    SsHNewsCardComponent,
    SsNewsFooterComponent,
    SsVInImageNewsCardComponent,
    SsVOutImageNewsCardComponent,
    SlcComponent,
    ShareListComponent,
    CommentItemComponent,
    CommentReplyComponent,
    CommentAttachmentsComponent,
    OutsideContentCardComponent,
    InsideContentCardComponent,
    FlippageOneComponent,
    FlippageTwoComponent,
    FlippageThreeComponent,
    FlippageFreshComponent,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    CommentModalPage,
    ShareModalPage,
    PublishDiaryPage,
    PublishCommentPage,
    CommentDetailPage,
    HomePage,
    Tab1,
    Tab2,
    Tab3,
    Tab4,
    Tab5,
    Tab6,
    Tab7,
    Tab8,
    Tab9,
    Tab10,
    testPage,
    DiaryDetailPage,
    OccupyParentDirective,
    FullCardDirective,
    NoLineCutDirective,
    DownHalfDirective,
    EditZindexDirective,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        {component: TabsPage, name: 'TabsPage', segment: 'tabs-page'},
        {component: SchedulePage, name: 'Schedule', segment: 'schedule'},
        {component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId'},
        {component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter'},
        {component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList'},
        {component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId'},
        {component: MapPage, name: 'Map', segment: 'map'},
        {component: NoticePage, name: 'Notice', segment: 'notice'},
        {component: AboutPage, name: 'About', segment: 'about'},
        {component: ProfilePage, name: 'Profile', segment: 'profile'},
        {component: SettingPage, name: 'Setting', segment: 'setting'},
        {component: VerificationPage, name: 'Verification', segment: 'verification'},
        {component: ResetPasswordPage, name: 'ResetPassword', segment: 'resetPassword'},
        {component: TutorialPage, name: 'Tutorial', segment: 'tutorial'},
        {component: SupportPage, name: 'SupportPage', segment: 'support'},
        {component: LoginPage, name: 'LoginPage', segment: 'login'},
        {component: AccountPage, name: 'AccountPage', segment: 'account'},
        {component: SignupPage, name: 'SignupPage', segment: 'signup'},
        {component: PublishDiaryPage, name: 'PublishDiaryPage', segment: 'publishDiary'},
        {component: DiaryDetailPage, name: 'DiaryDetailPage', segment: 'diaryDetail'},
        {component: PublishCommentPage, name: 'PublishCommentPage', segment: 'publishComment'},
        {component: CommentDetailPage, name: 'CommentDetailPage', segment: 'commentDetail'},
        {component: HomePage, name: 'HomePage', segment: 'home'},
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    NoticePage,
    BookmarkPage,
    NodataPage,
    GetlikePage,
    AttentionPage,
    MsgcommentPage,
    MsgcollectionallPage,
    MsgcollectionPage,
    MsgnoticePage,
    GuidePage,
    UploadavatarPage,
    TipsPage,
    ArticleInfoPage,
    CommentInfoPage,
    RecordInfoPage,
    ProfilePage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    CommentModalPage,
    ShareModalPage,
    PublishDiaryPage,
    PublishCommentPage,
    CommentDetailPage,
    HomePage,
    Tab1,
    Tab2,
    Tab3,
    Tab4,
    Tab5,
    Tab6,
    Tab7,
    Tab8,
    Tab9,
    Tab10,
    testPage,
    ResetPasswordPage,
    VerificationPage,
    SettingPage,
    DiaryDetailPage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HAMMER_GESTURE_CONFIG, useClass: myHammerConfig},
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    StatusBar,
    CONSTARGS,
    FlowCardStreamService,
    ImagePicker,
    Camera,
    HttpClient,
    FileTransfer,
    Slides
  ]
})
export class AppModule {
}
