import { Component, OnInit } from '@angular/core';
import {Size} from '../../../../models/size';
import {ActivatedRoute, Router} from '@angular/router';
import {SizeService} from '../../../../services/size.service';

@Component({
  selector: 'app-detail-size',
  templateUrl: './detail-size.component.html',
  styleUrls: ['./detail-size.component.css']
})
export class DetailSizeComponent implements OnInit {
  id: number;
  size: Size;
  constructor(private route: ActivatedRoute, private router: Router, private sizeService: SizeService) { }

  ngOnInit() {
    this.size = new Size();
    this.id = this.route.snapshot.params.id;
    this.sizeService.getSize(this.id).subscribe(data => {console.log(data); this.size = data; }, error => console.log(error));
  }
list() {
    this.router.navigate(['sizes']);
}
}
