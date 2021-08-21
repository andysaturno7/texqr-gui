import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { ICellEditorComp, ICellEditorParams } from 'ag-grid-community';

@Component({
  selector: 'input-cell',
  template:
    '<input type="number" class="form-control bg-dark" [value]="value" #input />',
})
export class InputCellComponent implements AfterViewInit, ICellEditorComp {
  private params: ICellEditorParams;
  public value;
  @ViewChild('input')
  public input: ElementRef;

  getGui() {
    return this.input.nativeElement;
  }

  ngAfterViewInit() {
    // setTimeout(() => this.input.element.nativeElement.focus());
  }

  agInit(params: ICellEditorParams) {
    alert('Iniciado');
    console.log('params: ' + params);

    this.params = params;
    this.value = params.value;
  }

  getValue() {
    return this.value;
  }

  isCancelBeforeStart() {
    return false;
  }

  isCancelAfterEnd() {
    return false;
  }
}
