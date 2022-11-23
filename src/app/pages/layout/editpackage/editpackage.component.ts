import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import * as moment from 'moment';
import { ApiService } from '../../../api.service';
import { NbDialogService } from '@nebular/theme';;
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component'



@Component({
  selector: 'ngx-editpackage',
  templateUrl: './editpackage.component.html',
  styleUrls: ['./editpackage.component.scss']
})
export class EditpackageComponent {

  packageData: any;
  packageIdPassed: any;
  stayDuration: any;
  loading = false;
  responseData: any;

  //Departure flight variables
  dflightnumber: '';
  dflightdate: any;
  ddepartureairport: ''
  ddeparturedate: any
  darrivalairport: ''
  darrivaldate: any
  dairlineclass: ''
  dcostperpax: ''

  //Return flight variables
  rflightnumber: ''
  rflightdate: any
  rdepartureairport: ''
  rdeparturedate: any
  rarrivalairport: ''
  rarrivaldate: any
  rairlineclass: ''
  rcostperpax: ''


  totalairlinecost: any
  totalhotelcost: any
  totaltransportcost: any;
  totalothercost: any;
  totalpackageprice: any;

  //Hotel 1 variables
  hotelname1: ''
  stayday1: ''
  staynight1: ''
  hotelroomtype1: ''
  hotelroomsize1: ''
  hotelroomview1: ''
  distancetolocation1: ''
  hotelmeals1: ''
  hotelroomcostpernight1: ''
  totalroomcost1: ''

  //Hotel 2 variables
  hotelname2: ''
  stayday2: ''
  staynight2: ''
  hotelroomtype2: ''
  hotelroomsize2: ''
  distancetolocation2: ''
  hotelroomview2: ''
  hotelmeals2: ''
  hotelroomcostpernight2: ''
  totalroomcost2: ''

  //Transport 1 variables
  transporttype1: ''
  transportcost1: ''
  transportypeincluded1: ''
  departuretransport1: any
  arrivaltransport1: any
  departfromtransport1: ''

  //Transport 2 variable
  transporttype2: ''
  transportcost2: ''
  transportypeincluded2: ''
  departuretransport2: any
  arrivaltransport2: any
  departfromtransport2: ''

  //Transport 3 variable
  transporttype3: ''
  transportcost3: ''
  transportypeincluded3: ''
  departuretransport3: any
  arrivaltransport3: any
  departfromtransport3: ''

  //PACKAGE DETAILS
  packagename: ''
  sector: ''
  slotsavailable: ''
  evisaincluded: ''
  evisacost: ''
  mutawwifincluded: ''
  mutawwifcost: ''
  travelinsuranceincluded: ''
  travelinsurancecost: ''

  //FORMS GROUP
  firstForm = this.fb.group({
    //departure flight
    dflightnumber: '',
    dflightdate: '',
    ddepartureairport: '',
    ddeparturedate: '',
    darrivalairport: '',
    darrivaldate: '',
    dairlineclass: '',
    dcostperpax: '',

    //return flight
    rflightnumber: '',
    rflightdate: '',
    rdepartureairport: '',
    rdeparturedate: '',
    rarrivalairport: '',
    rarrivaldate: '',
    rairlineclass: '',
    rcostperpax: '',
  });

  secondForm = this.fb.group({
    //Hotel 1
    hotelname1: '',
    stayday1: '',
    staynight1: '',
    hotelroomtype1: '',
    hotelroomsize1: '',
    distancetolocation1: '',
    hotelroomview1: '',
    hotelmeals1: '',
    hotelroomcostpernight1: '',
    totalroomcost1: '',

    //Hotel 2
    hotelname2: '',
    stayday2: '',
    staynight2: '',
    hotelroomtype2: '',
    hotelroomsize2: '',
    distancetolocation2: '',
    hotelroomview2: '',
    hotelmeals2: '',
    hotelroomcostpernight2: '',
    totalroomcost2: '',
  });

  thirdForm = this.fb.group({
    //Transport 1
    transporttype1: '',
    transportcost1: '',
    transportypeincluded1: '',
    departuretransport1: '',
    arrivaltransport1: '',
    departfromtransport1: '',

    //Transport 2
    transporttype2: '',
    transportcost2: '',
    transportypeincluded2: '',
    departuretransport2: '',
    arrivaltransport2: '',
    departfromtransport2: '',

    //Transport 3
    transporttype3: '',
    transportcost3: '',
    transportypeincluded3: '',
    departuretransport3: '',
    arrivaltransport3: '',
    departfromtransport3: '',
  });

