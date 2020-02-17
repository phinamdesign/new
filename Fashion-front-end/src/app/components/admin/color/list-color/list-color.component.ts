import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ColorService} from '../../../../services/color.service';
import {Router} from '@angular/router';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-list-color',
  templateUrl: './list-color.component.html',
  styleUrls: ['./list-color.component.css']
})
export class ListColorComponent implements OnInit {
  colors: Observable<any>;
  constructor(private colorService: ColorService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.colors = this.colorService.getColorList();
  }
  deleteColor(id: number) {
    const choice = confirm('are you sure to delete this color');
    if (choice) {
      this.colorService.deleteColor(id).subscribe(data => {console.log(data); this.reloadData(); },
        error => console.log(error));
    }
    }
  Colora(id: number) {
    this.router.navigate(['colors', id]);
  }
  updateColor(id: number) {
    this.router.navigate(['update-colors', id]);
  }

}
