import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultidropComponent } from './multidrop/multidrop.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditgigComponent } from './editgig/editgig.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GigListComponent } from './gig-list/gig-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditGigDialogComponent } from './edit-gig-dialog/edit-gig-dialog.component';
import { WebsocketService } from "./websocket.service";
import { ArtistListComponent } from './artist-list/artist-list.component';
import { EditArtistComponent } from './edit-artist/edit-artist.component';
import { EditArtistDialogComponent } from './edit-artist-dialog/edit-artist-dialog.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { EditVenueComponent } from './edit-venue/edit-venue.component';
import { EditVenueDialogComponent } from './edit-venue-dialog/edit-venue-dialog.component';
import { TemplatedTextComponent } from './templated-text/templated-text.component';
import { ShowGigComponent } from './show-gig/show-gig.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { HttpClientModule } from '@angular/common/http';
import { EditUrlsComponent } from './edit-urls/edit-urls.component';
import { SettingsComponent } from './settings/settings.component';
import { OptionsListComponent } from './options-list/options-list.component';
import { AddOptionDialogComponent } from './add-option-dialog/add-option-dialog.component';
import { AddOptionComponent } from './add-option/add-option.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, GoogleInitOptions } from '@abacritt/angularx-social-login';
import { TemplateListComponent } from './template-list/template-list.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { EditTemplateDialogComponent } from './edit-template-dialog/edit-template-dialog.component';
import { PromoterListComponent } from './promoter-list/promoter-list.component';
import { EditPromoterComponent } from './edit-promoter/edit-promoter.component';
import { EditPromoterDialogComponent } from './edit-promoter-dialog/edit-promoter-dialog.component';
import { MarkdownModule } from 'ngx-markdown';
import { ShowPromoterComponent } from './show-promoter/show-promoter.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { DeleteButtonDialogComponent } from './delete-button-dialog/delete-button-dialog.component';

const googleLoginOptions: GoogleInitOptions = {
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid',
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    MultidropComponent,
    EditgigComponent,
    GigListComponent,
    EditGigDialogComponent,
    ArtistListComponent,
    EditArtistComponent,
    EditArtistDialogComponent,
    VenueListComponent,
    EditVenueComponent,
    EditVenueDialogComponent,
    TemplatedTextComponent,
    ShowGigComponent,
    UploadFileComponent,
    EditUrlsComponent,
    SettingsComponent,
    OptionsListComponent,
    AddOptionDialogComponent,
    AddOptionComponent,
    TemplateListComponent,
    EditTemplateComponent,
    EditTemplateDialogComponent,
    PromoterListComponent,
    EditPromoterComponent,
    EditPromoterDialogComponent,
    ShowPromoterComponent,
    ContractListComponent,
    DeleteButtonComponent,
    DeleteButtonDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,
    HttpClientModule,
    MatProgressBarModule,
    SocialLoginModule,
    MarkdownModule.forRoot()
  ],
  providers: [WebsocketService, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '1039428997368-jvk0rvjghohhu5i83buhaf2g46nac9v8.apps.googleusercontent.com', googleLoginOptions
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
