import { Component, OnInit,inject } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../services/myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  responseData:any
 
   
  constructor(private service:MyserviceService,private router:Router
     ) { }
  myform=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
    userpass:new FormControl('',[Validators.required,Validators.minLength(3)])
  })
  
  
  ngOnInit(): void {
  }
  onLogin(){
    if(this.myform.valid){
      //console.log(this.myform.value);
    this.service.Login(this.myform.value).subscribe((res:any)=>{
     if(res!=null){
this.responseData=res;
console.log(this.responseData.accessToken);

localStorage.setItem('Token',this.responseData.accessToken);


this.router.navigate(['/home']);
     }
      
    })
    }
  }
  get username(){
    //...
    return this.myform.get('username');
  }
  get userpass(){
    return this.myform.get('userpass');
  }


}
