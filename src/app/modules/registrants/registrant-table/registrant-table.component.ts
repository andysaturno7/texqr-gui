import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  Input,
} from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { PaginatedData } from 'src/app/interfaces/paginated-data';
import { Dynamic } from 'src/app/models/dynamic.interface';
import { MailService } from 'src/app/services/mail.service';
import {
  Registrant,
  RegistrantsService,
} from 'src/app/services/registrants.service';
import { ServerSideDataSource } from 'src/app/services/utils.service';
import { OptionsTableComponent } from '../../shared/agRenderer/options-table/options-table.component';
import { QrRendererComponent } from '../../shared/agRenderer/qr-renderer/qr-renderer.component';

@Component({
  selector: 'registrant-table',
  templateUrl: './registrant-table.component.html',
  styleUrls: ['./registrant-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrantTableComponent implements OnInit {
  dynamics: Dynamic[];
  qrData: any;

  @Input('data') registrantsData: PaginatedData<Registrant>;
  @Output('page') PageEvent: EventEmitter<any> = new EventEmitter();
  @Output('select') SelectEvent: EventEmitter<any> = new EventEmitter();
  @Output('QREvent') QREvent: EventEmitter<string> = new EventEmitter();

  selected = [];

  columnMode = ColumnMode;
  selectionType = SelectionType;

  constructor(
    private _registrants: RegistrantsService,
    private cdr: ChangeDetectorRef,
    private _mail: MailService
  ) {
    this.dynamics = this._registrants.getDynamicsValue();
    console.log('dyna: ' + this.dynamics);
  }

  ngOnInit(): void {}

  onPage(event: any) {
    this.PageEvent.emit(event);
  }

  onSelect(event: any) {
    this.SelectEvent.emit(event);
  }

  public getSelecteds() {
    return this.selected;
  }

  deleteItem(id: number) {
    confirm('Estás seguro que deseas eliminar este registro?')
      ? this._registrants.deleteOne(id)
      : null;
  }

  editItem(id: number) {
    console.log(id);
  }

  importDB(ev) {
    let file = ev.target.files[0];
    this._registrants.import(file);
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
