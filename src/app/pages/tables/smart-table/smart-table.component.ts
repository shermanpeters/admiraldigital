import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { ApiService } from '../../../api.service';
import { HttpClient } from '@angular/common/http';

import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component'
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

 
@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],

  styles: [`
:host /deep/ ng2-smart-table input { color: #000; }
:host /deep/ ng2-smart-table select { color: #000; }
`]
})
export class SmartTableComponent {

  companyid: string;
  responseData: any;

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
      efirstname: {
        title: 'First name',
        type: 'string',
      },
      elastname: {
        title: 'Last name',
        type: 'string',
      },
      empemail: {
        title: 'E-mail',
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

      edepartment: {
        title: 'Department',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'Human Resource', title: 'Human Resource' },
              { value: 'Administration', title: 'Administration' },
              { value: 'Information Technology', title: 'Information Technology' },
              { value: 'Accounting & Finance', title: 'Accounting & Finance' },
              { value: 'Marketing & Sales', title: 'Marketing & Sales' },
              { value: 'Research & Development', title: 'Research & Development' },
              { value: 'Operation & Management', title: 'Operation & Management' },
              { value: 'Others', title: 'Others' },

            ],
          },
        }
      },
      enrolled: {
        title: 'Enrolled',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: '1', title: 'Yes' },
              { value: '0', title: 'No' },
            ],
          },
        }

      },
      efaceprint: {
        title: 'Face verified',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: '1', title: 'Yes' },
              { value: '0', title: 'No' },
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
              { value: '1', title: 'Active' },
              { value: '0', title: 'Inactive' },
            ],
          },
        }
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    public http: HttpClient,
    public authService: ApiService,
    private dialogService: NbDialogService,
  ) {
    const data = this.service.getData();
    this.getAllEmployees();
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
          edepartment: event.newData.edepartment,
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
        'ID',
        'First name',
        'Last name',
        'Phone number',
        'Email address',
        'Document ID',
        'Country',
        'Enrolled?',
        'Face verified',
        'Status',
      ],
    };
    this.source.getFilteredAndSorted().then(data => {
      new Angular5Csv(data, 'Registered Employees' + ' - ' + JSON.parse(localStorage.getItem('companyData')).result.companyname, options);
    })
  }
}