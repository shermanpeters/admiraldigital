import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { ApiService } from '../../../api.service';
import { HttpClient } from '@angular/common/http';

import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component'
import { FaceverpopupComponent } from '../../modal-overlays/dialog/faceverpopup/faceverpopup.component';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';



@Component({
  selector: 'ngx-faceverify',
  templateUrl: './faceverify.component.html',
  styleUrls: ['./faceverify.component.scss'],

  styles: [`
  :host /deep/ ng2-st-tbody-edit-delete {display: flex !important;
    height: 0 !important;
  }
  
  :host /deep/ ng2-st-tbody-custom a.ng2-smart-action.ng2-smart-action-custom-custom {
    display: inline-block;
    width: 50px;
    text-align: center;
    font-size: 1.1em;
  }
  
  :host /deep/ ng2-st-tbody-custom a.ng2-smart-action.ng2-smart-action-custom-custom:hover {
    color: #5dcfe3;
  }
  `]
})
export class FaceverifyComponent {

  companyid: string;
  responseData: any;
  selectedFile: File = null;

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        { title: '<i class="nb-person"></i>' },
      ]
    },

    columns: {
      efullname: {
        title: 'Full name',
        type: 'string',
      },

      ephone: {
        title: 'Phone',
        type: 'string',
      },

      edocid: {
        title: 'Document ID',
        type: 'string',
      },

      enrolled: {
        title: 'Enrolled',
        type: 'string',
      },

      efaceprint: {
        title: 'Face verified',
        type: 'string',
      },

    },
  };

  settings1 = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        { title: '<i class="nb-person"></i>' },
      ]
    },

    columns: {
      efullname: {
        title: 'Full name',
        type: 'string',
      },

      ephone: {
        title: 'Phone',
        type: 'string',
      },

      edocid: {
        title: 'Document ID',
        type: 'string',
      },

      enrolled: {
        title: 'Enrolled',
        type: 'string',
      },

      efaceprint: {
        title: 'Face verified',
        type: 'string',
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();
  source1: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    public http: HttpClient,
    public authService: ApiService,
    private dialogService: NbDialogService,

  ) {
    const data = this.service.getData();
    this.getAllEmployees();
    this.getAllVisitors();
  }

  imageManual(event) {
    console.log(event.data.employeeid);

    //STORE VALUES IN JSON
    var employeeFaceVer = {
      'empid': event.data.employeeid,
      'docNo': event.data.edocid
    };

    // STORE OBJECTS INTO STORAGE - SEND TO FACEVERPOPUP COMPONENT
    localStorage.setItem('employeeFaceVer', JSON.stringify(employeeFaceVer));
    this.dialogService.open(FaceverpopupComponent);
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      // console.log(event.data.employeeid)
      //API TO DELETE EMPLOYEE
      return new Promise(resolve => {
        let body = {
          //user updated details
          employeeid: event.data.employeeid,
        }

        this.authService.postData(body, 'deleteEmployee.php').subscribe((res: any) => {
          console.log(res);
          this.responseData = res;
          console.log("RESPONSE DATA: " + this.responseData);

          if (res.success == true) {
            console.log("delete SUCCESS")
            console.log(res.success)

            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Employee deleted successfully',
              },
            });

          } else {
            console.log("delete FAILED")
            console.log(res.success)
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Error: We could not delete the employee details. Please try again.'
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

  onEditConfirm(event) {
    // console.log(event.newData)
    // console.log(event.newData.employeeid)
    if (window.confirm('Are you sure you want to save?')) {

      if (event.newData.userstatus == "Active" || event.newData.userstatus == "1") {
        event.newData.userstatus = '1'
      }
      if (event.newData.userstatus == "Inactive" || event.newData.userstatus == "0") {
        event.newData.userstatus = '0'
      }

      if (event.newData.enrolled == "Yes" || event.newData.enrolled == "1") {
        event.newData.enrolled = '1'
      }
      if (event.newData.enrolled == "No" || event.newData.enrolled == "0") {
        event.newData.enrolled = '0'
      }

      if (event.newData.efaceprint == "Yes" || event.newData.efaceprint == "1") {
        event.newData.efaceprint = '1'
      }
      if (event.newData.efaceprint == "No" || event.newData.efaceprint == "0") {
        event.newData.efaceprint = '0'
      }

      //API TO SAVE NEW EMPLOYEE DATA
      return new Promise(resolve => {
        let body = {
          //user updated details
          employeeid: event.newData.employeeid,
          efirstname: event.newData.efirstname,
          elastname: event.newData.elastname,
          empemail: event.newData.empemail,
          ephone: event.newData.ephone,
          edocid: event.newData.edocid,
          edocexpiry: event.newData.edocexpiry,
          edateofbirth: event.newData.edateofbirth,
          enationality: event.newData.enationality,
          enrolled: event.newData.enrolled,
          efaceprint: event.newData.efaceprint,
          userstatus: event.newData.userstatus,
        }

        this.authService.postData(body, 'updateEmployee.php').subscribe((res: any) => {
          console.log(res);
          this.responseData = res;
          console.log("RESPONSE DATA: " + this.responseData);

          if (res.success == true) {
            console.log("update SUCCESS")
            console.log(res.success)

            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Employee updated successfully',
              },
            });
          } else {
            console.log("update FAILED")
            console.log(res.success)
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Error: We could not update the employee details. Please try again.'
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

  getAllEmployees() {
    return new Promise(resolve => {
      let body = {
        companyidd: JSON.parse(localStorage.getItem('companyData')).result.companyid,
      }
      this.authService.postData(body, 'employees.php').subscribe((res: any) => {
        console.log(res)

        for (var i = 0; i < res.result.length; i++) {
          if (res.result[i].enrolled == "0") res.result[i].enrolled = "No"
          if (res.result[i].enrolled == "1") res.result[i].enrolled = "Yes"

          if (res.result[i].efaceprint == "0") res.result[i].efaceprint = "No"
          if (res.result[i].efaceprint == "1") res.result[i].efaceprint = "Yes"

          if (res.result[i].userstatus == "0") res.result[i].userstatus = "Inactive"
          if (res.result[i].userstatus == "1") res.result[i].userstatus = "Active"
        }
        console.log(res)
        this.source.load(res.result);
      }
      );
    });
  }

  getAllVisitors() {
    return new Promise(resolve => {
      let body = {
        companyidd: JSON.parse(localStorage.getItem('companyData')).result.companyid,
      }
      this.authService.postData(body, 'visitor-manualface.php').subscribe((res: any) => {
        console.log(res)

        for (var i = 0; i < res.result.length; i++) {
          if (res.result[i].enrolled == "0") res.result[i].enrolled = "No"
          if (res.result[i].enrolled == "1") res.result[i].enrolled = "Yes"

          if (res.result[i].efaceprint == "0") res.result[i].efaceprint = "No"
          if (res.result[i].efaceprint == "1") res.result[i].efaceprint = "Yes"

          if (res.result[i].userstatus == "0") res.result[i].userstatus = "Inactive"
          if (res.result[i].userstatus == "1") res.result[i].userstatus = "Active"
        }
        console.log(res)
        this.source1.load(res.result);
      }
      );
    });
  }

}
