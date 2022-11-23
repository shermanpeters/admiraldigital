import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../api.service";

import { NbDialogService } from "@nebular/theme";
import { ShowcaseDialogComponent } from "../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";

@Component({
  selector: "ngx-addBalancetest",
  templateUrl: "./addBalance.component.html",
  styleUrls: ["./addBalance.component.scss"],
})
export class addBalanceComponent {
  empnames: any;
  responseData: any;
  covidtesttypes: any;
  loading = false;

  userData = {
    userid: "",
    totalAmount: "",
    depositfrom: "",
    depositaccount: "",
  };

  constructor(
    public authService: ApiService,
    private dialogService: NbDialogService
  ) {
    // this.getEmployeeNames();
    // this.getCovidTestType();
    console.log(JSON.parse(localStorage.getItem("userData")).result.userid);
  }

  deposit() {
    this.loading = true;
    if (this.userData.totalAmount == "") {
      alert("Please Enter an amount");
    } else if (this.userData.depositfrom == "") {
      alert("Please select a bank to deposit from");
    } else {
      return new Promise((resolve) => {
        this.userData.userid = JSON.parse(
          localStorage.getItem("userData")
        ).result.userid;
        let body = {
          //user details
          userid: this.userData.userid,
          totalAmount: this.userData.totalAmount,
          depositfrom: this.userData.depositfrom,
          depositaccount: this.userData.depositaccount,
        };

        this.authService
          .postData(body, "depositMoney.php")
          .subscribe((res: any) => {
            console.log(res);
            this.responseData = res;
            console.log("RESPONSE DATA: " + this.responseData);

            if (res.msg == "Balance updated") {
              console.log(res.msg);
              this.loading = false;
              this.dialogService.open(ShowcaseDialogComponent, {
                context: {
                  title: "Money has been deposited successfully",
                },
              });
            } else {
              console.log("Deposit Failed");
              this.loading = false;
              alert(res.success);
              console.log(res.success);
              this.dialogService.open(ShowcaseDialogComponent, {
                context: {
                  title:
                    "Error: There was an internal error. Please try again.",
                },
              });
            }
          });
      });
    }
  }
}
