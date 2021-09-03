import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = {email: '',password:""};
      this.handleSubmit = this.handleSubmit.bind(this);
     
    }

    handleEmailChange(e) {
       document.getElementById('errorlogin').style.display = 'none';
       this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        document.getElementById('errorlogin').style.display = 'none';
        this.setState({password: e.target.value});
    }

   
    handleSubmit(event){
        event.preventDefault();
        const body={
            email:this.state.email,
            password:this.state.password,
        };
       
        axios.post('https://www.digittrix.com/staging/domaintobe/loginapi',
            body
        )
        .then((res) => {
        //console.log(res);
          if(res.data.status == 'login'){

            let expirationDate = new Date(new Date().getTime() + (60000 * 50))
            let newValue = {
                value: res.data.message,
                expirationDate: expirationDate.toISOString()
            }

            window.localStorage.setItem('user', JSON.stringify(newValue));

            window.location = "/userdashboard";


          }else{
            document.getElementById('errorlogin').style.display = 'block';
            document.getElementById("errorlogin").innerHTML = res.data.message;
          }
        })
        .catch((error) => {
        alert('Invalid Login');
        })

    }

  
    handleKeypress(e) {
        if (e.charCode === 13) {
            document.getElementsByName("submitform")[0].type = "submit";
        }
    }

    render() {
        return (
            <section className="loginpage">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="imglogin">
                                <img src="images/loginimg.png" alt="images"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="right_login" style={{ backgroundImage: `url(images/loginbg.jpg)`}}>
                            <div className="lgn">
                                <h3>Login</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                <div className="alert alert-danger" id="errorlogin"></div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmailChange.bind(this)} onKeyPress={this.handleKeypress.bind(this) }  />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}  onKeyPress={this.handleKeypress.bind(this) }/>
                                    </div>
                                    <button name="submitform" className="btn" type="submit">Login</button>
                                </form>
                                <h6>Don’t have an Account?  <Link to="/Signup" >Sign up</Link></h6>
                                <h6>Forget Password?</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};
    
export default Login;