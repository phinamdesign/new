import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../models/color';
import {ActivatedRoute, Router} from '@angular/router';
import {ColorService} from '../../../../services/color.service';

@Component({
  selector: 'app-detail-color',
  templateUrl: './detail-color.component.html',
  styleUrls: ['./detail-color.component.css']
})
export class DetailColorComponent implements OnInit {
  id: number;
  color: Color;
  constructor(private route: ActivatedRoute, private router: Router, private colorService: ColorService) { }

  ngOnInit() {
    this.color = new Color();
    this.id = this.route.snapshot.params.id;
    this.colorService.getColor(this.id).subscribe(data => {console.log(data); this.color = data; }, error => console.log(error));
  }
list() {
    this.router.navigate(['colors']);
}
}
