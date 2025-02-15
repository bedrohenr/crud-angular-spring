import { Component } from '@angular/core';
import { Course } from '../model/course';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-courses',
  imports: [MatTableModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  constructor(){
    // this.courses = [];
  }

  courses: Course[] = [
    {_id: "1", name: "Angular", category: "Frontend"}
  ];
  displayedColumns = ['name', 'category']
}
