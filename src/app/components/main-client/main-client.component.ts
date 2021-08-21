import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'main-client',
  templateUrl: './main-client.component.html',
  styleUrls: ['./main-client.component.css'],
})
export class MainClientComponent implements OnInit {
  isScanActive: boolean = true;
  uri: any = null;

  dataAsistance: any[] = [
    { title: 'Total', data: 250 },
    { title: 'Presencial', data: 50 },
    { title: 'En línea', data: 200 },
  ];

  constructor(private _ws: SocketService) {
    this.uri = _ws.getUriServer();
  }

  ngOnInit(): void {}
}
