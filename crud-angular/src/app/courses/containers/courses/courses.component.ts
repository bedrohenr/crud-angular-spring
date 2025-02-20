import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { Course } from '../../model/course';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CoursesService } from '../../services/courses.service';
import { catchError, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesListComponent } from "../../components/courses-list/courses-list.component";
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, AppMaterialModule, SharedModule, CoursesListComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  // | null para resolver problema de compilação
  courses$: Observable<Course[]> | null = null;
  displayedColumns = ['name', 'category','actions'];

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ){
    this.refresh();
    // this.courses = [];
    // this.coursesService = new CoursesService();
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onEdit(course: Course){
    this.router.navigate(['edit', course._id], {relativeTo: this.route})
  }

  // Abre o popup antes da remoção da curso
  onDelete(course: Course){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data: 'Tem certeza que deseja remover ese curso?'
    });

    dialogRef.afterClosed().subscribe(
      (result: boolean) => {
        if(result){
          console.log('curso deletado');
          this.delete(course);
        }
      }
    )
  }

  // Faz a efetiva remoção do curso
  delete(course: Course){
    this.coursesService.delete(course._id).subscribe(
      () => {
        this.refresh();
        this.snackBar.open('Curso removido com sucesso', 'Fechar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
      },
      error => this.onError('Erro ao tentar remover curso')
    );
  }

  refresh(){
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}
