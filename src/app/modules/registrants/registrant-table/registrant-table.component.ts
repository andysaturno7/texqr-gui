import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { PaginatedData } from 'src/app/interfaces/paginated-data';
import { Dynamic } from 'src/app/models/dynamic.interface';
import { MailService } from 'src/app/services/mail.service';
import {
  Registrant,
  RegistrantsService,
} from 'src/app/services/registrants.service';

@Component({
  selector: 'registrant-table',
  templateUrl: './registrant-table.component.html',
  styleUrls: ['./registrant-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrantTableComponent implements OnInit, OnChanges {
  qrData: any;
  editing = {};

  @Input('data') registrantsData: PaginatedData<Registrant>;
  @Input('dynamics') dynamics: Dynamic[];
  @Output('page') PageEvent: EventEmitter<any> = new EventEmitter();
  @Output('select') SelectEvent: EventEmitter<any> = new EventEmitter();
  @Output('QREvent') QREvent: EventEmitter<string> = new EventEmitter();
  @Output('PrintStickerEvent') PrintStickerEvent: EventEmitter<Registrant> =
    new EventEmitter();

  selected = [];

  columnMode = ColumnMode;
  selectionType = SelectionType;

  constructor(
    private _registrants: RegistrantsService,
    private cdr: ChangeDetectorRef,
    private _mail: MailService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

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
      ? this._registrants
          .deleteOne(id)
          .subscribe((res: { deleted: number }) => {
            if (res.deleted > 0)
              this.registrantsData.data = this.registrantsData.data.filter(
                (registrant) => registrant.id !== id
              );
          }, console.log)
      : null;
  }

  editItem(id: number) {
    console.log(id);
  }

  updateValue(event, cell, rowIndex, isDynamic = false) {
    this.editing[rowIndex + '-' + cell] = false;
    let newData: Registrant = this.registrantsData.data[rowIndex];
    isDynamic
      ? (newData.dynamics[cell] = event.target.value)
      : (newData[cell] = event.target.value);
    this._registrants.update(newData);
    this.registrantsData.data[rowIndex] = newData;
    this.registrantsData.data = [...this.registrantsData.data];
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

  handlePrintStickerEvent(data: Registrant) {
    console.log({ data });

    this.PrintStickerEvent.emit(data);
  }

  sendMail(registrant: Registrant) {
    this._mail.sendMail({ address: registrant.email, data: { registrant } });
  }
}
