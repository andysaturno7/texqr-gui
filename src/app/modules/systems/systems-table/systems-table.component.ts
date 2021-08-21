import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SystemsService, System } from 'src/app/services/systems.service';

@Component({
  selector: 'systems-table',
  templateUrl: './systems-table.component.html',
  styleUrls: ['./systems-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemsTableComponent implements OnInit, OnDestroy {
  searchCondition: any;
  systems: System[];
  private subsc;

  constructor(
    private _systems: SystemsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subsc = this.subscSystem();
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

  subscSystem() {
    return this._systems.systems.subscribe(
      (res: System[]) => {
        this.systems = res;
        this.cdr.detectChanges();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
