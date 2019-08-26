import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material";


/*import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatNativeDateModule } from '@angular/material';
*/

import { Version1Component } from './version1/version1.component';
import { Version2Component } from './version2/version2.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsDialogComponent } from './version2/detailsDialog/detailsDialog.component';

@NgModule({
  declarations: [
    AppComponent,
    Version1Component,
    Version2Component,
    HomeComponent,
    DetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DetailsDialogComponent]
})
export class AppModule { }
