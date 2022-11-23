import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { addBalanceComponent } from "./forms/addBalance/addBalance.component";
import { EmpcovidtestsComponent } from "../pages/tables/empcovidtests/empcovidtests.component";
import { EmployeevaccineComponent } from "../pages/tables/employeevaccine/employeevaccine.component";
import { FaceverifyComponent } from "../pages/tables/faceverify/faceverify.component";
import { EmployeetempComponent } from "../pages/tables/employeetemp/employeetemp.component";
import { VisitorcheckinsComponent } from "../pages/tables/visitorcheckins/visitorcheckins.component";
import { AllvisitorsComponent } from "../pages/tables/allvisitors/allvisitors.component";
import { transferMoneyComponent } from "./forms/transferMoney/transferMoney.component";
import { AllpackagesComponent } from "../pages/tables/allpackages/allpackages.component";
import { EditpackageComponent } from "../pages/layout/editpackage/editpackage.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "iot-dashboard",
        component: DashboardComponent,
      },

      {
        path: "editpackage",
        component: EditpackageComponent,
      },
      {
        path: "addBalance",
        component: addBalanceComponent,
      },
      {
        path: "empcovidtests",
        component: EmpcovidtestsComponent,
      },
      {
        path: "faceverify",
        component: FaceverifyComponent,
      },
      {
        path: "employeevaccine",
        component: EmployeevaccineComponent,
      },
      {
        path: "employeetemp",
        component: EmployeetempComponent,
      },
      {
        path: "allpackages",
        component: AllpackagesComponent,
      },
      {
        path: "visitorcheckins",
        component: VisitorcheckinsComponent,
      },
      {
        path: "allvisitors",
        component: AllvisitorsComponent,
      },

      {
        path: "transferMoney",
        component: transferMoneyComponent,
      },

      {
        path: "layout",
        loadChildren: () =>
          import("./layout/layout.module").then((m) => m.LayoutModule),
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./forms/forms.module").then((m) => m.FormsModule),
      },
      {
        path: "modal-overlays",
        loadChildren: () =>
          import("./modal-overlays/modal-overlays.module").then(
            (m) => m.ModalOverlaysModule
          ),
      },
      {
        path: "extra-components",
        loadChildren: () =>
          import("./extra-components/extra-components.module").then(
            (m) => m.ExtraComponentsModule
          ),
      },

      {
        path: "tables",
        loadChildren: () =>
          import("./tables/tables.module").then((m) => m.TablesModule),
      },

      {
        path: "",
        redirectTo: "iot-dashboard",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
