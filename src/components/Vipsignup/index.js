import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

class Vipsignup extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
          data: [],
          input: {},
          errors: {},
          plans: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        let input = this.state.input;
        input.referral = this.props.location.search.substring(1);
        this.setState({
            input
        });
    }

    componentDidMount() {
        axios.get('https://www.digittrix.com/staging/domaintobe/getplan').then(res => 
        {
            this.setState({data: res.data.message});
            //var result = arr.map(person => ({ value: person.id, text: person.name }));
            
        });
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
      
        this.setState({
          input
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.validate()){

            const formData = new FormData();
            formData.append('username', this.state.input.username);
            formData.append('email', this.state.input.email);
            formData.append('mobile', this.state.input.mobile);
            formData.append('age', this.state.input.age);
            formData.append('password', this.state.input.password);
            formData.append('plan', this.state.input.plan);
            formData.append('referral', this.state.input.referral);
            axios.post('https://www.digittrix.com/staging/domaintobe/vipsignup',
                formData
            )
            .then((res) => {
                if(res.data.message == 'success')
                {   
                    document.getElementById('successlogin').style.display = 'block';
                    setTimeout(function(){ window.location = "/"; }, 3000);
                }else{
                    
                    document.getElementById('errorlogin').style.display = 'block'; 
                    document.getElementById("errorlogin").innerHTML = res.data.message;
                    setTimeout(function(){ document.getElementById('errorlogin').style.display = 'none'; }, 2000);

                }
                
            })
            .catch((error) => {
                alert('Invalid Login');
            })
        }
    }

    validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;
   
      if (!input["username"]) {
        isValid = false;
        errors["username"] = "Please enter your username.";
      }
  
      if (typeof input["username"] !== "undefined") {
        const re = /^\S*$/;
        if(input["username"].length < 6 ){
            isValid = false;
            errors["username"] = "Please enter valid username.";
        }
      }

      if (!input["plan"]) {
        isValid = false;
        errors["plan"] = "Please select your plan.";
      }

      // if (!input["mobile"]) {
      //   isValid = false;
      //   errors["mobile"] = "Please enter your mobile.";
      // }

      if (typeof input["mobile"] !== "undefined") {
        const rep = /^\d*$/;
        if(input["mobile"].length < 10 || !rep.test(input["mobile"])){
            isValid = false;
            errors["mobile"] = "Please enter your valid 10 digit mobile.";
        }
      }

      if (!input["age"]) {
        isValid = false;
        errors["age"] = "Please enter your age.";
      }


        if (typeof input["age"] !== "undefined") {
            const rep = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
            if (rep.test(input["age"])) {
                var parts =input["age"].split("/");
                var dtDOB = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
                var dtCurrent = new Date();
                
                if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 16) {
                    isValid = false;
                    errors["age"] = "Eligibility minimum 16 years.";
                }

                if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 16) {
 
                    //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
                    if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                        isValid = false;
                        errors["age"] = "Eligibility minimum 16 years.";
                    }
                    if (dtCurrent.getMonth() == dtDOB.getMonth()) {
                        //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
                        if (dtCurrent.getDate() < dtDOB.getDate()) {
                            isValid = false;
                            errors["age"] = "Eligibility minimum 16 years.";
                        }
                    }
                }

            }else{
                isValid = false;
                errors["age"] = "Enter date in dd/MM/yyyy format ONLY.";
            }

            
        }

      
      if (!input["email"]) {
        isValid = false;
        errors["email"] = "Please enter your email Address.";
      }
  
      if (typeof input["email"] !== "undefined") {
          
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }
      }
  
      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
      }
  
      if (!input["confirm_password"]) {
        isValid = false;
        errors["confirm_password"] = "Please enter your confirm password.";
      }
  
      if (typeof input["password"] !== "undefined") {
        if(input["password"].length < 6){
            isValid = false;
            errors["password"] = "Please add at least 6 charachter.";
        }
      }
  
      if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
          
        if (input["password"] != input["confirm_password"]) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
        }
      }

      this.setState({
        errors: errors
      });
  
      return isValid;
    }


    render() {
        return (
        <section className="loginpage vipsignup">
            <div className="container">
            <Link to="/Signup" className="gologin"><img src="/images/loginarrow.png" alt="icon"/></Link>
                <div className="row">
                    <div className="col-md-6">
                        <div className="imglogin">
                            <img src="/images/loginimg.png" alt="/images"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="right_login right_signup" style={{ backgroundImage: `url(/images/signupbg1.jpg)`}}>
                            {/* <div className="plan">
                                <h5>1 Week Plan</h5>
                                <h2>$65.00 <span>/ Week</span></h2>
                            </div> */}
              <div className="lgn">
                            <h3>Sign up vip account</h3>
                            <div className="alert alert-danger" id="errorlogin"></div>
                            <div className="alert alert-success" id="successlogin">Successfully Registered</div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="text" name="username" value={this.state.input.username} onChange={this.handleChange} id="username"  className="form-control" autoComplete="off"/>
                                            <div className="text-danger">{this.state.errors.username}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="text"  name="email" value={this.state.input.email} onChange={this.handleChange}  className="form-control" id="email" autoComplete="off"/>
                                            <div className="text-danger">{this.state.errors.email}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Mobile Number</label>
                                            <input type="text" name="mobile" value={this.state.input.mobile} onChange={this.handleChange}  className="form-control" id="mobile" autoComplete="off"/>
                                            <div className="text-danger">{this.state.errors.mobile}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Dob<sup>(dd/MM/yyyy)</sup></label>
                                            <input type="text" name="age" value={this.state.input.age} onChange={this.handleChange}  className="form-control" id="age" autoComplete="off"/>
                                            <div className="text-danger">{this.state.errors.age}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Create Password</label>
                                            <input type="password" name="password"  value={this.state.input.password} onChange={this.handleChange} className="form-control" id="password"  autoComplete="off"/>
                                            <div className="text-danger">{this.state.errors.password}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Confirm Password</label>
                                            <input type="password"  name="confirm_password" value={this.state.input.confirm_password} onChange={this.handleChange} className="form-control" id="confirm_password" autoComplete="off"/>
                                            <div className="text-danger">{this.state.errors.confirm_password}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Referral Code</label>
                                            <input type="text"  name="referral" value={this.state.input.referral} onChange={this.handleChange} className="form-control" id="referral" autoComplete="off"/>
                                            <div className="text-danger">{this.state.errors.referral}</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                    <div className="form-group">
                                       <label>Plan</label>
                                        <div className="row">

                                        {this.state.data.map((result) => {
                                        return (
                                            // <input type="radio"  name="referral" key={result.id} value={result.id} onChange={this.handleChange} className="form-control"  autoComplete="off"/>
                                            <div className="col-md-12 mb-2">
                                                <div class="checkcontainer">
                                                    <input type="radio" name="plan" key={result.id} value={result.id} onChange={this.handleChange}/>
                                                    <span class="radiobtn"></span>
                                                    {result.duration} / ${result.price}
                                                </div>
                                            </div>
                                            )
                                        })}
                                        <div className="text-danger">   {this.state.errors.plan}</div>
                                        </div>
                                    </div>  
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn" type="submit">Create Account</button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    }
}
export default Vipsignup;