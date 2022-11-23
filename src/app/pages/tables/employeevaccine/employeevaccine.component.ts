import { Component, OnInit } from '@angular/core';
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
  selector: 'ngx-employeevaccine',
  templateUrl: './employeevaccine.component.html',
  styleUrls: ['./employeevaccine.component.scss'],

  styles: [`
  :host /deep/ ng2-smart-table input { color: #000; }
  :host /deep/ ng2-smart-table select { color: #000; }
  `]
})
export class EmployeevaccineComponent implements OnInit {

  companyid: string;
  responseData: any;

  settings = {
    actions: {
      add: false,
      delete: false,
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
      firstdose: {
        title: 'First dose?',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'Yes', title: 'Yes' },
              { value: 'No', title: 'No' },
            ],
          },
        }
      },

      firstdosedate: {
        title: 'First dose date',
        type: 'string',
      },

      firstvaccineinfo: {
        title: 'First dose info',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: "SinoPharm", title: 'SinoPharm' },
              { value: "Sinovac", title: 'Sinovac' },
              { value: "Pfizer", title: 'Pfizer' },
              { value: "AstraZeneca", title: 'AstraZeneca' },
              { value: "CanSino", title: 'CanSino' },
              { value: "CoronaVac", title: 'CoronaVac' },
              { value: "Johnson & Johnson", title: 'Johnson & Johnson' },
              { value: "Moderna", title: 'Moderna' },
              { value: "Covishield", title: 'Covishield' },
            ],
          },
        }
      },

      seconddose: {
        title: 'Second dose?',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'Yes', title: 'Yes' },
              { value: 'No', title: 'No' },
            ],
          },
        }
      },

      seconddosedate: {
        title: 'Second dose date',
        type: 'string',
      },

      secvaccineinfo: {
        title: 'Second dose info',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: "SinoPharm", title: 'SinoPharm' },
              { value: "Sinovac", title: 'Sinovac' },
              { value: "Pfizer", title: 'Pfizer' },
              { value: "AstraZeneca", title: 'AstraZeneca' },
              { value: "CanSino", title: 'CanSino' },
              { value: "CoronaVac", title: 'CoronaVac' },
              { value: "Johnson & Johnson", title: 'Johnson & Johnson' },
              { value: "Moderna", title: 'Moderna' },
              { value: "Covishield", title: 'Covishield' },
            ],
          },
        }
      },

      datedifference: {
        title: 'Days vaccined',
        editable: false,
        type: 'string',
      },

      monthdifference: {
        title: 'Need booster shot in',
        editable: false,
        type: 'string',
      },

      receivedbooster: {
        title: 'Booster dose',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'Yes', title: 'Yes' },
              { value: 'No', title: 'No' },
            ],
          },
        }
      },

      boosterdate: {
        title: 'Booster dose date',
        type: 'string',
      },

      boosterinfo: {
        title: 'Booster dose info',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: "SinoPharm", title: 'SinoPharm' },
              { value: "Sinovac", title: 'Sinovac' },
              { value: "Pfizer", title: 'Pfizer' },
              { value: "AstraZeneca", title: 'AstraZeneca' },
              { value: "CanSino", title: 'CanSino' },
              { value: "CoronaVac", title: 'CoronaVac' },
              { value: "Johnson & Johnson", title: 'Johnson & Johnson' },
              { value: "Moderna", title: 'Moderna' },
              { value: "Covishield", title: 'Covishield' },
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
    this.getEmployeeVaccine();
  }

  ngOnInit(): void {
  }

  getEmployeeVaccine() {
    return new Promise(resolve => {
      let body = {
        companyidd: JSON.parse(localStorage.getItem('companyData')).result.companyid,
      }
      this.authService.postData(body, 'employeeVaccine.php').subscribe((res: any) => {
        console.log(res)

        console.log((res.result[0]['firstdosedate']));

        for (var i = 0; i < res.result.length; i++) {
          if (res.result[i]['firstdosedate'] == "" || res.result[i]['firstdosedate'] == null) {
            res.result[i]['firstdosedate'] = ''
          }
          else {
            res.result[i]['firstdosedate'] = moment(res.result[i]['firstdosedate']).format('LL')
          }

        }

        for (var i = 0; i < res.result.length; i++) {

          if (res.result[i]['seconddosedate'] == "" || res.result[i]['seconddosedate'] == null) {
            res.result[i]['seconddosedate'] = ''
          }

          else {
            res.result[i]['seconddosedate'] = moment(res.result[i]['seconddosedate']).format('LL')
            var seconddose = moment(res.result[i]['seconddosedate']);
            var currentdate = moment();
            res.result[i]['datedifference'] = currentdate.diff(seconddose, 'days');

          }
        }

        for (var i = 0; i < res.result.length; i++) {

          if (res.result[i]['seconddosedate'] == "" || res.result[i]['seconddosedate'] == null) {
            res.result[i]['monthdifference'] = ''
          }

          else {
            var yyy = 92 - res.result[i]['datedifference'];
            console.log("NUMBER OF DAYS LEFT FOR BOOSTER: " + yyy)

            res.result[i]['monthdifference'] = yyy;

            if (res.result[i]['monthdifference'] == '0' || res.result[i]['monthdifference'] < '0' && res.result[i]['boosterdate'] != '') {
              res.result[i]['monthdifference'] = 'Completed'
            }

            if (res.result[i]['monthdifference'] == '0' || res.result[i]['monthdifference'] < '0' && res.result[i]['boosterdate'] == '') {

              res.result[i]['monthdifference'] = yyy + ' days late';
            }

            // var given = res.result[i]['seconddosedate'];
            // var current = moment().startOf('day');

            // var xxx = currentdate.diff(given, 'months');
            // res.result[i]['monthdifference'] = xxx
            // console.log("TEST: " + res.result[i]['monthdifference']);
          }

        }
        // monthdifference

        // var given = moment("2021-11-10", "YYYY-MM-DD");
        // var current = moment().startOf('day');
        // //Difference in number of days
        // var xxx = currentdate.diff(given, 'months');
        // console.log("TEST: " + xxx)

        //load source in table
        this.source.load(res.result);
      }
      );
    });
  }

  onEditConfirm(event) {
    console.log(event.newData)
    console.log("EMPLOYEE ID: " + event.newData.employeeselfid)
    if (window.confirm('Are you sure you want to save?')) {
      //API TO SAVE NEW EMPLOYEE DATA
      return new Promise(resolve => {
        let body = {
          //user updated details
          employeeid: event.newData.employeeselfid,
          firstdose: event.newData.firstdose,
          firstdosedate: event.newData.firstdosedate,
          firstvaccineinfo: event.newData.firstvaccineinfo,
          seconddose: event.newData.seconddose,
          seconddosedate: event.newData.seconddosedate,
          secvaccineinfo: event.newData.secvaccineinfo,
          receivedbooster: event.newData.receivedbooster,
          boosterdate: event.newData.boosterdate,
          boosterinfo: event.newData.boosterinfo

        }

        this.authService.postData(body, 'updateVaccine.php').subscribe((res: any) => {
          console.log(res);
          this.responseData = res;
          console.log("RESPONSE DATA: " + this.responseData);

          if (res.success == true) {
            console.log("update vaccine SUCCESS")
            console.log(res.success)

            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Employee Vaccine details updated successfully',
              },
            });

          } else {
            console.log("update FAILED")
            console.log(res.success)
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Error: We could not update the employee vaccine details. Please try again.'
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
        'Full name',
        '1st dose',
        '1st dose date',
        '1st dose info',
        '2nd dose',
        '2nd dose date',
        '2nd dose info',
        'Days vaccinated',
        'Booster dose',
        'Booster dose date',
        'Booster dose info'
      ],
    };
    this.source.getFilteredAndSorted().then(data => {
      new Angular5Csv(data, 'Employee Vaccine' + ' - ' + JSON.parse(localStorage.getItem('companyData')).result.companyname, options);
    })
  }

}