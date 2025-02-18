import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CoursesModule } from '../courses.module';
import { CoursesService } from '../services/courses.service';
import { tap, pipe } from 'rxjs';

@Component({
  selector: 'app-course-form',
  imports: [AppMaterialModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService
  ){

    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit(){
    this.service.save(this.form.value).subscribe(data => console.log(data));
  }

  onCancel(){
    console.log("onCancel");
  }
}
