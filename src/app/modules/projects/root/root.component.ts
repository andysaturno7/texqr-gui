import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { IProject, ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'projects-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
})
export class RootComponent implements OnInit {
  projects: IProject[];
  constructor(
    private _projects: ProjectsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setProjects();
  }

  setProjects() {
    this._projects.getProjects().subscribe((res) => {
      this.projects = res.data;
    });
  }

  selectProject(projectId: string) {
    this._projects.updateProject(projectId);
    this.router.navigate([projectId], { relativeTo: this.route });
  }
}
