import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';
import { ActivatedRoute, Router } from '@angular/router';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-courses-list',
  imports: [AppMaterialModule, SharedModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  readonly displayedColumns = ['name', 'category','actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute) {}

  onAdd(){
    // this.router.navigate(['new'], {relativeTo: this.route})
    this.add.emit(true);
  }
}
