import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from '../../../../api.service';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { Router } from '@angular/router'

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent {

  agentid: any;
  responseData: any;

  constructor(
    protected ref: NbDialogRef<DialogNamePromptComponent>,
    public authService: ApiService,
    private dialogService: NbDialogService,
    private router: Router) {
    console.log(JSON.parse(localStorage.getItem('agentData')).result.agentid);
  }

  cancel() {
    this.ref.close();
  }

  submit(oldpass, newpass, comparepass) {
    if (oldpass == "") {
      alert("Please enter your old password")
    }

    else if (newpass == "") {
      alert("Please enter your new password")
    }

    else if (newpass != comparepass) {
      alert("New passwords do not match")
    }

    else {

      console.log(oldpass + ' ' + newpass);
      return new Promise(resolve => {
        let body = {

          //user details
          agentid: JSON.parse(localStorage.getItem('agentData')).result.agentid,
          oldpassword: oldpass,
          newpassword: newpass
        }

        this.authService.postData(body, 'changePassword.php').subscribe((res: any) => {
          console.log(res);
          this.responseData = res;
          console.log("RESPONSE DATA: " + this.responseData);

          if (res.msg == "New password updated") {
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Password changed successfully',
              },
            });
          }

          else if (res.msg == "Wrong old password") {
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Error: Old password is incorrect. Please try again',

              },
            });
          }

          else {
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Error: We could not change your password. Please try again.'
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