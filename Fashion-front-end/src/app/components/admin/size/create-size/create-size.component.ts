import { Component, OnInit } from '@angular/core';
import {Size} from '../../../../models/size';
import {SizeService} from '../../../../services/size.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-size',
  templateUrl: './create-size.component.html',
  styleUrls: ['./create-size.component.css']
})
export class CreateSizeComponent implements OnInit {
  size: Size = new Size();
  submitted = false;
  constructor(private sizeService: SizeService, private router: Router) { }

  ngOnInit() {
  }
newSize(): void {
    this.submitted = false;
    this.size = new Size();
}
save() {
    this.sizeService.createSize(this.size).subscribe(data => console.log(data), error => console.log(error));
    this.size = new Size();
    this.gotoList();
}
onSubmit() {
    this.submitted = true;
    this.save();
    alert('created a new size is successful!');
}
gotoList() {
    this.router.navigate(['sizes']);
}
}