  fourthForm = this.fb.group({
    // Package name
    packagename: '',
    sector: '',
    slotsavailable: '',
    evisaincluded: '',
    evisacost: '',
    mutawwifincluded: '',
    mutawwifcost: '',
    travelinsuranceincluded: '',
    travelinsurancecost: '',
    packageStatus: ''
  });

  fifthForm = this.fb.group({
    // Package name
    airlineTotal: '',
    hotelTotal: '',
    transportTotal: '',
    othercostTotal: '',

  });

  constructor(
    private router: Router,
    public authService: ApiService,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    protected dateService: NbDateService<Date>,
  ) {
    console.log(this.router.getCurrentNavigation().extras.state.example);
    this.packageIdPassed = this.router.getCurrentNavigation().extras.state.example
    console.log(this.packageIdPassed);

    this.getPackagesData();
  }

  getPackagesData() {
    return new Promise(resolve => {
      let body = {
        agentId: JSON.parse(localStorage.getItem('agentData')).result.agentid,
        packageId: this.packageIdPassed
      }
      this.authService.postData(body, 'getPackageData.php').subscribe((res: any) => {

        this.dflightnumber = res.result[0]['dep_flightname'];
        this.dflightdate = res.result[0]['dep_flightdate'];
        this.ddepartureairport = res.result[0]['dep_departureairport'];
        this.ddeparturedate = res.result[0]['dep_departuredate'];
        this.darrivalairport = res.result[0]['dep_arrivalairport'];
        this.darrivaldate = res.result[0]['dep_arrivaldate'];
        this.dairlineclass = res.result[0]['dep_airlineclass'];
        this.dcostperpax = res.result[0]['dep_flightcostperpax'];

        this.rflightnumber = res.result[0]['ret_flightname'];
        this.rflightdate = res.result[0]['ret_flightdate'];
        this.rdepartureairport = res.result[0]['ret_departureairport'];
        this.rdeparturedate = res.result[0]['ret_departuredate'];
        this.rarrivalairport = res.result[0]['ret_arrivalairport'];
        this.rarrivaldate = res.result[0]['ret_arrivaldate'];
        this.rairlineclass = res.result[0]['ret_airlineclass'];
        this.rcostperpax = res.result[0]['ret_flightcostperpax'];

        this.hotelname1 = res.result[0]['hotelname1'];
        this.stayday1 = res.result[0]['stayday1'];
        this.staynight1 = res.result[0]['staynight1'];
        this.hotelroomtype1 = res.result[0]['roomtype1'];
        this.hotelroomsize1 = res.result[0]['roomsize1'];
        this.distancetolocation1 = res.result[0]['distancetolocation1'];
        this.hotelroomview1 = res.result[0]['roomview1'];
        this.hotelmeals1 = res.result[0]['includedmeals1'];
        this.totalroomcost1 = res.result[0]['totalroomcost1'];

        this.hotelname2 = res.result[0]['hotelname2'];
        this.stayday2 = res.result[0]['stayday2'];
        this.staynight2 = res.result[0]['staynight2'];        
        this.hotelroomtype2 = res.result[0]['roomtype2'];
        this.hotelroomsize2 = res.result[0]['roomsize2'];
        this.distancetolocation2 = res.result[0]['distancetolocation2'];
        this.hotelroomview2 = res.result[0]['roomview2'];
        this.hotelmeals2 = res.result[0]['includedmeals2'];
        this.totalroomcost2 = res.result[0]['totalroomcost2'];

        this.transporttype1 = res.result[0]['transporttype1'];
        this.transportcost1 = res.result[0]['transportcost1'];
        this.transportypeincluded1 = res.result[0]['transportypeincluded1'];
        this.departuretransport1 = res.result[0]['departuretransport1'];
        this.arrivaltransport1 = res.result[0]['arrivaltransport1'];
        this.departfromtransport1 = res.result[0]['departfromtransport1'];

        this.transporttype2 = res.result[0]['transporttype2'];
        this.transportcost2 = res.result[0]['transportcost2'];
        this.transportypeincluded2 = res.result[0]['transportypeincluded2'];
        this.departuretransport2 = res.result[0]['departuretransport2'];
        this.arrivaltransport2 = res.result[0]['arrivaltransport2'];
        this.departfromtransport2 = res.result[0]['departfromtransport2'];

        this.transporttype3 = res.result[0]['transporttype3'];
        this.transportcost3 = res.result[0]['transportcost3'];
        this.transportypeincluded3 = res.result[0]['transportypeincluded3'];
        this.departuretransport3 = res.result[0]['departuretransport3'];
        this.arrivaltransport3 = res.result[0]['arrivaltransport3'];
        this.departfromtransport3 = res.result[0]['departfromtransport3'];

        this.packagename = res.result[0]['packagename'];
        this.sector = res.result[0]['packagesector'];
        this.slotsavailable = res.result[0]['slotsavailable'];
        this.evisaincluded = res.result[0]['evisaincluded'];
        this.evisacost = res.result[0]['evisacost'];
        this.mutawwifincluded = res.result[0]['mutawwifincluded'];
        this.mutawwifcost = res.result[0]['mutawwifcost'];
        this.travelinsuranceincluded = res.result[0]['travelinsuranceincluded'];
        this.travelinsurancecost = res.result[0]['travelinsurancecost'];

        console.log("PACKAGE DATA: " + this.packageData);

      }
      );
    });
  }

