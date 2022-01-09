import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChainSenseApiService } from 'src/app/services/chain-sense-api.service';
import { ChainSenseUtilityService } from 'src/app/services/chain-sense-utility.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public isFileUploaded:boolean = false;
  public buttonActionable:boolean = true;
  public imageFile:File;
  public formData:any={};
  public professions:any[]=["Actor","Actress","Sports","Politicians"];
  constructor(private CSAS:ChainSenseApiService,private CSUS:ChainSenseUtilityService) { }

  ngOnInit(): void {
  }

  onImageFileUpload(file:any){
    if(file){
      this.isFileUploaded = true
      this.imageFile = file
    }
  }

  onFormSubmit(){
    const {firstName,lastName,email,password,confirmPassword,profession} = this.formData
    if(firstName&&lastName&&email&&password&&confirmPassword&&profession&&this.imageFile && (password === confirmPassword)){
      this.buttonActionable = false;
      const multiPartData = new FormData()
      multiPartData.append('file',this.imageFile)
      multiPartData.append('firstName',firstName)
      multiPartData.append('lastName',lastName)
      multiPartData.append('email',email)
      multiPartData.append('password',password)
      multiPartData.append('confirmPassword',confirmPassword)
      multiPartData.append('profession',profession)

      this.CSAS.setUserData(multiPartData)
      .then(res=>{
        this.CSUS.cachingUsersData = ''
        this.CSUS.setActiveFilterButton = '';
        alert('Form Submitted Successfully!!')
      })
      .catch(error=>{
        console.log(error)
      })
      .finally(()=>{
        this.buttonActionable = true
      })

    }else {
      alert("Please fill the form correctly!!")
    }
  }
}
