import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PaginatedData } from '../interfaces/paginated-data';

export interface IProject {
  id?: string;
  name: string;
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
  private projectSelected = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.uri = environment.uri;
  }

  getProjects() {
    return this.http.get<PaginatedData<IProject>>(this.uri + '/projects');
  }

  getProject(projectId) {
    return this.http.get<IProject>(this.uri + '/projects/' + projectId);
  }

  get project(): string {
    this.updateProject();
    return this.projectSelected;
  }

  updateProject(projectId?: string) {
    if (!projectId)
      return (this.projectSelected =
        this.route.firstChild.firstChild.firstChild.snapshot.params.projectId);
    this.projectSelected = projectId;
  }

  unselectProject() {
    this.projectSelected = null;
  }
}
