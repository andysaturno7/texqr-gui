import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PaginatedData } from '../interfaces/paginated-data';
import { iSender } from '../modules/senders/sender.service';
import { Stored } from '../models/utils.types';

export interface IProject {
  id?: string;
  name: string;
  code_prefix?: string;
  keys: {
    date_start: string;
    date_end: string;
    time_start: string;
    time_end: string;
    logo?: string;
    cover?: string;
    mail_sender_text?: string;
    subject?: string;
    response_email?: string;
    address?: string;
  };
  UserId?: string;
  SenderId?: string;
  Sender?: Stored<iSender>;
  MailTemplateId?: string;
  StickerTemplateId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  registrantsCount: number;
  roomsCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private uri;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.uri = environment.uri;
  }

  protected activeProject: IProject;

  createProject(project: IProject) {
    return this.http.post<IProject>(this.uri + '/projects', project);
  }

  getProjects() {
    return this.http.get<PaginatedData<IProject>>(this.uri + '/projects');
  }

  getProject(projectId) {
    return this.http.get<IProject>(this.uri + '/projects/' + projectId);
  }

  get project(): IProject {
    return this.activeProject;
  }

  set project(project: IProject) {
    this.activeProject = project;
  }

  unselectProject() {
    this.activeProject = null;
  }

  updateProject(project: IProject) {
    return this.http.patch(`${this.uri}/projects/${project.id}`, project);
  }

  deleteProject(id) {
    return this.http.delete(`${this.uri}/projects/${id}`);
  }

  updateImageMarca(aim: 'cover' | 'logo', image: Blob) {
    let form = new FormData();
    form.append(aim, image);
    return this.http.post<{ path: string }>(
      `${this.uri}/projects/${this.project.id}/upload_${aim}`,
      form
    );
  }

  removeImageMarca(aim: 'cover' | 'logo') {
    return this.http.post<{ updated: number[] }>(
      `${this.uri}/projects/${this.project.id}/removeImage`,
      {
        aim,
      }
    );
  }
}
