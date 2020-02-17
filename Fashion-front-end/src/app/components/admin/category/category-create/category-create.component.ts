import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../../services/category.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  createForm = new FormGroup({
    categoryName: new FormControl(''),
  });
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  addCategory() {
    console.log('aaa');
    const {value} = this.createForm;
    this.categoryService.createCategory(value).subscribe(next => {
      this.categoryService;
      alert('created a new category!')
      this.createForm.reset();
    });
  }
}
