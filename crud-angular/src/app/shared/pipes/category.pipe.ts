import { Pipe, PipeTransform } from '@angular/core';
import { consumerDestroy } from '@angular/core/primitives/signals';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case 'front-end': return 'code';
      case 'back-end': return 'computer';
    }

    return 'code';
  }

}