  form1() {

    if (this.firstForm.value.dflightnumber == "") {
      this.firstForm.value.dflightnumber = this.dflightnumber;
    }

    if (this.firstForm.value.dflightdate == "") {
      this.firstForm.value.dflightdate = this.dflightdate;
    }

    if (this.firstForm.value.ddepartureairport == "") {
      this.firstForm.value.ddepartureairport = this.ddepartureairport;
    }

    if (this.firstForm.value.ddeparturedate == "") {
      this.firstForm.value.ddeparturedate = this.ddeparturedate;
    }

    if (this.firstForm.value.darrivalairport == "") {
      this.firstForm.value.darrivalairport = this.darrivalairport;
    }

    if (this.firstForm.value.darrivaldate == "") {
      this.firstForm.value.darrivaldate = this.darrivaldate;
    }

    if (this.firstForm.value.dairlineclass == "") {
      this.firstForm.value.dairlineclass = this.dairlineclass;
    }

    if (this.firstForm.value.dcostperpax == "") {
      this.firstForm.value.dcostperpax = this.dcostperpax;
    }

    if (this.firstForm.value.rflightnumber == "") {
      this.firstForm.value.rflightnumber = this.rflightnumber;
    }

    if (this.firstForm.value.rflightdate == "") {
      this.firstForm.value.rflightdate = this.rflightdate;
    }

    if (this.firstForm.value.rdepartureairport == "") {
      this.firstForm.value.rdepartureairport = this.rdepartureairport;
    }

    if (this.firstForm.value.rdeparturedate == "") {
      this.firstForm.value.rdeparturedate = this.rdeparturedate;
    }

    if (this.firstForm.value.rarrivalairport == "") {
      this.firstForm.value.rarrivalairport = this.rarrivalairport;
    }

    if (this.firstForm.value.rarrivaldate == "") {
      this.firstForm.value.rarrivaldate = this.rarrivaldate;
    }

    if (this.firstForm.value.rairlineclass == "") {
      this.firstForm.value.rairlineclass = this.rairlineclass;
    }

    if (this.firstForm.value.rcostperpax == "") {
      this.firstForm.value.rcostperpax = this.rcostperpax;
    }
    // this.totalairlinecost = (this.firstForm.value.dcostperpax)  + (this.firstForm.value.rcostperpax);


  }

