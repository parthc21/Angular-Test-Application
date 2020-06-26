import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginBtn : any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,ReactiveFormsModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginBtn = fixture.debugElement.query(By.css('.buttonStyle')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain default value for login form',()=>{
    expect(component.loginForm.value).toEqual({emailId : '', password : ''});
  })

  it('form is valid then should navigate to dashboard',()=>{
    component.loginForm.setValue({emailId : 'parthc21@gmail.com',password: 'parth1996'});
    spyOn(component.router,'navigate');
    component.login();
    expect(component.router.navigate).toHaveBeenCalled();
  })

  it('when email and password  invalid then show error message',()=>{
    let errorMessage = "Please enter email as parthc21@gmail.com and password as parth1996";
    component.loginForm.setValue({emailId : 'xyz@gmail.com',password: 'xyz123'});
    component.login();
    expect(component.errorMessage).toEqual(errorMessage);
  })
  

  it('form invalid when empty',()=>{
    component.loginForm.controls['emailId'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  })

  it('should be valid form',()=>{
    component.loginForm.controls['emailId'].setValue('admin@gmail.com');
    component.loginForm.controls['password'].setValue('admin@123');
    expect(component.loginForm.valid).toBeTruthy();
  })

  it('emailId field validity',()=>{
    let email = component.loginForm.controls['emailId'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors['required']).toBeTruthy();
  })

  it('Password field validity',()=>{
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    expect(password.pristine).toBeTruthy();
    expect(password.errors['required']).toBeTruthy();

    component.loginForm.controls['password'].setValue('123');
    expect(password.errors['minlength']).toBeTruthy();


  })

  it('should check loginBtn is disabled initially',() => {
      expect(loginBtn.disabled).toBe(true)
  });

  it('should check loginBtn is enabled after inputs check out', () => {
    component.loginForm.controls['emailId'].setValue('parthc21@gmail.com');
    component.loginForm.controls['password'].setValue('parth1996');
    fixture.detectChanges();
    expect(loginBtn.disabled).toBe(false)
    
    
  });
});
