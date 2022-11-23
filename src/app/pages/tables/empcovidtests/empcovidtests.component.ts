import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { ApiService } from '../../../api.service';
import { HttpClient } from '@angular/common/http';

import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component'
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import * as moment from 'moment';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';


@Component({
  selector: 'ngx-empcovidtests',
  templateUrl: './empcovidtests.component.html',
  styleUrls: ['./empcovidtests.component.scss'],
  styles: [`
  :host /deep/ ng2-smart-table input { color: #000; }
  :host /deep/ ng2-smart-table select { color: #000; }
  `]
})
export class EmpcovidtestsComponent {

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
      efullname: {
        title: 'Full name',
        type: 'string',
        editable: false,
      },
      testname: {
        title: 'Test name',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: '1', title: 'PCR - Individual' },
              { value: '2', title: 'PCR - Corporate' },
              { value: '3', title: 'Self test kit' },
            ],
          },
        }
      },

      testresult: {
        title: 'Test result',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'Positive', title: 'Positive' },
              { value: 'Negative', title: 'Negative' },
              { value: 'Pending', title: 'Pending' },
            ],
          },
        }
      },

      ephone: {
        title: 'Phone',
        type: 'string',
        editable: false,
      },
      testdate: {
        title: 'Test date',
        type: 'string',
      },
      datedifference: {
        title: 'Days taken',
        editable: false,
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
  ) {
    this.getAllTests();
  }

  ngOnInit(): void {
  }

  getAllTests() {
    return new Promise(resolve => {
      let body = {
        companyidd: JSON.parse(localStorage.getItem('companyData')).result.companyid,
      }
      this.authService.postData(body, 'getCovidTests.php').subscribe((res: any) => {

        for (var i = 0; i < res.result.length; i++) {

          res.result[i]['testdate'] = moment(res.result[i]['testdate']).format('LL')
          var seconddose = moment(res.result[i]['testdate']);
          var currentdate = moment();
          res.result[i]['datedifference'] = currentdate.diff(seconddose, 'days');
        }

        this.source.load(res.result);
      }
      );
    });
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      // console.log(event.data.employeeid)
      //API TO DELETE EMPLOYEE
      return new Promise(resolve => {
        let body = {
          //user updated details
          covidtestid: event.data.covidtestid,
        }

        this.authService.postData(body, 'delEmpCovidTest.php').subscribe((res: any) => {
          console.log(res);
          this.responseData = res;
          console.log("RESPONSE DATA: " + this.responseData);

          if (res.success == true) {
            console.log("delete SUCCESS")
            console.log(res.success)

            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Employee COVID-19 test deleted successfully',
              },
            });

          } else {
            console.log("delete FAILED")
            console.log(res.success)
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Error: We could not delete the employee COVID-19 test. Please try again.'
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
    console.log(event.newData.c_employee);
    console.log(event.newData.result);

    if (window.confirm('Are you sure you want to save?')) {

      if (event.newData.testname == "PCR - Individual" || event.newData.testname == "1") {
        event.newData.testname = '1'
      }

      if (event.newData.testname == "PCR - Corporate" || event.newData.testname == "2") {
        event.newData.testname = '2'
      }

      if (event.newData.testname == "Self test kit" || event.newData.testname == "3") {
        event.newData.testname = '3'
      }

      //API TO SAVE NEW EMPLOYEE DATA
      return new Promise(resolve => {
        let body = {
          //user updated details
          employeeid: event.newData.c_employee,
          testname: event.newData.testname,
          testresult: event.newData.testresult,
          testdate: event.newData.testdate,
        }

        this.authService.postData(body, 'updateCovidTest.php').subscribe((res: any) => {
          console.log(res);
          this.responseData = res;
          console.log("RESPONSE DATA: " + this.responseData);

          if (res.success == true) {
            console.log("update SUCCESS")
            console.log(res.success)

            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Employee COVID-19 test updated successfully',
              },
            });

          } else {
            console.log("update FAILED")
            console.log(res.success)
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Error: We could not update the employee COVID-19 test details. Please try again.'
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
        'ID',
        'Employee ID',
        'Full name',
        'Phone',
        'Email',
        'COVID-19 test type',
        'Test date',
        'Test result',
        'Days taken'
      ],
    };
    this.source.getFilteredAndSorted().then(data => {
      new Angular5Csv(data, 'Employee COVID19 Test' + ' - ' + JSON.parse(localStorage.getItem('companyData')).result.companyname, options);
    })
  }

}
