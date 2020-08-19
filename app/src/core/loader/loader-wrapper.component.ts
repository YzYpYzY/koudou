import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'koudou-loader-wrapper',
    template: `<koudou-loader></koudou-loader>`,
    styles: [
        `
            :host {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 100;
                height: 100%;
                width: 100%;
                animation: fadeIn ease 0.3s;
                -webkit-animation: fadeIn ease 0.3s;
                -moz-animation: fadeIn ease 0.3s;
                -o-animation: fadeIn ease 0.3s;
                -ms-animation: fadeIn ease 0.3s;
                overflow: hidden;
                flex-grow: 0;
                top: 0;
            }
            :host::after {
                content: '';
                position: absolute;
                height: 100%;
                width: 100%;
                top: 0;
                right: 0;
                background: #191b1fc4;
                filter: blur(2px);
                opacity: 0;
                animation: fadeIn ease 0.5s;
            }
            koudou-loader {
                display: flex;
                height: 5rem;
                width: 5rem;
                z-index: 1;
            }
            @keyframes fadeIn {
                0% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }
        `,
    ],
})
export class LoaderWrapperComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
