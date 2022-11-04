import { Component, OnInit } from '@angular/core';
import { faCode, faEllipsis, faExclamationCircle, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsPagination } from '../../interfaces/projects-pagination';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../interfaces/project';
import { ModalFormComponent } from '../../components/modal-form/modal-form.component';
import { ModalAlertComponent } from '../../../components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-projects-index',
  templateUrl: './projects-index.component.html',
  styleUrls: ['./projects-index.component.scss']
})
export class ProjectsIndexComponent implements OnInit {
  faExclamationCircle = faExclamationCircle;
  faCode = faCode;
  faEllipsis = faEllipsis;
  faPencil = faPencil;
  faTrash = faTrash;

  loader: boolean = true;
  unknowError: boolean = false;
  searching: boolean = false;
  onChangeError!: string;

  projectsPagination!: ProjectsPagination;

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.updateTable();
  }

  updateTable(){
    this.route.queryParamMap.subscribe(paramMap => {
      this.loader = true;
      this.unknowError = false;
      this.projectsService.getProjects(paramMap).subscribe({
        next: (res: ProjectsPagination) => {
          this.projectsPagination = res;
          this.loader = false;
          this.unknowError = false;
        },
        error: (err: HttpErrorResponse) => {
          this.loader = false;
          this.unknowError = true;
          this.onChangeError = 'Ocurrio un error al traer los proyectos.';
        }
      })
    })
  }

  createProject(){
    const modalRef = this.modalService.open(ModalFormComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.onSubmit.subscribe((res:Project) => {
      this.projectsPagination.data.unshift(res);
    })
  }

  updateItem(project: Project){
    const modalRef = this.modalService.open(ModalFormComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.projectToEdit = project;
    modalRef.componentInstance.onSubmit.subscribe((res:Project) => {
      let data = this.projectsPagination.data.find(item => item.id === project.id);
      if(data?.name != undefined) {
        data.name = res.name;
      }
    });
  }

  deleteItem(project: Project){
    const modalRef = this.modalService.open(ModalAlertComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.modalTitle = 'Desea eliminar el proyecto '+project.name+'?';
    modalRef.componentInstance.projectToHandle = project;
    modalRef.componentInstance.deleteProject = true;
    modalRef.componentInstance.btnValue = 'Eliminar';
    modalRef.componentInstance.onConfirm.subscribe(() => {
      let data = this.projectsPagination.data.findIndex(item => item.id === project.id);
      return this.projectsPagination.data.splice(data, 1);
    })
  }

}
