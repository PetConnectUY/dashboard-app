import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './shared/pages/dashboard/dashboard.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ModalNavbarComponent } from './shared/components/modal-navbar/modal-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ModalNavbarComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FontAwesomeModule,
  ]
})
export class ProtectedModule { }