  form2() {
    if (this.secondForm.value.hotelname1 == "") {
      this.secondForm.value.hotelname1 = this.hotelname1;
    }
    if (this.secondForm.value.stayday1 == "") {
      this.secondForm.value.stayday1 = this.stayday1;
    }
    if (this.secondForm.value.staynight1 == "") {
      this.secondForm.value.staynight1 = this.staynight1;
    }
    if (this.secondForm.value.hotelroomtype1 == "") {
      this.secondForm.value.hotelroomtype1 = this.hotelroomtype1;
    }
    if (this.secondForm.value.hotelroomsize1 == "") {
      this.secondForm.value.hotelroomsize1 = this.hotelroomsize1;
    }
    if (this.secondForm.value.distancetolocation1 == "") {
      this.secondForm.value.distancetolocation1 = this.distancetolocation1;
    }
    if (this.secondForm.value.hotelroomview1 == "") {
      this.secondForm.value.hotelroomview1 = this.hotelroomview1;
    }
    if (this.secondForm.value.hotelmeals1 == "") {
      this.secondForm.value.hotelmeals1 = this.hotelmeals1;
    }
    if (this.secondForm.value.totalroomcost1 == "") {
      this.secondForm.value.totalroomcost1 = this.totalroomcost1;
    }

    if (this.secondForm.value.hotelname2 == "") {
      this.secondForm.value.hotelname2 = this.hotelname2;
    }
    if (this.secondForm.value.stayday2 == "") {
      this.secondForm.value.stayday2 = this.stayday2;
    }
    if (this.secondForm.value.staynight2 == "") {
      this.secondForm.value.staynight2 = this.staynight2;
    }
    if (this.secondForm.value.hotelroomtype2 == "") { 
      this.secondForm.value.hotelroomtype2 = this.hotelroomtype2;
    }
    if (this.secondForm.value.hotelroomsize2 == "") {
      this.secondForm.value.hotelroomsize2 = this.hotelroomsize2;
    }
    if (this.secondForm.value.distancetolocation2 == "") {
      this.secondForm.value.distancetolocation2 = this.distancetolocation2;
    }
    if (this.secondForm.value.hotelroomview2 == "") {
      this.secondForm.value.hotelroomview2 = this.hotelroomview2;
    }
    if (this.secondForm.value.hotelmeals2 == "") {
      this.secondForm.value.hotelmeals2 = this.hotelmeals2;
    }

    if (this.secondForm.value.totalroomcost2 == "") {
      this.secondForm.value.totalroomcost2 = this.totalroomcost2;
    }

    this.totalhotelcost = this.totalroomcost1 + this.totalroomcost2;

  }

  form3() {

    if (this.thirdForm.value.transporttype1 == "") {
      this.thirdForm.value.transporttype1 = this.transporttype1;
    }
    if (this.thirdForm.value.transportcost1 == "") {
      this.thirdForm.value.transportcost1 = this.transportcost1;
    }
    if (this.thirdForm.value.transportypeincluded1 == "") {
      this.thirdForm.value.transportypeincluded1 = this.transportypeincluded1;
    }
    if (this.thirdForm.value.departuretransport1 == "") {
      this.thirdForm.value.departuretransport1 = this.departuretransport1;
    }
    if (this.thirdForm.value.arrivaltransport1 == "") {
      this.thirdForm.value.arrivaltransport1 = this.arrivaltransport1;
    }
    if (this.thirdForm.value.departfromtransport1 == "") {
      this.thirdForm.value.departfromtransport1 = this.departfromtransport1;
    }

    if (this.thirdForm.value.transporttype2 == "") {
      this.thirdForm.value.transporttype2 = this.transporttype2;
    }
    if (this.thirdForm.value.transportcost2 == "") {
      this.thirdForm.value.transportcost2 = this.transportcost2;
    }
    if (this.thirdForm.value.transportypeincluded2 == "") {
      this.thirdForm.value.transportypeincluded2 = this.transportypeincluded2;
    }
    if (this.thirdForm.value.departuretransport2 == "") {
      this.thirdForm.value.departuretransport2 = this.departuretransport2;
    }
    if (this.thirdForm.value.arrivaltransport2 == "") {
      this.thirdForm.value.arrivaltransport2 = this.arrivaltransport2;
    }
    if (this.thirdForm.value.departfromtransport2 == "") {
      this.thirdForm.value.departfromtransport2 = this.departfromtransport2;
    }

    if (this.thirdForm.value.transporttype3 == "") {
      this.thirdForm.value.transporttype3 = this.transporttype3;
    }
    if (this.thirdForm.value.transportcost3 == "") {
      this.thirdForm.value.transportcost3 = this.transportcost3;
    }
    if (this.thirdForm.value.transportypeincluded3 == "") {
      this.thirdForm.value.transportypeincluded3 = this.transportypeincluded3;
    }
    if (this.thirdForm.value.departuretransport3 == "") {
      this.thirdForm.value.departuretransport3 = this.departuretransport3;
    }
    if (this.thirdForm.value.arrivaltransport3 == "") {
      this.thirdForm.value.arrivaltransport3 = this.arrivaltransport3;
    }
    if (this.thirdForm.value.departfromtransport3 == "") {
      this.thirdForm.value.departfromtransport3 = this.departfromtransport3;
    }

    this.totaltransportcost = this.transportcost1 + this.transportcost2 + this.transportcost3;
  }

