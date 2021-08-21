import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Subscription } from 'rxjs';
import { AsistanceService } from 'src/app/services/asistance.service';

@Component({
  selector: 'asistance-table',
  templateUrl: './asistance-table.component.html',
  styleUrls: ['./asistance-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsistanceTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('agGrid') table: AgGridAngular;
  asistanceData: any[];
  private subsc: Subscription;
  columnDefs = [
    {
      field: 'id',
      headerName: '#',
      editable: false,
      maxWidth: 60,
    },
    { field: 'Registrant.firstName', headerName: 'Nombre' },
    { field: 'Registrant.lastName', headerName: 'Apellido' },
    { field: 'Room.name', headerName: 'Sala' },
    { field: 'joinTime', headerName: 'Entrada', filter: false },
    { field: 'leaveTime', headerName: 'Salida', filter: false },
    { field: 'updatedAt', headerName: 'Actualizado', filter: false },
  ];
  defaultColDef = {
    minWidth: 120,
    editable: false,
    flex: 1,
    resizable: true,
    filter: true,
  };

  constructor(
    private _asistance: AsistanceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subsc = this.subscAsistance();
    this._asistance.getAsistance();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

  subscAsistance(): Subscription {
    return this._asistance.asistance.subscribe(
      (res) => {
        this.asistanceData = res;
        this.cdr.detectChanges();
      },
      (error) => {}
    );
  }

  exportTable() {
    this.table.api.exportDataAsCsv({ fileName: 'asistanceReport' });
  }
}
