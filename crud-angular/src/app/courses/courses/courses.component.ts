import { Component } from '@angular/core';
import { Course } from '../model/course';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, AppMaterialModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  constructor(private coursesService: CoursesService){
    this.courses$ = this.coursesService.list();
    // this.courses = [];
    // this.coursesService = new CoursesService();
  }

  // coursesService: CoursesService;
}
