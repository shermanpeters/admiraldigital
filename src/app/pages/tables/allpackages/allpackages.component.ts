import { Component, OnInit, ViewChild } from '@angular/core';

import { ApiService } from '../../../api.service';
import { HttpClient } from '@angular/common/http';

import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component'
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import * as moment from 'moment';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { Router } from '@angular/router';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'ngx-allpackages',
  templateUrl: './allpackages.component.html',
  styleUrls: ['./allpackages.component.scss'],

})
export class AllpackagesComponent {

  totalPackageCost: any;
  packageData: any;
  duplicatePackageData: any;
  responseData: any;
  slotsColor: any;

  constructor(
    public http: HttpClient,
    public authService: ApiService,
    private dialogService: NbDialogService,
    private router: Router
  ) {
    this.getAllPackages();
  }

  getAllPackages() {
    return new Promise(resolve => {
      // console.log(JSON.parse(localStorage.getItem('agentData')).result.agentid); 
      let body = {
        agentId: JSON.parse(localStorage.getItem('agentData')).result.agentid,
      }
      this.authService.postData(body, 'getAllPackages.php').subscribe((res: any) => {
        // console.log(res.result[0].totalCost);

        for (var i = 0; i < res.result.length; i++) {

          if (res.result[i]['packagestatus'] == "1") {
            res.result[i]['packagestatus'] = 'Active'
          }
          else {
            res.result[i]['packagestatus'] = 'Inactive'
          }
        }

        for (var i = 0; i < res.result.length; i++) {
          res.result[i]['dep_flightdate'] = moment(res.result[i]['dep_flightdate']).format('llll')
        }

        this.packageData = res.result;
        // console.log("PACKAGE DATA: " + this.packageData);
        // console.log(res.result)
      }
      );
    });
  }

  edit(packageid) {
    console.log("EDIT CLICKED: " + packageid);
    this.router.navigate(['../../pages/layout/editpackage'], { state: { example: packageid } })
  }

  delete(packageid) {
    console.log("DELETE CLICKED: " + packageid);
    return new Promise(resolve => {
      // console.log(JSON.parse(localStorage.getItem('agentData')).result.agentid);
      let body = {
        packageId: packageid,
        agentId: JSON.parse(localStorage.getItem('agentData')).result.agentid
      }
      this.authService.postData(body, 'deletePackage.php').subscribe((res: any) => {
        if (res.success == true) {
          console.log("Package deleted success")
          this.dialogService.open(ShowcaseDialogComponent, {
            context: {
              title: 'Package deleted successfully',
            },
          });
          const currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
        }

        else {
          this.dialogService.open(ShowcaseDialogComponent, {
            context: {
              title: 'There was a problem deleting the package',
            },
          });
        }

      }
      );
    });
  }

  duplicate(packageid) {
    console.log("DUPLICATE CLICKED: " + packageid);

    return new Promise(resolve => {
      // console.log(JSON.parse(localStorage.getItem('agentData')).result.agentid);
      let body = {
        packageId: packageid,
      }
      this.authService.postData(body, 'duplicatePackageInfo.php').subscribe((res: any) => {
        // console.log(res.result[0].ret_flightname);
        // console.log(res.result);
        return new Promise(resolve => {

          let body = {
            //Package details 
            agentid: res.result[0].agentid,
            packageName: res.result[0].packagename + ' (copy)',
            packageSector: res.result[0].packagesector,
            slotsavailable: res.result[0].slotsavailable,
            evisaincluded: res.result[0].evisaincluded,
            evisacost: res.result[0].evisacost,
            mutawwifincluded: res.result[0].mutawwifincluded,
            mutawwifcost: res.result[0].mutawwifcost,
            travelinsuranceincluded: res.result[0].travelinsuranceincluded,
            travelinsurancecost: res.result[0].travelinsurancecost,

            //Airline Details
            dflightnumber: res.result[0].dep_flightname,
            dflightdate: res.result[0].dep_flightdate,
            ddepartureairport: res.result[0].dep_departureairport,
            ddeparturedate: res.result[0].dep_departuredate,
            darrivalairport: res.result[0].dep_arrivalairport,
            darrivaldate: res.result[0].dep_arrivaldate,
            dairlineclass: res.result[0].dep_airlineclass,
            dcostperpax: res.result[0].dep_flightcostperpax,

            rflightnumber: res.result[0].ret_flightname,
            rflightdate: res.result[0].ret_flightdate,
            rdepartureairport: res.result[0].ret_departureairport,
            rdeparturedate: res.result[0].ret_departuredate,
            rarrivalairport: res.result[0].ret_arrivalairport,
            rarrivaldate: res.result[0].ret_arrivaldate,
            rairlineclass: res.result[0].ret_airlineclass,
            rcostperpax: res.result[0].ret_flightcostperpax,

            //Hotel Details
            hotelname1: res.result[0].hotelname1,
            stayday1: res.result[0].stayday1,
            staynight1: res.result[0].staynight1,
            hotelroomtype1: res.result[0].roomtype1,
            hotelroomsize1: res.result[0].roomsize1,
            distancetolocation1: res.result[0].distancetolocation1,
            hotelroomview1: res.result[0].roomview1,
            hotelmeals1: res.result[0].includedmeals1,
            totalroomcost1: res.result[0].totalroomcost1,

            hotelname2: res.result[0].hotelname2,
            stayday2: res.result[0].stayday2,
            staynight2: res.result[0].staynight2,
            hotelroomtype2: res.result[0].roomtype2,
            hotelroomsize2: res.result[0].roomsize2,
            distancetolocation2: res.result[0].distancetolocation2,
            hotelroomview2: res.result[0].roomview2,
            hotelmeals2: res.result[0].includedmeals2,
            totalroomcost2: res.result[0].totalroomcost2,

            //Transport Details
            transporttype1: res.result[0].transporttype1,
            transportcost1: res.result[0].transportcost1,
            transportypeincluded1: res.result[0].transportypeincluded1,
            departuretransport1: res.result[0].departuretransport1,
            arrivaltransport1: res.result[0].arrivaltransport1,
            departfromtransport1: res.result[0].departfromtransport1,

            transporttype2: res.result[0].transporttype2,
            transportcost2: res.result[0].transportcost2,
            transportypeincluded2: res.result[0].transportypeincluded2,
            departuretransport2: res.result[0].departuretransport2,
            arrivaltransport2: res.result[0].arrivaltransport2,
            departfromtransport2: res.result[0].departfromtransport2,

            transporttype3: res.result[0].transporttype3,
            transportcost3: res.result[0].transportcost3,
            transportypeincluded3: res.result[0].transportypeincluded3,
            departuretransport3: res.result[0].departuretransport3,
            arrivaltransport3: res.result[0].arrivaltransport3,
            departfromtransport3: res.result[0].departfromtransport3
          }

          this.authService.postData(body, 'duplicatePackage.php').subscribe((res: any) => {
            console.log(res);
            this.responseData = res;
            console.log("RESPONSE DATA: " + this.responseData);

            if (res.success == true) {
              console.log("Package duplocated success")

              // console.log(res.success)

              this.dialogService.open(ShowcaseDialogComponent, {
                context: {
                  title: 'Package duplicated successfully',
                },
              });

              const currentUrl = this.router.url;
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentUrl]);
              });

            } else {
              console.log("Package submission failed")

              // console.log(res.success)
              this.dialogService.open(ShowcaseDialogComponent, {
                context: {
                  title: 'Error: Could not duplicate your package. Please try again.'
                },
              });
            }
          }
          );
        });
      });
    });
  }

}