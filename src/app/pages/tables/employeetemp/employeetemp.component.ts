import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../@core/data/smart-table";
import { ApiService } from "../../../api.service";
import { HttpClient } from "@angular/common/http";

import * as moment from "moment";
import { NbDialogService } from "@nebular/theme";
import { ShowcaseDialogComponent } from "../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import { Angular5Csv } from "angular5-csv/dist/Angular5-csv";

@Component({
  selector: "ngx-employeetemp",
  templateUrl: "./employeetemp.component.html",
  styleUrls: ["./employeetemp.component.scss"],
})
export class EmployeetempComponent implements OnInit {
  companyid: string;
  totalCheckins: any = Array;
  highestTemperature: any = Array;
  responseData: any;

  settings = {
    actions: {
      add: false,
      edit: false,
    },

    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      // birthday: {
      //   title: 'Birthday',
      //   type: 'custom',
      //   renderComponent: DatepickerComponent,
      //   filter: {
      //     type: 'custom',
      //     component: DatepickerComponent,
      //   }
      // },

      fullname: {
        title: "Full name",
        type: "string",
      },
      employee_checkin: {
        title: "Clock-in",
        type: "date",
      },
      employee_temperature: {
        title: "Temperature",
        type: "string",
      },
      employee_checkout: {
        title: "Clock-out",
        type: "date",
      },

      // employee_checkout: {
      //     title: 'Check-out',
      //     type: 'date',
      //     filter: {
      //           type: 'custom',

      //           component: DatepickerComponent,
      //         }
      //   },

      edepartment: {
        title: "Department",
        type: "string",
      },
      ephone: {
        title: "Phone number",
        type: "string",
      },

      // mysejimg: {
      //   title: 'MySejahtera Check-in',
      //   type: 'html',
      //   filter: true,
      //   width: '30px',
      //   valuePrepareFunction: (mysejimg) => { return '<img width="20%" src= ' + mysejimg + ' />' },
      // },
      mysejimg: {
        title: "MySejahtera",
        type: "html",
        filter: false,
        width: "30px",
        valuePrepareFunction: (mysejimg) => {
          return (
            "<a href= mysejcheckin/" +
            mysejimg +
            ' target="_blank">Screenshot</a>'
          );
        },
      },
      userimg: {
        title: "User",
        type: "html",
        filter: false,
        width: "30px",
        valuePrepareFunction: (userimg) => {
          return (
            "<a href= userimage/" + userimg + ' target="_blank">Screenshot</a>'
          );
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    public http: HttpClient,
    public authService: ApiService,
    private dialogService: NbDialogService
  ) {
    const data = this.service.getData();
    this.getEmployeeCheckin();
    this.totalCheckin();
    this.highTemperatures();
  }

  ngOnInit(): void {}

  getEmployeeCheckin() {
    return new Promise((resolve) => {
      let body = {
        companyidd: JSON.parse(localStorage.getItem("companyData")).result
          .companyid,
      };
      this.authService
        .postData(body, "employeeTemp.php")
        .subscribe((res: any) => {
          for (var i = 0; i < res.result.length; i++) {
            res.result[i]["employee_checkin"] = moment(
              res.result[i]["employee_checkin"]
            ).format("llll");
          }

          for (var i = 0; i < res.result.length; i++) {
            if (
              res.result[i]["employee_checkout"] == "" ||
              res.result[i]["employee_checkout"] == null
            ) {
              res.result[i]["employee_checkout"] = "";
            } else {
              res.result[i]["employee_checkout"] = moment(
                res.result[i]["employee_checkout"]
              ).format("llll");
            }
          }

          for (var i = 0; i < res.result.length; i++) {
            res.result[i]["employee_temperature"] =
              res.result[i]["employee_temperature"] + " °C";
          }

          for (var i = 0; i < res.result.length; i++) {
            if (
              res.result[i]["mysejimg"] == "" ||
              res.result[i]["mysejimg"] == null
            ) {
              res.result[i]["mysejimg"] = "no-thumbnail.jpg";
            } else {
              // res.result[i]['mysejimg'] = "https://pcis.borderpass.com/mysejcheckin/" + res.result[i]['mysejimg'];
              res.result[i]["mysejimg"] = res.result[i]["mysejimg"];
            }
          }

          for (var i = 0; i < res.result.length; i++) {
            if (
              res.result[i]["userimg"] == "" ||
              res.result[i]["userimg"] == null
            ) {
              res.result[i]["userimg"] = "no-thumbnail.jpg";
            } else {
              // res.result[i]['mysejimg'] = "https://pcis.borderpass.com/mysejcheckin/" + res.result[i]['mysejimg'];
              res.result[i]["userimg"] = res.result[i]["userimg"];
            }
          }
          this.source.load(res.result);
        });
    });
  }

  onDeleteConfirm(event) {
    if (window.confirm("Are you sure you want to delete?")) {
      console.log("INOUT ID: " + event.data.inoutid);
      //API TO DELETE EMPLOYEE
      return new Promise((resolve) => {
        let body = {
          //user updated details
          inoutid: event.data.inoutid,
        };

        this.authService
          .postData(body, "delEmpCheckin.php")
          .subscribe((res: any) => {
            console.log(res);
            this.responseData = res;
            console.log("RESPONSE DATA: " + this.responseData);

            if (res.success == true) {
              console.log("delete SUCCESS");
              console.log(res.success);

              this.dialogService.open(ShowcaseDialogComponent, {
                context: {
                  title: "Employee check-in deleted successfully",
                },
              });
            } else {
              console.log("delete FAILED");
              console.log(res.success);
              this.dialogService.open(ShowcaseDialogComponent, {
                context: {
                  title:
                    "Error: We could not delete the employee check-in. Please try again.",
                },
              });
            }
            event.confirm.resolve();
          });
      });
    } else {
      event.confirm.reject();
    }
  }

  totalCheckin() {
    return new Promise((resolve) => {
      let body = {
        companyidd: JSON.parse(localStorage.getItem("companyData")).result
          .companyid,
      };
      this.authService
        .postData(body, "totalCheckin.php")
        .subscribe((res: any) => {
          console.log(res);
          this.totalCheckins = JSON.parse(JSON.stringify(res.result));
          console.log(this.totalCheckins);
        });
    });
  }

  highTemperatures() {
    return new Promise((resolve) => {
      let body = {
        companyidd: JSON.parse(localStorage.getItem("companyData")).result
          .companyid,
      };
      this.authService
        .postData(body, "highTemperature.php")
        .subscribe((res: any) => {
          console.log(res);
          this.highestTemperature = JSON.parse(JSON.stringify(res.result));
          console.log(this.highestTemperature);
        });
    });
  }

  downloadCSV() {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      // showTitle: true,
      useBom: true,
      nullToEmptyString: true,
      headers: [
        "ID",
        "Full name",
        "Phone number",
        "Clock-in",
        "Temperature",
        "Clock-out",
        "Department",
        "MySejahtera image",
      ],
    };
    this.source.getFilteredAndSorted().then((data) => {
      new Angular5Csv(
        data,
        "Employee Checkins" +
          " - " +
          JSON.parse(localStorage.getItem("companyData")).result.companyname,
        options
      );
    });
  }
}
