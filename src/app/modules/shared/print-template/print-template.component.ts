import { Location } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Registrant } from 'src/app/services/registrants.service';

@Component({
  selector: 'app-print-template',
  templateUrl: './print-template.component.html',
  styleUrls: ['./print-template.component.css'],
})
export class PrintTemplateComponent implements OnInit, AfterViewInit {
  @Input('data') data: Registrant;
  @Output('clean') CleanEvent: EventEmitter<Registrant | any> =
    new EventEmitter();
  @ViewChild('buttonContainer', { read: ElementRef }) button: ElementRef;

  printData: Registrant;
  config = {
    printMode: 'template-popup',
    popupProperties:
      'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Hello World',
    templateString:
      "<header>I'm part of the template header</header>{{printBody}}<footer>I'm part of the template footer</footer>",
    stylesheets: [
      {
        rel: 'stylesheet',
        href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      },
      { rel: 'stylesheet', href: '/styles.css' },
    ],
    styles: ['.table { color: red; }', '.table td { color: green; }'],
  };

  constructor(private _route: ActivatedRoute, private _location: Location) {}

  ngOnInit(): void {
    this._route.queryParams.forEach((value: Registrant) => {
      this.printData = value;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.button.nativeElement.click();
    }, 500);
  }

  navigateBack() {
    this._location.back();
  }

  clean() {
    this.CleanEvent.emit('');
  }
}
