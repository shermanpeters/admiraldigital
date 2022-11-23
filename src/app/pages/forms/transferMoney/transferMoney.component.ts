import { Component } from "@angular/core";
import { ApiService } from "../../../api.service";
import { NbDialogService } from "@nebular/theme";
import { ShowcaseDialogComponent } from "../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";

@Component({
  selector: "ngx-transferMoney",
  templateUrl: "./transferMoney.component.html",
  styleUrls: ["./transferMoney.component.scss"],
})
export class transferMoneyComponent {
  responseData: any;
  totalBankBalance: any = Array;
  loading = false;

  userData = {
    userid: "",
    transferamount: "",
    transferbank: "",
    accountnumber: "",
  };

  constructor(
    public authService: ApiService,
    private dialogService: NbDialogService
  ) {
    this.getTotalBalance();
    console.log(JSON.parse(localStorage.getItem("userData")).result.userid);
  }

  getTotalBalance() {
    return new Promise((resolve) => {
      let body = {
        userid: JSON.parse(localStorage.getItem("userData")).result.userid,
      };
      this.authService
        .postData(body, "getTotalBalance.php")
        .subscribe((res: any) => {
          // console.log(res)
          this.totalBankBalance = JSON.parse(JSON.stringify(res.result));
          this.totalBankBalance[0]["totalPackages"];

          if (this.totalBankBalance == 0 || null) {
            this.totalBankBalance = "0";
          } else {
            this.totalBankBalance = this.totalBankBalance[0]["balance"];
          }
        });
    });
  }

  transfer() {
    this.loading = true;
    if (this.userData.transferamount > this.totalBankBalance) {
      this.loading = false;
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: "You do not have sufficient funds in your account to transfer",
        },
      });
    } else {
      if (this.userData.transferamount == "") {
        alert("Please Enter an amount");
      } else if (this.userData.transferbank == "") {
        alert("Please select a bank to deposit");
      } else {
        return new Promise((resolve) => {
          this.userData.userid = JSON.parse(
            localStorage.getItem("userData")
          ).result.userid;
          let body = {
            //user details
            userid: this.userData.userid,
            transferamount: this.userData.transferamount,
            transferbank: this.userData.transferbank,
            accountnumber: this.userData.accountnumber,
          };

          this.authService
            .postData(body, "transferMoney.php")
            .subscribe((res: any) => {
              console.log(res);
              this.responseData = res;
              console.log("RESPONSE DATA: " + this.responseData);

              if (res.msg == "Transfer completed") {
                console.log(res.msg);
                this.loading = false;
                this.dialogService.open(ShowcaseDialogComponent, {
                  context: {
                    title: "Money has been transferred successfully",
                  },
                });
              } else {
                console.log("Transfer Failed");
                this.loading = false;
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
}
