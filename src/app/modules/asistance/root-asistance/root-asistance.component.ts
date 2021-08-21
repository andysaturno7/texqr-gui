import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AsistanceService } from 'src/app/services/asistance.service';

@Component({
  selector: 'root-asistance',
  templateUrl: './root-asistance.component.html',
  styleUrls: ['./root-asistance.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootAsistanceComponent implements OnInit {
  asistance;
  searchCondition;

  constructor(
    private _asistance: AsistanceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.subscAsistance();
    // this._asistance.getAsistance();
  }

  subscAsistance() {
    this._asistance.asistance.subscribe(
      (res) => {
        this.asistance = res;
        this.cdr.detectChanges();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
