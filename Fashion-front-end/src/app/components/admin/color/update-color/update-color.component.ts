import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../models/color';
import {ActivatedRoute, Router} from '@angular/router';
import {ColorService} from '../../../../services/color.service';
import {dashCaseToCamelCase} from '@angular/compiler/src/util';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-update-color',
  templateUrl: './update-color.component.html',
  styleUrls: ['./update-color.component.css']
})
export class UpdateColorComponent implements OnInit {
  colors: Observable<any>;
  id: number;
  color: Color;
  constructor(private route: ActivatedRoute, private router: Router, private colorService: ColorService) { }

  reloadData() {
    this.colors = this.colorService.getColorList();
  }

  ngOnInit() {
    this.color = new Color();
    this.id = this.route.snapshot.params.id;
    this.colorService.getColor(this.id).subscribe(data => {console.log(data); this.color = data; }, error => console.log(error));
    this.reloadData();
  }
  updateColor() {
    this.colorService.updateColor(this.id, this.color).subscribe(data => console.log(data), error => console.log(error));
    this.color = new Color();
    this.gotoList();
  }
  onSubmit() {
    this.updateColor();
  }
  gotoList() {
    this.reloadData();
    this.router.navigate(['colors']);
  }
}
