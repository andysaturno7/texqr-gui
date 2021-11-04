import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { Dynamic } from 'src/app/models/dynamic.interface';
import { MailService } from 'src/app/services/mail.service';
import {
  Registrant,
  RegistrantsService,
} from 'src/app/services/registrants.service';
import { OptionsTableComponent } from '../../shared/agRenderer/options-table/options-table.component';
import { QrRendererComponent } from '../../shared/agRenderer/qr-renderer/qr-renderer.component';

@Component({
  selector: 'registrant-table',
  templateUrl: './registrant-table.component.html',
  styleUrls: ['./registrant-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrantTableComponent implements OnInit, OnDestroy {
  searchCondition: string;
  registrants: any[];
  private subsc: Subscription;
  context: any;
  dynamics: Dynamic[];
  qrData: any;

  @Output() QREvent: EventEmitter<string> = new EventEmitter();

  // AGGRID
  @ViewChild('agGrid') table: AgGridAngular;
  columnDefs = [
    {
      field: '',
      headerName: '',
      cellRendererFramework: OptionsTableComponent,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: false,
      pinned: 'left',
      editable: false,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: 'id',
      headerName: '#',
      editable: false,
      maxWidth: 60,
      filter: false,
      hide: true,
    },
    { field: 'firstName', headerName: 'Nombre' },
    { field: 'lastName', headerName: 'Apellido' },
    { field: 'email', headerName: 'Correo' },
    { field: 'participation', headerName: 'Tipo de Participante' },
    { field: 'event', headerName: 'Evento' },
    { field: 'area', headerName: 'Area' },
    { field: 'activity', headerName: 'Actividad' },
    { field: 'specialization', headerName: 'Especialización' },
    {
      field: 'code',
      headerName: 'Codigo DECODED',
      cellRendererFramework: QrRendererComponent,
      filter: true,
    },
    { field: 'connected', headerName: '', hide: true },
  ];

  defaultColDef = {
    minWidth: 100,
    editable: true,
    flex: 1,
    resizable: true,
    filter: true,
  };

  constructor(
    private _registrants: RegistrantsService,
    private cdr: ChangeDetectorRef,
    private _mail: MailService
  ) {
    this.context = { componentParent: this };
    this.dynamics = this._registrants.getDynamicsValue();
    this.setHeaderDynamics();
  }

  ngOnInit(): void {
    this.subsc = this.subscribeRegistrants();
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

  onGridReady(params) {
    // this._registrants.registrants.subscribe((data) => {
    //   this.registrants = data;
    //   this.cdr.detectChanges();
    // });
  }

  subscribeRegistrants() {
    return this._registrants.registrants.subscribe((res: Registrant[]) => {
      res.forEach((registrant, index) => {
        let regDynamics = null;
        if (!!registrant.dynamics && registrant.dynamics.length > 0) {
          regDynamics = JSON.parse(registrant.dynamics);
          this.dynamics.forEach((dynamic) => {
            registrant[dynamic.field] = regDynamics[dynamic.field];
          });
        }
      });
      this.registrants = res;
      this.cdr.detectChanges();
    });
  }

  setHeaderDynamics() {
    this.dynamics.forEach((dynamic, index) => {
      this.columnDefs.push({
        field: dynamic.field,
        headerName: dynamic.fieldLabel,
      });
    });
  }

  deleteItem(id: number) {
    confirm('Estás seguro que deseas eliminar este registro?')
      ? this._registrants.deleteOne(id)
      : null;
  }

  editItem(id: number) {
    console.log(id);
  }

  inlineUpdate(event: any): void {
    let data = event.data;
    let dynamics = {};
    this.dynamics.forEach((dbDynamic) => {
      dynamics[dbDynamic.field] = data[dbDynamic.field];
      delete data[dbDynamic.field];
    });
    data['dynamics'] = dynamics;

    this._registrants.update(data);
  }

  sendEmail(data: Registrant) {
    if (confirm(`Deseas enviar un correo a ${data.firstName}?`)) {
      this._mail.sendMail(data.email, data, 'Invitacion al Evento');
    }
    return;
  }

  getCodeCellRender(params: ICellRendererParams) {
    return `
      <i class="fa fa-qrcode mr-2 text-primary" role="button"></i>${params.value}
    `;
  }

  importDB(ev) {
    let file = ev.target.files[0];
    this._registrants.import(file);
  }

  exportTable() {
    this.table.api.exportDataAsCsv({ fileName: 'registro' });
  }

  dropDB() {
    if (confirm('Estás seguro de querer borrar todos los elementos?')) {
      this._registrants.drop();
    }
    return null;
  }

  QRTouched(code: string) {
    // this.QREvent.emit(code);
    this.qrData = code;
  }

  closeQR() {
    this.qrData = null;
  }

  downloadQR(event) {
    let img = event.srcElement;
    let a;
    if (confirm('Deseas descargar la el código como imágen?')) {
      a = document.createElement('a');
      a.href = img.src;
      a.download = this.qrData;
      a.click();
    } else {
      this.closeQR();
    }
  }
}
