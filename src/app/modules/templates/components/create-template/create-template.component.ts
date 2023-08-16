import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoredTemplate, TemplatesService } from '../../templates.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'texqr-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css'],
})
export class CreateTemplateComponent implements OnInit {
  environment: 'create' | 'edit';
  templateId: string;
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.min(3)]],
    type: ['', Validators.required],
    engine: ['', Validators.required],
    template: ['', Validators.required],
    keys: this.fb.group({
      page_size: this.fb.group({
        width: [200],
        height: [100],
      }),
    }),
  });
  constructor(
    private fb: FormBuilder,
    private _template: TemplatesService,
    private _not: NotificationsService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    let { id } = this.route.snapshot.params;
    if (id) {
      this.environment = 'edit';
      this.templateId = id;
    } else {
      this.environment = 'create';
    }
  }

  ngOnInit(): void {
    if (this.environment === 'edit') this.setTemplate(this.templateId);
  }

  setTemplate(id: string) {
    this._template.getById(id).subscribe((res) => {
      let { name, type, engine, template, keys } = res;
      this.form.setValue({ name, type, engine, template, keys });
    }, console.log);
  }

  onSendForm() {
    if (this.form.valid) {
      console.log(this.environment);

      if (this.environment === 'create') return this.create();
      if (this.environment === 'edit') return this.update();
    }
  }

  create() {
    this._template.createTemplate(this.form.value).subscribe((res) => {
      this.location.back();
    }, this._not.showError);
  }

  update() {
    let storedTemplate: StoredTemplate = this.form.value;
    storedTemplate.id = this.templateId;
    this._template.updateTemplate(storedTemplate).subscribe((res) => {
      this.location.back();
    }, console.log);
  }
}
