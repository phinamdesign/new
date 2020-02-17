import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../models/color';
import {ColorService} from '../../../../services/color.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-color',
  templateUrl: './create-color.component.html',
  styleUrls: ['./create-color.component.css']
})
export class CreateColorComponent implements OnInit {
  colors: Observable<any>;
  color: Color = new Color();
  submitted = false;
  constructor(private colorService: ColorService, private router: Router) { }

  reloadData() {
    this.router.navigate(['create-colors']);
  }

  ngOnInit() {
    this.reloadData();
  }
  newColor(): void {
    this.submitted = false;
    this.color = new Color();
  }
  save() {
    this.colorService.createColor(this.color).subscribe(data => console.log(data), error => console.log(error));
    this.color = new Color();
  }
  onSubmit() {
    this.submitted = true;
    this.save();
    alert('Created color is successful!')
    this.reloadData();
  }

}
