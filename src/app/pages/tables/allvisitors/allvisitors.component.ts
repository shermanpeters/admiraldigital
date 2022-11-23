import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { ApiService } from '../../../api.service';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component'

import * as moment from 'moment';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-allvisitors',
  templateUrl: './allvisitors.component.html',
  styleUrls: ['./allvisitors.component.scss'],
  styles: [`
  :host /deep/ ng2-smart-table input { color: #000; }
  :host /deep/ ng2-smart-table select { color: #000; }
  `],

  template: `
    <nb-card accent="danger" size="tiny" [nbSpinner]="loading"
             nbSpinnerStatus="danger"
             nbSpinnerSize="large"
             nbSpinnerMessage="">
      <nb-card-header>Spinners</nb-card-header>
      <nb-card-body>
        <p>
          A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.
          Originally, nebula was a name for any diffuse astronomical object.
        </p>
        <button nbButton status="info" size="small" (click)="toggleLoadingAnimation()">Reload</button>

      </nb-card-body>
    </nb-card>
  `
})
export class AllvisitorsComponent implements OnInit {

  companyid: string;
  responseData: any;
  empnames: any;

  loading = false;

  // today = moment().format('llll');

  settings = {
    actions: {
      add: false,
    },

    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
      mode: 'inline',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      vfname: {
        title: 'First name',
        type: 'string',
      },
      vlname: {
        title: 'Last name',
        type: 'string',
      },
      vdocid: {
        title: 'IC/Passport',
        type: 'string',
      },
      vphone: {
        title: 'Phone number',
        type: 'string',
      },
      appointment: {
        title: 'Appointment',
        type: 'string',
      },

      mfullname: {
        title: 'Meetng with',
        type: 'string',
        editable: false,
      },


      vdepartment: {
        title: 'Department',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'Human Resources', title: 'Human Resources' },
              { value: 'Administration', title: 'Administration' },
              { value: 'Information Technology', title: 'Information Technology' },
              { value: 'Accounting & Finance', title: 'Accounting & Finance' },
              { value: 'Marketing & Sales', title: 'Marketing & Sales' },
              { value: 'Research & Development', title: 'Research & Development' },
              { value: 'Operations & Management', title: 'Operations & Management' },
              { value: 'Guest', title: 'Guest' },
              { value: 'Others', title: 'Others' },
            ],
          },
        }
      },

      floorlevel: {
        title: 'Floor',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: '1', title: '1st floor' },
              { value: '2', title: '2nd floor' },
              { value: '3', title: '3rd floor' },
              { value: '4', title: '4th floor' },
              { value: '5', title: '5th floor' },
              { value: '6', title: 'Lower floor' },
              { value: '7', title: 'Others' },
              { value: '8', title: 'Unknown' }
            ],
          },
        }
      },

      userstatus: {
        title: 'Status',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: '1', title: 'On schedule' },
              { value: '0', title: 'Cancelled' }
            ],
          },
        }
      },
      remarks: {
        title: 'Remark',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    public http: HttpClient,
    public authService: ApiService,
    private dialogService: NbDialogService,
    private datePipe: DatePipe
  ) {
    this.getAllVisitors();
    this.getEmployeeNames();
    // console.log(this.today)

  }

  ngOnInit(): void {
  }

  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }

  getEmployeeNames() {
    return new Promise(resolve => {
      let body = {
        companyidd: JSON.parse(localStorage.getItem('companyData')).result.companyid
      }
      this.authService.postData(body, 'getEmpList.php').subscribe((res: any) => {
        console.log("EMPS: " + res)
        this.empnames = JSON.parse(JSON.stringify(res.result));
        console.log("EMPS: " + this.empnames);
      }
      );
    });
  }

  getAllVisitors() {
    return new Promise(resolve => {
      let body = {
        companyidd: JSON.parse(localStorage.getItem('companyData')).result.companyid,
      }
      this.authService.postData(body, 'getVisitors.php').subscribe((res: any) => {
        for (var i = 0; i < res.result.length; i++) {
          res.result[i]['appointment'] = moment(res.result[i]['appointment']).format('LL')
        }

        for (var i = 0; i < res.result.length; i++) {
          if (res.result[i].userstatus == "0")
            res.result[i].userstatus = "Cancelled"
        }

        for (var i = 0; i < res.result.length; i++) {
          if (res.result[i].userstatus == "1")
            res.result[i].userstatus = "On Schedule"
        }

        this.source.load(res.result);
      }
      );
    });
  }

  onEditConfirm(event) {
    console.log("NEW DATA: " + event.newData)
    console.log("EMPLOYEE ID: " + event.newData.employeeid);
    console.log("APPOINTMENT ID: " + event.vinfoid);

    if (window.confirm('Are you sure you want to save?')) {

      console.log("XXX: " + event.newData.appointment)
      // event.newData.appointment = moment().format('YYYY-MM-DD');
      event.newData.appointment = moment(event.newData.appointment).format('YYYY-MM-DD')
      console.log("XXX NEW: " + event.newData.appointment)

      if (event.newData.userstatus == 'On Schedule' || event.newData.userstatus == '1') {
        event.newData.userstatus = '1'
      }
      if (event.newData.userstatus == 'Cancelled' || event.newData.userstatus == '0') {
        event.newData.userstatus = '0'
      }

      if (event.newData.floorlevel == '1st floor' || event.newData.floorlevel == '1') {
        event.newData.floorlevel = '1'
      }

      if (event.newData.floorlevel == '2nd floor' || event.newData.floorlevel == '2') {
        event.newData.floorlevel = '2'
      }

      if (event.newData.floorlevel == '3rd floor' || event.newData.floorlevel == '3') {
        event.newData.floorlevel = '3'
      }

      if (event.newData.floorlevel == '4th floor' || event.newData.floorlevel == '4') {
        event.newData.floorlevel = '4'
      }

      if (event.newData.floorlevel == '5th floor' || event.newData.floorlevel == '5') {
        event.newData.floorlevel = '5'
      }

      if (event.newData.floorlevel == 'Lower floor' || event.newData.floorlevel == '6') {
        event.newData.floorlevel = '6'
      }

      if (event.newData.floorlevel == 'Others' || event.newData.floorlevel == '7') {
        event.newData.floorlevel = '7'
      }

      if (event.newData.floorlevel == 'Unknown' || event.newData.floorlevel == '8') {
        event.newData.floorlevel = '8'
      }

      //API TO SAVE NEW EMPLOYEE DATA
      return new Promise(resolve => {
        let body = {
          //user updated details
          vinfoid: event.newData.vinfoid,
          employeeid: event.newData.visitorid,
          efirstname: event.newData.vfname,
          elastname: event.newData.vlname,
          edocid: event.newData.vdocid,
          ephone: event.newData.vphone,
          userstatus: event.newData.userstatus,
          appointment: event.newData.appointment,
          vdepartment: event.newData.vdepartment,
          floorlevel: event.newData.floorlevel,
          remarks: event.newData.remarks

        }

        this.authService.postData(body, 'updateVisitor.php').subscribe((res: any) => {
          console.log(res);
          this.responseData = res;
          console.log("RESPONSE DATA: " + this.responseData);

          if (res.success == true) {
            console.log("update visitor SUCCESS")
            console.log(res.success)

            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Visitor details updated successfully',
              },
            });

          } else {
            console.log("update FAILED")
            console.log(res.success)
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Error: We could not update the visitor details. Please try again.'
              },
            });
          }
          event.confirm.resolve();
        }
        );
      });
    }

    else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      // console.log(event.data.employeeid)
      //API TO DELETE EMPLOYEE
      return new Promise(resolve => {
        let body = {
          //user updated details
          employeeid: event.data.visitorid,
        }

        this.authService.postData(body, 'delVisitors.php').subscribe((res: any) => {
          console.log(res);
          this.responseData = res;
          console.log("RESPONSE DATA: " + this.responseData);

          if (res.success == true) {
            console.log("delete SUCCESS")
            console.log(res.success)

            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Visitor deleted successfully',
              },
            });

          } else {
            console.log("delete FAILED")
            console.log(res.success)
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Error: We could not delete the visitor details. Please try again.'
              },
            });
          }
          event.confirm.resolve();
        }
        );
      });
    }

    else {
      event.confirm.reject();
    }
  }

  downloadCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      // showTitle: true,
      useBom: true,
      nullToEmptyString: true,
      headers: [
        'Appointment ID',
        'Visitor ID',
        'First name',
        'Last name',
        'Document ID',
        'Phone',
        'Appointment',
        'Person meeting',
        'Floor level',
        'Department',
        'Status',
        'Remarks'
      ],
    };
    this.source.getFilteredAndSorted().then(data => {
      new Angular5Csv(data, 'Visitor appointments' + ' - ' + JSON.parse(localStorage.getItem('companyData')).result.companyname, options);
    })
  }

}