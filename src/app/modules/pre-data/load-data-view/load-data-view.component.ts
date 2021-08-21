import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AsistanceService } from 'src/app/services/asistance.service';
import { InputCellComponent } from '../../shared/agRenderer/input-cell/input-cell.component';
import { OptionsTableComponent } from '../../shared/agRenderer/options-table/options-table.component';

@Component({
  selector: 'load-data-view',
  templateUrl: './load-data-view.component.html',
  styleUrls: ['./load-data-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadDataViewComponent implements OnInit {
  dataAsistance: any[];
  @ViewChild('agGrid') table: AgGridAngular;
  columnDefs = [
    { field: 'id', checkboxSelection: true, maxWidth: 100 },
    {
      headerName: '',
      cellRendererFramework: OptionsTableComponent,
      maxWidth: 60,
      text: 'left',
    },
    {
      field: 'name',
      headerName: 'Nombre',
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: 'code',
      filter: true,
      editable: true,
      cellRenderer: this.getCodeCellRender,
    },
  ];

  defaultColDef = {
    minWidth: 120,
  };

  frameworkComponents: {
    inputCellEditor: InputCellComponent;
  };

  rowData = [
    { id: 258, name: 'Andy', code: 45657 },
    { id: 258, name: 'Marcelo', code: 45657 },
    { id: 258, name: 'Carmelo', code: 45657 },
    { id: 258, name: 'Luis', code: 45657 },
    { id: 258, name: 'Andy', code: 45657 },
    { id: 258, name: 'Marcelo', code: 45657 },
    { id: 258, name: 'Carmelo', code: 45657 },
    { id: 258, name: 'Luis', code: 45657 },
  ];

  constructor(
    private _asistance: AsistanceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscAsistance();
  }

  subscAsistance() {
    this._asistance.data.subscribe((res: any) => {
      if (res !== null) {
        this.dataAsistance = [
          { title: 'Aforo', data: res.total },
          { title: 'Afluencia', data: res.connected.count },
          { title: 'Asistencia', data: res.asistance },
        ];

        this.cdr.detectChanges();
      }
    });
  }

  onRowChange(event) {
    console.log(event.data);
  }

  getSelectedRow(): void {
    let selectedNodes = this.table.api.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    console.log(selectedData);
  }

  exportTable(): void {
    this.table.api.exportDataAsCsv();
  }

  getCodeCellRender(params: ICellRendererParams) {
    return `
      <i class="fa fa-qrcode mr-2 text-primary"></i>${params.value}
    `;
  }
}
