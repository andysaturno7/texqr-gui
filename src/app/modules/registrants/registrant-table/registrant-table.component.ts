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
import { RegistrantsService } from 'src/app/services/registrants.service';
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
    { field: 'company', headerName: 'Empresa' },
    { field: 'chair', headerName: 'Silla', maxWidth: 80 },
    {
      field: 'code',
      headerName: 'Codigo QR',
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
    private cdr: ChangeDetectorRef
  ) {
    this.context = { componentParent: this };
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
    return this._registrants.registrants.subscribe((res) => {
      this.registrants = res;
      this.cdr.detectChanges();
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
    this._registrants.update(data);
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
    this.QREvent.emit(code);
  }
}
