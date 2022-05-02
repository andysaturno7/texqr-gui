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
import { ICellRendererParams } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { Dynamic } from 'src/app/models/dynamic.interface';
import {
  Asistance,
  AsistanceService,
} from 'src/app/services/asistance.service';
import { RegistrantsService } from 'src/app/services/registrants.service';

@Component({
  selector: 'asistance-table',
  templateUrl: './asistance-table.component.html',
  styleUrls: ['./asistance-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsistanceTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  dynamics: Dynamic[];
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
    {
      field: 'joinTime',
      headerName: 'Entrada',
      filter: true,
    },
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
    private _registrant: RegistrantsService,
    private cdr: ChangeDetectorRef
  ) {
    this.dynamics = this._registrant.getDynamicsValue();
    this.setHeaderDynamics();
  }

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
      (res: Asistance[]) => {
        res.forEach((asis) => {
          asis.joinTime = new Date(asis.joinTime).toLocaleString();
          asis.leaveTime =
            asis.leaveTime == '' || asis.leaveTime == null
              ? ''
              : new Date(asis.leaveTime).toLocaleString();
          // Set Dynamics
          let regDynamics = null;
          if (
            !!asis.Registrant.dynamics &&
            asis.Registrant.dynamics.length > 0
          ) {
            regDynamics = JSON.parse(asis.Registrant.dynamics);
            this.dynamics.forEach((dynamic) => {
              asis[dynamic.field] = regDynamics[dynamic.field];
            });
          }
          console.log({ asis });
        });
        this.asistanceData = res;
        this.cdr.detectChanges();
      },
      (error) => {}
    );
  }

  setHeaderDynamics() {
    this.dynamics.forEach((dynamic, index) => {
      this.columnDefs.push({
        field: dynamic.field,
        headerName: dynamic.fieldLabel,
      });
    });
  }

  exportTable() {
    this.table.api.exportDataAsCsv({ fileName: 'asistanceReport' });
  }

  DateRender(params: ICellRendererParams) {
    let date = new Date(params.value).toLocaleString();
    return `
      ${date}
    `;
  }
}
