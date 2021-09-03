import { Link } from 'react-router-dom';
import React, { useState, useRef } from "react";
import axios from 'axios';

class Professions extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            input: {},
            userimage : '/images/blank.png',
            isViprole: false,
            professions: []
        };
    }

    handleChangeLogout(){
        window.localStorage.clear();
        window.location.reload();
    }

    componentDidMount() { 
       
        let curentlogin = JSON.parse(window.localStorage.getItem("user"));
        const formData = new FormData();
        formData.append('id', curentlogin.value);
        formData.append('user', curentlogin.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/getuserprofile',
                formData
            )
        .then((response) => {
            let input = this.state.input;
            input.name = response.data.message.name;
            input.uid = response.data.message.id;
            this.setState({
              input
            });

            if(response.data.message.roles == 'vip'){
                this.setState({isViprole: true});
            }else{
                this.setState({isViprole: false});
            }
            
            if((response.data.message.image == null) || (response.data.message.image == '') ){
                this.setState({userimage: '/images/blank.png'});
            }else{
                this.setState({userimage: response.data.message.image});
            }   
           
        })
        .catch((error) => {
            alert('Invalid Login');
        })

        document.getElementById('loadingicon').style.display = 'block';
        const formData1 = new FormData();
        formData1.append('id', this.props.match.params.id);
        axios.post('https://www.digittrix.com/staging/domaintobe/getselectedprofessions',
        formData1
        )
        .then((res) => {
            this.setState({professions: res.data.data});
            document.getElementById('loadingicon').style.display = 'none';
        })
        .catch((error) => {
            alert('Invalid Login1');
        })
     
       
    }

    render() {
        let stringValue = window.localStorage.getItem('user');
        if (stringValue !== null) {
            let value = JSON.parse(stringValue)
            let expirationDate = new Date(value.expirationDate)
            if (expirationDate > new Date()) {
                
            }else{
    
                window.localStorage.removeItem('user');
                window.location = "/";
            }
        }else{
            window.localStorage.removeItem('user');
            window.location = "/";
        }

        const isViprole = this.state.isViprole;
        const userimage = this.state.userimage;
        let vipimage;

        if(isViprole){
            vipimage = <img className="vip" src="/images/vip.png" align="icon"/>;
        }else{
            vipimage = '';
        }

        return (
            <section className="maindiv">
                <i className="fas fa-bars side_b"></i>
                <div className="sidbar_left">
                    <i className="fas fa-times side_b close"></i>
                    <div className="logo">
                        <Link to="/userdashboard">
                            <img src="/images/logo.png" alt="logo"/>
                        </Link>
                    </div>
                    <ul>
                    <li><Link to="/userdashboard" className="active"><span><img src="/images/iconS1.png" align="icon"/></span> News Feed</Link></li>
                    <li><Link to="/messages"><span><img src="/images/iconS2.png" align="icon"/></span> Messages</Link></li>
                    <li><Link to="/requests"><span><img src="/images/iconS3.png" align="icon"/></span> Requests</Link></li>
                   <li><Link to="/followers"><span><img src="/images/iconS4.png" align="icon"/></span> My Followers</Link></li>
                   <li><Link to="/blocklist"><span><img src="/images/iconS5.png" align="icon"/></span> Blocklist</Link></li>
                   <li><Link to="/viewnotifications"><span><img src="/images/iconS6.png" align="icon"/></span> Notifications</Link></li>
                   {/* <li><Link to="pagesliked"><span><img src="/images/iconS7.png" align="icon"/></span> Pages Liked</Link></li> */}
                   <li><Link to="/favorites"><span><img src="/images/iconS8.png" align="icon"/></span> Favorites</Link></li>
                    </ul>
                </div>

                <div className="in_center">
                    <div className="main_menu ">
                        <ul>
                            <li><Link to="/userdashboard" className="active">News Feed</Link></li>
                            <li><Link to="/discussion" target="_blank" rel="noreferrer">Discussion</Link></li>
                            <li><Link to="/help" target="_blank" rel="noreferrer">Help</Link></li> 
                            {/* <li><Link to="/blog" target="_blank">Blog</Link></li> */}
                        </ul>
                    </div>
                    <div className="head pr-0">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" name="search" aria-label="Search" autoComplete="off"  />
                            <button className="btn" type="submit"><img src="/images/searchicon.png" alt="icon"/> </button>
                        </form>
                    </div>
                    <div className="loadingicon" id="loadingicon" style={{display:'block'}}><img src="/images/loading.gif" /></div>

                    <div className="my_followers">
                    {this.state.professions.length > 0  ? 
                        <div className="row">
                            {this.state.professions.map((results) => {
                                return (
                                    <div className="col-lg-6 col-xl-4">
                                        <div className="test">
                                            <span className="userimg"><img src={results.image} align="icon"/></span>
                                            <h5>{results.name}</h5>
                                            <p>{results.pname}</p>
                                            <p>{results.sname}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <div className="norecord">
                            <img src="/images/nodata.png" />
                        </div>
                     }
                    
                    </div>
                </div>

                <div className="side_right">
                    <div className="asuser">
                        <Link to="/userprofile">
                            <span className="userimg"><img className="w-100" src={this.state.userimage} align="icon"/></span>
                            {vipimage}
                            <h5>{this.state.input.name}</h5>
                        </Link>
                        <div className="dropdown">
                            <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src="/images/setting.png" align="icon"/>
                            </span>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <Link className="dropdown-item" to="/userprofile">My Profile</Link>
                                <button className="dropdown-item" onClick={this.handleChangeLogout.bind(this)}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
        )
    }

}

export default Professions;  