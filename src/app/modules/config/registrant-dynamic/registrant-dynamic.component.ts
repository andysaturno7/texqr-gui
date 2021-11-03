import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { Subscription } from 'rxjs';
import { Dynamic } from 'src/app/models/dynamic.interface';
import { RegistrantsService } from 'src/app/services/registrants.service';
import { OptionsTableComponent } from '../../shared/agRenderer/options-table/options-table.component';

@Component({
  selector: 'registrant-dynamic',
  templateUrl: './registrant-dynamic.component.html',
  styleUrls: ['./registrant-dynamic.component.css'],
})
export class RegistrantDynamicComponent implements OnInit, OnDestroy {
  searchCondition: string;
  dynamics: Dynamic[];
  private subsc: Subscription;
  context: any;

  // Form
  // newDynamicForm: FormGroup = this.fb.group({
  //   table: ['', Validators.required],
  //   field: ['', Validators.required],
  //   fieldLabel: [''],
  //   type: [''],
  // });

  table: string = 'Registrant';
  field: string;
  fieldLabel: string;
  type: string;

  // AGGRID
  @ViewChild('agGrid') agTable: AgGridAngular;
  columnDefs = [
    {
      field: '',
      headerName: '',
      cellRendererFramework: OptionsTableComponent,
      maxWidth: 60,
      pinned: 'left',
      flex: 1,
    },
    { field: 'table', headerName: 'Tabla' },
    { field: 'field', headerName: 'Campo' },
    { field: 'fieldLabel', headerName: 'Label' },
    { field: 'type', headerName: 'Tipo' },
  ];

  defaultColDef = {
    minWidth: 100,
    editable: false,
    flex: 1,
    resizable: true,
    filter: true,
  };

  constructor(private _regis: RegistrantsService, private fb: FormBuilder) {
    this.context = { conponentParent: this };
    this.subsc = _regis.dynamics.subscribe(
      (res: Dynamic[]) => {
        // res.forEach((val, index) => {
        // Configuraicion de tabla
        // let agColumnDef = {
        //   field: val.field,
        //   headerName: val.fieldLabel || val.field,
        // };
        // this.columnDefs.push(agColumnDef);
        // });
        this.dynamics = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

  inlineUpdate(event) {}

  addDynamic() {
    let dynamic = {
      table: this.table,
      field: this.field,
      fieldLabel: this.fieldLabel,
      type: this.type,
    };
    this._regis.addDynamic(dynamic);
  }

  deleteItem(id: number) {
    confirm('Estás seguro que deseas eliminar este campo?')
      ? this._regis.deleteDynamic(id)
      : null;
  }
}
