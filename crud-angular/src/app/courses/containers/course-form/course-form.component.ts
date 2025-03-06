import { Component } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, MinLengthValidator, NonNullableFormBuilder, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { courseResolver } from '../../guards/course.resolver';

@Component({
  selector: 'app-course-form',
  imports: [AppMaterialModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  private NAME_MIN_LENGTH = 5;
  private NAME_MAX_LENGTH = 100;

  form = new FormGroup({
    _id : new FormControl<string | null | undefined>(''),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(this.NAME_MIN_LENGTH),
      Validators.maxLength(this.NAME_MAX_LENGTH)
    ]),
    category: new FormControl<string>('', [
      Validators.required
    ]),
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    const course: Course = this.route.snapshot.data['course'];

    // Setando o formulario tipado
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
  }

  onSubmit(){
    //this.form.value
    this.service.save(this.form.value)
    .subscribe(
      data => this.onSuccess(),
      error => this.onError()
    );
  }

  onCancel(){
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 3000});
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso!','', { duration: 3000});
  }

  public getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName)

    if(field?.hasError('required')){
      return 'Campo obrigatório';
    }

    if(field?.hasError('minlength')){
      console.log(field.errors);
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : this.NAME_MIN_LENGTH;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if(field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : this.NAME_MAX_LENGTH;
      return `Tamanho máximo é de ${requiredLength} caracteres.`;
    }

    return 'Campo inválido';
  }

  public getNameMaxLength(){
    return this.NAME_MAX_LENGTH;
  }
}
