import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from '../../../../api.service';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.scss']
})
export class CompanyprofileComponent {

  ldagentid: any;
  responseData: any;
  ldagentname: any;
  ldagentemail: any;
  ldagentphone: any;
  ldagentaddress: any;

  constructor(
    protected ref: NbDialogRef<CompanyprofileComponent>,
    public authService: ApiService,
    private dialogService: NbDialogService,
    private router: Router) {
    console.log(JSON.parse(localStorage.getItem('agentData')).result.agentid);

    this.ldagentid = JSON.parse(localStorage.getItem('agentData')).result.agentid;
    this.ldagentname = JSON.parse(localStorage.getItem('agentData')).result.agentname;
    this.ldagentemail = JSON.parse(localStorage.getItem('agentData')).result.agentemail;
    this.ldagentphone = JSON.parse(localStorage.getItem('agentData')).result.agentphone;
    this.ldagentaddress = JSON.parse(localStorage.getItem('agentData')).result.agentaddress;
  }

  cancel() {
    this.ref.close();
  }

  submit(agentname, agentemail, agentphone, agentaddress) {

    console.log("XXX: " + agentname, agentemail, agentphone, agentaddress)

    if (agentname == "") {
      alert("Company name cannot be empty")
    }

    else if (agentemail == "") {
      alert("Company email cannot be empty")
    }

    else if (agentphone == "") {
      alert("Company phone number cannot be empty")
    }

    else if (agentaddress == "") {
      alert("Company occupancy cannot be empty")
    }

    else {
      return new Promise(resolve => {
        let body = {

          //user details
          agentid: JSON.parse(localStorage.getItem('agentData')).result.agentid,
          agentname: agentname,
          agentemail: agentemail,
          agentphone: agentphone,
          agentaddress: agentaddress,  
        }

        this.authService.postData(body, 'updateAgent.php').subscribe((res: any) => {
          console.log(res);
          this.responseData = res;
          console.log("RESPONSE DATA: " + this.responseData);

          if (res.msg == "Travel agent updated") {

            alert("Travel agent profile updated successfully. Please log in again with your new details.")
            this.logout();
          }

          else if (res.msg == "Error updating" || res.msg == "Error") {
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Error: Sorry! We could not update the company profile.',

              },
            });
          }

          else {
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Error: We could not update your company profile. Please try again.'
              },
            });
          }
        }
        );
      });
    }
  }

  logout() {
    console.log("Clicked on logout");
    this.router.navigate(['/auth/login']);
    localStorage.clear();
  }

}