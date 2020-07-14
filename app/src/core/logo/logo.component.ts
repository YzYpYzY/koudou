import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'koudou-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
    @Input() subTitle: string;
    constructor() {}

    ngOnInit() {}
}
