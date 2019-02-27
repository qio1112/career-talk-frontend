import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-resume-upload',
  templateUrl: './resume-upload.component.html',
  styleUrls: ['./resume-upload.component.css']
})
export class ResumeUploadComponent implements OnInit {
  @Input() resumePath: string;
  private resumeFile: File;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() { }

  // upload resume pdf file
  onUploadResume(event: Event) {
    const file: File = (event.target as HTMLInputElement).files[0];
    this.userService.uploadResume(file)
      .subscribe(result => {
        console.log(result);
      });
  }

  // download the resume file
  onDownloadResume() {
    this.userService.downloadResume().
      subscribe(data => {
        const blob = new Blob([data], {type: 'application/pdf'});
        const downloadUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'resume.pdf';
        // a.click()
        a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        setTimeout(function () {
            window.URL.revokeObjectURL(downloadUrl);
            a.remove();
        }, 100);
      });
  }
}
