import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'src/app/services/electron.service';

@Component({
  selector: 'conf-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  ip: any = [
    {
      IPv4: '192.168.23.16',
      IPv6: '127.0.0.1',
      type: 'WiFi',
    },
  ];
  constructor(private _electron: ElectronService) {}

  ngOnInit(): void {
    this._electron.getIp().then((res) => {
      this.ip = res;
    });
  }
}
