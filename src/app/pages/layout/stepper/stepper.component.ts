import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { NbDateService } from "@nebular/theme";
import * as moment from "moment";
import { ApiService } from "../../../api.service";
import { NbDialogService } from "@nebular/theme";
import { ShowcaseDialogComponent } from "../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";

@Component({
  selector: "ngx-stepper",
  templateUrl: "stepper.component.html",
  styleUrls: ["stepper.component.scss"],
})
export class StepperComponent {}
