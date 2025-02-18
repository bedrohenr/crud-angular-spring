import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { CoursesRoutingModule } from './courses-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { CoursesService } from './services/courses.service';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatTableModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [CoursesService]
})
export class CoursesModule { }
