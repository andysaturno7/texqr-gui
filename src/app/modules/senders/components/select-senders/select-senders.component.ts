import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SenderService, iSender } from '../../sender.service';
import { Stored } from 'src/app/models/utils.types';
import { IProject, ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'texqr-select-senders',
  templateUrl: './select-senders.component.html',
  styleUrls: ['./select-senders.component.css'],
})
export class SelectSendersComponent implements OnInit {
  senders: Stored<iSender>[];
  selectedProject: IProject;
  selectValue: string;

  @Output('selected') select: EventEmitter<Stored<iSender>> =
    new EventEmitter();
  @Output('unselected') unselect: EventEmitter<Stored<iSender>> =
    new EventEmitter();

  constructor(
    private _sender: SenderService,
    private _project: ProjectsService
  ) {
    this.selectedProject = this._project.project;
  }

  ngOnInit(): void {
    this.getSenders();
  }

  setSelectedSender() {
    let existSender = this.senders.filter(
      (v) => v.id === this.selectedProject.SenderId
    );
    if (existSender.length > 0) this.selectValue = existSender[0].id;
  }

  getSenders() {
    this._sender.getSenders().subscribe(
      (res) => {
        if (res.length === 0) return (this.senders = null);
        this.senders = res;
        this.setSelectedSender();
      },
      (error) => {
        this.senders = null;
      }
    );
  }

  onSelect(senderId: string) {
    if (senderId === '') return this.unselect.emit();
    let sendersFiltered = this.senders.filter(
      (sender, idx) => sender.id === senderId
    );
    if (sendersFiltered.length > 0) this.select.emit(sendersFiltered[0]);
  }
}
