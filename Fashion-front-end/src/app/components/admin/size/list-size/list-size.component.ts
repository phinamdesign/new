import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {SizeService} from '../../../../services/size.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-size',
  templateUrl: './list-size.component.html',
  styleUrls: ['./list-size.component.css']
})
export class ListSizeComponent implements OnInit {
  sizes: Observable<any>;
  p = 1;
  constructor(private sizeService: SizeService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.sizes = this.sizeService.getSizeList();
  }
  deleteSize(id: number) {
    const choice = confirm('are you sure to delete this size');
    if (choice) {
      this.sizeService.deleteSize(id).subscribe(data => {console.log(data); this.reloadData(); },
        error => console.log(error));
    }
  }
  Size(id: number) {
    this.router.navigate(['sizes', id]);
  }
  updateSize(id: number) {
    this.router.navigate(['update-sizes', id]);
  }

}
