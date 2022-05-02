import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Dynamic } from 'src/app/interfaces/dynamic';

@Component({
  selector: 'input-dynamic',
  templateUrl: './input-dynamic.component.html',
  styleUrls: ['./input-dynamic.component.css'],
})
export class InputDynamicComponent implements OnInit {
  @Input('dynamics') dynamics: Dynamic[] = [];

  form = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dynamics.forEach((dynamic) => {
      this.form.addControl(dynamic.field, this.fb.control(''));
    });
  }

  get value() {
    return this.form.value;
  }

  clean() {
    this.form.reset();
  }
}
