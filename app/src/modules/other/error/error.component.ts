import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'koudou-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  message = 'Une malencontreuse erreur s\'est produite.';

  constructor(private activatedRoute: ActivatedRoute) {
    if(this.activatedRoute.snapshot.data.message) {
      this.message = this.activatedRoute.snapshot.data.message;
    }
  }

  ngOnInit() {
  }

}
