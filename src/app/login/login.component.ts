import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  department:any[]=[]
  Deptobj:any={
    "departmentName": "",
    "departmentLogo": ""
  }

  http=inject(HttpClient)

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.http.get("https://projectapi.gerasim.in/api/Complaint/GetParentDepartment")
    .subscribe((result:any)=>{

      this.department=result.data
    })
  }
  onsubmit(){
    this.http.post("https://projectapi.gerasim.in/api/Complaint/AddNewDepartment",this.Deptobj).subscribe((result:any)=>{
      if(result.result){
        alert("your record created succesfully")
        this.getData()
      
      }
      else{
        alert(result.error);
        
      }
    })

    console.log(this.Deptobj)

  }
  onUpdate(){
    this.http.post("https://projectapi.gerasim.in/api/Complaint/UpdateDepartment",this.Deptobj).subscribe((result:any)=>{
      if(result.result){
        alert("your record updated succesfully")
        this.getData()
      
      }
      else{
        alert(result.error);
        
      }
    })
  }
  onDelete(id:any){
    const isDelete= confirm("are you  sure")
    if(isDelete){
    this.http.delete("https://projectapi.gerasim.in/api/Complaint/DeletedepartmentBydepartmentId"+id).subscribe
    ((result:any)=>{
      if(result.result){
        alert("your record  deleted succesfully")
        this.getData()
      
      }
      else{
        alert(result.error);
      }

    })
  }
}}
