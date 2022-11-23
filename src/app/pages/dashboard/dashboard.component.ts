import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/Rx";
import * as moment from "moment";
import { ApiService } from "../../api.service";
import { NbWindowService } from "@nebular/theme";

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  totalBankBalance: any = Array;
  recentTransfer: any = Array;
  recentDeposit: any = Array;

  today: string = moment().format("llll");
  todayDate: string = moment().format("LL");

  constructor(public http: HttpClient, public authService: ApiService) {
    localStorage.getItem("userData");
    this.getTotalBalance();
    this.getRecentTransfer();
    this.getRecentDeposit();
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
          this.totalBankBalance[0]["balance"];

          if (this.totalBankBalance == 0 || null) {
            this.totalBankBalance = "0";
          } else {
            this.totalBankBalance = this.totalBankBalance[0]["balance"];
          }
        });
    });
  }

  getRecentTransfer() {
    return new Promise((resolve) => {
      let body = {
        userid: JSON.parse(localStorage.getItem("userData")).result.userid,
      };
      this.authService
        .postData(body, "getRecentTransfer.php")
        .subscribe((res: any) => {
          // console.log(res)
          this.recentTransfer = JSON.parse(JSON.stringify(res.result));
          this.recentTransfer[0]["t_amount"];

          if (this.recentTransfer == 0 || null) {
            this.recentTransfer = "0";
          } else {
            this.recentTransfer = this.recentTransfer[0]["t_amount"];
          }
        });
    });
  }

  getRecentDeposit() {
    return new Promise((resolve) => {
      let body = {
        userid: JSON.parse(localStorage.getItem("userData")).result.userid,
      };
      this.authService
        .postData(body, "getRecentDeposit.php")
        .subscribe((res: any) => {
          // console.log(res)
          this.recentDeposit = JSON.parse(JSON.stringify(res.result));
          this.recentDeposit[0]["d_amount"];

          if (this.recentDeposit == 0 || null) {
            this.recentDeposit = "0";
          } else {
            this.recentDeposit = this.recentDeposit[0]["d_amount"];
          }
        });
    });
  }
}
