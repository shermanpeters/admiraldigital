import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from '../../../../api.service';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { Router } from '@angular/router'


import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'ngx-faceverpopup',
  templateUrl: './faceverpopup.component.html',
  styleUrls: ['./faceverpopup.component.scss']
})
export class FaceverpopupComponent {

  selectedFile: File = null;

  constructor(
    protected ref: NbDialogRef<FaceverpopupComponent>,
    public authService: ApiService,
    private dialogService: NbDialogService,
    private router: Router,
    public http: HttpClient,

    
  ) {
    console.log(JSON.parse(localStorage.getItem('companyData')).result.companyid);

    //RETRIEVE DATA FROM FACEVERIFY COMPONENT
    var retrievedObject = localStorage.getItem('employeeFaceVer');
    console.log('employeeFaceVer: ', JSON.parse(retrievedObject));
    console.log(JSON.parse(localStorage.getItem('employeeFaceVer')).empid);
  }

  cancel() {
    this.ref.close();
  }

  imageManual(event) {
    console.log(event.data.employeeid)
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    const fd = new FormData;
    fd.append('image', this.selectedFile, JSON.parse(localStorage.getItem('employeeFaceVer')).docNo + '.png');
    fd.append('empid' , JSON.parse(localStorage.getItem('employeeFaceVer')).empid) , JSON.parse(localStorage.getItem('employeeFaceVer')).empid;
    
    this.http.post('https://pcis.borderpass.com/api/manualupload.php', fd).subscribe(res => {
      console.log("XXXXXXXXXXXX: " + res['success']);
      if (res['success']) {
        this.dialogService.open(ShowcaseDialogComponent, {
          context: {
            title: 'User image has been uploaded successfully',
          },
        });
        this.ref.close();
      }
      else {
        this.dialogService.open(ShowcaseDialogComponent, {
          context: {
            title: 'Error: There was a problem uploading user image',
          },
        });
      }
    })
  }


}
