import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../api.service";
import { Router } from "@angular/router";

import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from "@nebular/theme";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
})
export class NgxLoginComponent {
  responseData: any;
  userData = { useremail: "", userpassword: "" };

  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = "primary";

  title = "Error";
  content = `Incorrect email address or password`;

  constructor(
    public authService: ApiService,
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  login() {
    if (this.userData.useremail == "") {
      alert("Please enter an email address");
    } else if (this.userData.userpassword == "") {
      alert("Please enter your password");
    } else {
      console.log(this.userData.useremail);
      console.log(this.userData.userpassword);

      //API CONNECTION TO LOGIN
      return new Promise((resolve) => {
        let body = {
          useremail: this.userData.useremail,
          userpassword: this.userData.userpassword,
        };

        this.authService.postData(body, "login.php").subscribe((res: any) => {
          if (res.success == true) {
            // this.successLogin(this.status, this.title, this.content);
            console.log("SUCCESS MESSAGE DB: " + res.success);
            // alert(res.success)
            console.log("Login SUCCESS");
            console.log(res);
            // this.router.navigate(['../../pages/iot-dashboard']);
            localStorage.setItem("userData", JSON.stringify(res));
            this.router.navigate(["/iot-dashboard"]);
          } else if (res.success == null) {
            this.emailPassWrong(this.status, this.title, this.content);
            console.log("FALSE");
          } else {
            this.emailPassWrong(this.status, this.title, this.content);
            console.log("FALSE");
          }
        });
      });
    }
  }

  private emailPassWrong(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: "danger",
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `${titleContent}`, config);
  }

  //API CONNECTION ENDS HERE
}
