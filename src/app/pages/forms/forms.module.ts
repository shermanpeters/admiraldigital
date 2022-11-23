import { NgModule } from "@angular/core";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from "@nebular/theme";

import { ThemeModule } from "../../@theme/theme.module";
import { FormsRoutingModule } from "./forms-routing.module";
import { FormsComponent } from "./forms.component";
import { ButtonsComponent } from "./buttons/buttons.component";
import { FormsModule as ngFormsModule } from "@angular/forms";
import { addBalanceComponent } from "./addBalance/addBalance.component";
import { transferMoneyComponent } from "./transferMoney/transferMoney.component";

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
  ],
  declarations: [
    FormsComponent,
    ButtonsComponent,
    addBalanceComponent,
    transferMoneyComponent,
  ],
})
export class FormsModule {}
