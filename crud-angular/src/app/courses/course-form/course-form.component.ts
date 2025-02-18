import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CoursesModule } from '../courses.module';
import { CoursesService } from '../services/courses.service';
import { tap, pipe } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private service: CoursesService,
    private snackBar: MatSnackBar
  ){

    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(
      data => console.log(data),
      error => this.onError()
    );
  }

  onCancel(){
    console.log("onCancel");
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso!','', { duration: 3000});
  }
}
