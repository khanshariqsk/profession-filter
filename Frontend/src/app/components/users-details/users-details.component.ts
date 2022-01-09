import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ChainSenseApiService } from 'src/app/services/chain-sense-api.service';
import { ChainSenseUtilityService } from 'src/app/services/chain-sense-utility.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css'],
})
export class UsersDetailsComponent implements OnInit,AfterViewInit {
  public totalUsers: any[] = [...Array(8).keys()];
  public isDataFetched: boolean = false;
  public imageBaseUrl:string; 
  public professions:any[]=["Actor","Actress","Sports","Politicians"]; 

  constructor(
    private CSAS: ChainSenseApiService,
    private CSUS: ChainSenseUtilityService
  ) {
    this.imageBaseUrl = "http://localhost:8080/images" 
  }

  ngOnInit(): void {
    if (this.CSUS.getCachedUsersData?.length > 0) {
      this.isDataFetched = true;
      this.totalUsers = this.CSUS.getCachedUsersData;
    } else {
      this.CSAS.getAllUsersData()
        .then((res: any) => {
          const { allUsers } = res;
          this.totalUsers = allUsers;
          this.isDataFetched = true;
          this.CSUS.cachingUsersData = allUsers;
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }

  ngAfterViewInit(){
    const lastActiveProfessiontype = this.CSUS.getActiveFilterButton
    const allElements = document.querySelectorAll('.filter-button')
    allElements.forEach((el:any)=>{
      if(el.innerHTML === lastActiveProfessiontype){
        el.style.backgroundColor = "black";
        el.style.color = "white";
      }
    })
  }

  filterButtonHandler(event:any,prof:String){
    const targetElement = event.target
    const className = event.target.classList[0]
    const allElements = document.querySelectorAll(`.${className}`)
    
    allElements.forEach((elem:any)=>{
      elem.style.backgroundColor = "white";
      elem.style.color = "black";
    })

    targetElement.style.backgroundColor = "black";
    targetElement.style.color = "white";

    this.CSUS.setActiveFilterButton = prof;
    this.isDataFetched = false;

    this.CSAS.getUsersByProfession(prof)
    .then((res:any)=>{
      const { allUsers } = res;
      this.totalUsers = allUsers;
      this.isDataFetched = true;
      this.CSUS.cachingUsersData = allUsers;
    })
    .catch(err=>{
      console.log(err)
    })
    
  }
}
