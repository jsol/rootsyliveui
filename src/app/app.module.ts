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
import { EditGigDialogComponent } from './edit-gig-dialog/edit-gig-dialog.component';
import { WebsocketService } from "./websocket.service";
import { ArtistListComponent } from './artist-list/artist-list.component';
import { EditArtistComponent } from './edit-artist/edit-artist.component';
import { EditArtistDialogComponent } from './edit-artist-dialog/edit-artist-dialog.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { EditVenueComponent } from './edit-venue/edit-venue.component';
import { EditVenueDialogComponent } from './edit-venue-dialog/edit-venue-dialog.component';
import { TemplatedTextComponent } from './templated-text/templated-text.component';

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
    TemplatedTextComponent
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
    MatTabsModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
