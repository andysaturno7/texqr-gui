import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications.service';
import { IProject, ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'texqr-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    code_prefix: ['', [Validators.required, Validators.maxLength(5)]],
    keys: this.fb.group({
      date_start: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      time_start: ['', Validators.required],
      date_end: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      time_end: ['', Validators.required],
      logo: [''],
      cover: [''],
      mail_sender_text: [''],
      subject: [''],
      response_email: [''],
    }),
  });

  @Input('project') project: IProject | null;

  environment: 'update' | 'create';

  constructor(
    private fb: FormBuilder,
    private _project: ProjectsService,
    private _not: NotificationsService
  ) {}

  submit() {
    if (this.environment === 'create') return this.createProject();
    console.log('updating...');

    return this.updateProject();
  }

  createProject() {
    this._project.createProject(this.form.value).subscribe(
      (res) => {
        this._not.showSuccess(`Proyecto ${res.name} creado`);
        this.form.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateProject() {
    let project = { id: this.project.id, ...this.form.value };
    this._project.updateProject(project).subscribe(
      (res) => {
        this._not.showSuccess(`Proyecto actualizado`);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.environment = this.project ? 'update' : 'create';

    if (this.environment === 'update') {
      let { name, keys, code_prefix } = this.project;
      let {
        date_end,
        date_start,
        time_end,
        time_start,
        logo,
        cover,
        response_email,
        subject,
        mail_sender_text,
      } = keys;
      this.form.setValue({
        name,
        code_prefix,
        keys: {
          date_end,
          date_start,
          time_end,
          time_start,
          logo,
          cover,
          subject,
          mail_sender_text,
          response_email,
        },
      });
    }
  }
}
