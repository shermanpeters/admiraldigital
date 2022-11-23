import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import { EmployeevaccineComponent } from './employeevaccine/employeevaccine.component';
import { EmployeetempComponent } from './employeetemp/employeetemp.component';
import { AllvisitorsComponent } from './allvisitors/allvisitors.component';
import { EmpcovidtestsComponent } from './empcovidtests/empcovidtests.component';
import { VisitorcheckinsComponent } from './visitorcheckins/visitorcheckins.component';
import { FaceverifyComponent } from './faceverify/faceverify.component';
import { AllpackagesComponent } from './allpackages/allpackages.component';


@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    EmployeevaccineComponent,
    EmployeetempComponent,
    AllvisitorsComponent,
    EmpcovidtestsComponent,
    VisitorcheckinsComponent,
    FaceverifyComponent,
    AllpackagesComponent
   
  ],
})
export class TablesModule { }