  form4() {

    if (this.fourthForm.value.packagename == "") {
      this.fourthForm.value.packagename = this.packagename;
    }
    if (this.fourthForm.value.sector == "") {
      this.fourthForm.value.sector = this.sector;
    }
    if (this.fourthForm.value.slotsavailable == "") {
      this.fourthForm.value.slotsavailable = this.slotsavailable;
    }
    if (this.fourthForm.value.evisaincluded == "") {
      this.fourthForm.value.evisaincluded = this.evisaincluded;
    }
    if (this.fourthForm.value.evisacost == "") {
      this.fourthForm.value.evisacost = this.evisacost;
    }
    if (this.fourthForm.value.mutawwifincluded == "") {
      this.fourthForm.value.mutawwifincluded = this.mutawwifincluded;
    }
    if (this.fourthForm.value.mutawwifcost == "") {
      this.fourthForm.value.mutawwifcost = this.mutawwifcost;
    }
    if (this.fourthForm.value.travelinsuranceincluded == "") {
      this.fourthForm.value.travelinsuranceincluded = this.travelinsuranceincluded;
    }
    if (this.fourthForm.value.travelinsurancecost == "") {
      this.fourthForm.value.travelinsurancecost = this.travelinsurancecost;
    }
  }

  submitPackage() {

    if (this.fourthForm.value.packagename == "") {
      this.fourthForm.value.packagename = this.packagename;
    }
    if (this.fourthForm.value.sector == "") {
      this.fourthForm.value.sector = this.sector;
    }
    if (this.fourthForm.value.slotsavailable == "") {
      this.fourthForm.value.slotsavailable = this.slotsavailable;
    }
    if (this.fourthForm.value.evisaincluded == "") {
      this.fourthForm.value.evisaincluded = this.evisaincluded;
    }
    if (this.fourthForm.value.evisacost == "") {
      this.fourthForm.value.evisacost = this.evisacost;
    }
    if (this.fourthForm.value.mutawwifincluded == "") {
      this.fourthForm.value.mutawwifincluded = this.mutawwifincluded;
    }
    if (this.fourthForm.value.mutawwifcost == "") {
      this.fourthForm.value.mutawwifcost = this.mutawwifcost;
    }
    if (this.fourthForm.value.travelinsuranceincluded == "") {
      this.fourthForm.value.travelinsuranceincluded = this.travelinsuranceincluded;
    }
    if (this.fourthForm.value.travelinsurancecost == "") {
      this.fourthForm.value.travelinsurancecost = this.travelinsurancecost;
    }

    console.log("Submit package clicked");

    return new Promise(resolve => {

      this.loading = true;

      console.log(this.fourthForm.value.packagename);
      console.log(this.fourthForm.value.sector)

      let body = {
        //Package details
        packageid: this.packageIdPassed,
        packageName: this.fourthForm.value.packagename,
        packageSector: this.fourthForm.value.sector,
        slotsavailable: this.fourthForm.value.slotsavailable,
        evisaincluded: this.fourthForm.value.evisaincluded,
        evisacost: this.fourthForm.value.evisacost,
        mutawwifincluded: this.fourthForm.value.mutawwifincluded,
        mutawwifcost: this.fourthForm.value.mutawwifcost,
        travelinsuranceincluded: this.fourthForm.value.travelinsuranceincluded,
        travelinsurancecost: this.fourthForm.value.travelinsurancecost,
        packageStatus: this.fourthForm.value.packageStatus,

        //Airline Details
        dflightnumber: this.firstForm.value.dflightnumber,
        dflightdate: this.firstForm.value.dflightdate,
        ddepartureairport: this.firstForm.value.ddepartureairport,
        ddeparturedate: this.firstForm.value.ddeparturedate,
        darrivalairport: this.firstForm.value.darrivalairport,
        darrivaldate: this.firstForm.value.darrivaldate,
        dairlineclass: this.firstForm.value.dairlineclass,
        dcostperpax: this.firstForm.value.dcostperpax,

        rflightnumber: this.firstForm.value.rflightnumber,
        rflightdate: this.firstForm.value.rflightdate,
        rdepartureairport: this.firstForm.value.rdepartureairport,
        rdeparturedate: this.firstForm.value.rdeparturedate,
        rarrivalairport: this.firstForm.value.rarrivalairport,
        rarrivaldate: this.firstForm.value.rarrivaldate,
        rairlineclass: this.firstForm.value.rairlineclass,
        rcostperpax: this.firstForm.value.rcostperpax,

        //Hotel Details
        hotelname1: this.secondForm.value.hotelname1,
        stayday1: this.secondForm.value.stayday1,
        staynight1: this.secondForm.value.staynight1,
        hotelroomtype1: this.secondForm.value.hotelroomtype1,
        hotelroomsize1: this.secondForm.value.hotelroomsize1,
        distancetolocation1: this.secondForm.value.distancetolocation1,
        hotelroomview1: this.secondForm.value.hotelroomview1,
        hotelmeals1: this.secondForm.value.hotelmeals1,
        hotelroomcostpernight1: this.secondForm.value.hotelroomcostpernight1,
        totalroomcost1: this.secondForm.value.totalroomcost1,

        hotelname2: this.secondForm.value.hotelname2,
        stayday2: this.secondForm.value.stayday2,
        staynight2: this.secondForm.value.staynight2,
        hotelroomtype2: this.secondForm.value.hotelroomtype2,
        hotelroomsize2: this.secondForm.value.hotelroomsize2,
        distancetolocation2: this.secondForm.value.distancetolocation2,
        hotelroomview2: this.secondForm.value.hotelroomview2,
        hotelmeals2: this.secondForm.value.hotelmeals2,
        hotelroomcostpernight2: this.secondForm.value.hotelroomcostpernight2,
        totalroomcost2: this.secondForm.value.totalroomcost2,

        //Transport Details
        transporttype1: this.thirdForm.value.transporttype1,
        transportcost1: this.thirdForm.value.transportcost1,
        transportypeincluded1: this.thirdForm.value.transportypeincluded1,
        departuretransport1: this.thirdForm.value.departuretransport1,
        arrivaltransport1: this.thirdForm.value.arrivaltransport1,
        departfromtransport1: this.thirdForm.value.departfromtransport1,

        transporttype2: this.thirdForm.value.transporttype2,
        transportcost2: this.thirdForm.value.transportcost2,
        transportypeincluded2: this.thirdForm.value.transportypeincluded2,
        departuretransport2: this.thirdForm.value.departuretransport2,
        arrivaltransport2: this.thirdForm.value.arrivaltransport2,
        departfromtransport2: this.thirdForm.value.departfromtransport2,

        transporttype3: this.thirdForm.value.transporttype3,
        transportcost3: this.thirdForm.value.transportcost3,
        transportypeincluded3: this.thirdForm.value.transportypeincluded3,
        departuretransport3: this.thirdForm.value.departuretransport3,
        arrivaltransport3: this.thirdForm.value.arrivaltransport3,
        departfromtransport3: this.thirdForm.value.departfromtransport3,
      }

      this.authService.postData(body, 'editPackage.php').subscribe((res: any) => {
        console.log(res);
        this.responseData = res;
        console.log("RESPONSE DATA: " + this.responseData);

        if (res.success == true) {
          console.log("Package updated success")
          this.loading = false;
          console.log(res.success)

          this.dialogService.open(ShowcaseDialogComponent, {
            context: {
              title: 'Package updated successfully',
            },
          });

        } else {
          console.log("Package update failed")
          this.loading = false;
          console.log(res.success)
          this.dialogService.open(ShowcaseDialogComponent, {
            context: {
              title: 'Error: Could not edit your package. Please try again.'
            },
          });
        }
      }
      );
    });

  }


}

