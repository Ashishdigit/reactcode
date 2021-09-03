import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
// import firebase from 'firebase';


class Viewprofile extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = {
        data: [],
        input: {},
        errors: {},
        isFriendRequest: false,
        isViprole : false,
        friendsdata: [],
        followingdata: [],
        postsdata: [],
        galleryimages: [],
        followers: [],
        firendstatus: false,
        // themecolor: '#016afb',
        themeimage: 'select2.jpg',
        setbannerimage: 'http://localhost:3000/images/bannerimage.png',
        plans: [],
        businesscardimages:[],
        from : '00:00',
        to : '00:00',
        showModal: false,
        category:[],
       }

       this.handleChange = this.handleChange.bind(this);
       this.handleHelp = this.handleHelp.bind(this);
    }


    handleChange(event) {
        let input = this.state.input;
        let errors = {};
        input[event.target.name] = event.target.value;
        this.setState({
          input
        });

        this.setState({
            errors: errors
        });
    }

    componentDidMount() {
       
        // firebase.database().ref("users").on("value", snapshot => {
        //     let volvos=snapshot.val();
        //     console.log('yyyyyyyy',volvos);
            
        // });

        let curentlogin = JSON.parse(window.localStorage.getItem("user"));
        const formData = new FormData();
        formData.append('id', this.props.match.params.name);
        formData.append('user', curentlogin.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/getuserprofilename',
                formData
            )
        .then((res) => {
            let input = this.state.input;
            input.name = res.data.message.name;
            input.email = res.data.message.email;
            input.lname = res.data.message.lname;
            input.mobile = res.data.message.mobile;
            input.profession = res.data.message.profession;
            input.subprofession = res.data.message.professionsubcategory;
            input.professionview = res.data.message.professionname;
            input.subprofessionview = res.data.message.subprofessionname;
            input.buisnessname = res.data.message.buisnessname;
            input.days = res.data.message.days;
            input.address = res.data.message.address;
            input.description = res.data.message.description;
            input.age = res.data.message.age;
            input.uid = res.data.message.id;
            input.friendstatus = res.data.message.firendrequeststatus;
            input.plan = res.data.message.plan;
            input.planstatus = res.data.message.planstatus;
            input.expireddate = res.data.message.expireddate;
            // if(res.data.message.themecolor == null){
            //     input.favcolor = '#016afb';
            //     this.setState({ themecolor: '#016afb' });
            // }else{
            //     input.favcolor = res.data.message.themecolor;
            //     this.setState({ themecolor: res.data.message.themecolor });
            // }

            if(res.data.message.themeimage == null){
                this.setState({ themeimage: 'select2.jpg' });
            }else{
                this.setState({ themeimage: res.data.message.themeimage });
            }


            if(res.data.message.bannerimage == null){
                this.setState({ setbannerimage: 'http://localhost:3000/images/bannerimage.png' });
            }else{
                this.setState({ setbannerimage: res.data.message.bannerimage });
            }

            this.setState({
              input
            });

            if(res.data.message.firendrequeststatus == 'Send Request'){
                this.setState({firendstatus: true});
            }else{
                this.setState({firendstatus: false});
            }

            this.setState({ galleryimages: res.data.message.galleryimages});
            this.setState({ businesscardimages: res.data.message.businesscard});


            if(res.data.message.roles == 'vip'){
                this.setState({isViprole: true});
            }else{
                this.setState({isViprole: false});
            }

            if(input.uid == curentlogin.value){
                this.setState({isFriendRequest: true});
            }else{
                this.setState({isFriendRequest: false});
            }

            if((res.data.message.image == null) || (res.data.message.image == '') ){
                var image = '/images/blank.png';
            }else{
                var image = res.data.message.image;
            }   

            this.setState({ from: res.data.message.from});
            this.setState({ to: res.data.message.to});
           
            const preview = document.querySelector('#myImg');
            preview.src = image;

        })
        .catch((error) => {
            alert('Invalid Login');
        })

      
        const formData1 = new FormData();
        formData1.append('id', this.props.match.params.name);
        formData1.append('user', curentlogin.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/getfriendlistname',
                formData1
            )
        .then((response) => {
            if(response.data.status = 'data'){
                this.setState({friendsdata: response.data.message});
            }else{
                alert(response.data.message);
            }

        })
        .catch((error) => {
            alert('Invalid Login1');
        })


        const formData2 = new FormData();
        formData2.append('id', this.props.match.params.name);
        axios.post('https://www.digittrix.com/staging/domaintobe/getfollowingname',
                formData2
            )
        .then((response1) => {
            if(response1.data.status = 'data'){
                this.setState({followingdata: response1.data.message});
            }else{
                alert(response1.data.message);
            }

        })
        .catch((error) => {
            alert('Invalid Login');
        })

        

        const formData3 = new FormData();
        formData3.append('id', this.props.match.params.name);
        axios.post('https://www.digittrix.com/staging/domaintobe/getuserspostsname',
                formData3
            )
        .then((response2) => {
            console.log(response2);
            if(response2.data.status = 'data'){
                this.setState({postsdata: response2.data.message});
            }else{
                alert(response2.data.message);
            }

        })
        .catch((error) => {
            alert('Invalid Login');
        })

        const formData5 = new FormData();
        formData5.append('id', this.props.match.params.name);
        axios.post('https://www.digittrix.com/staging/domaintobe/getfollowersname',
                formData5
            )
        .then((response4) => {
            if(response4.data.status = 'data'){
                this.setState({followers: response4.data.message});
            }else{
                alert(response4.data.message);
            }

        })
        .catch((error) => {
            alert('Invalid Login');
        })


        axios.post('https://www.digittrix.com/staging/domaintobe/membershipplans',
        )
        .then((response6) => {
            this.setState({ plans: response6.data.result});
        })
        .catch((error) => {
            alert('Invalid Login');
        })


        axios.get('https://www.digittrix.com/staging/domaintobe/category').then(response => 
        {
            this.setState({category: response.data.message});
        }); 
        
    }


    sendFriendRequest = (uid) => {
        let userid = JSON.parse(window.localStorage.getItem("user"));
        const formData = new FormData();
        formData.append('id', uid);
        formData.append('userid', userid.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/sendfriendrequest',
            formData
        )
        .then((res) => {
        if(res.data.message == 'success')
        {   alert('Successfully sent');
        }else if(res.data.message == 'already'){
            alert('Already sent friend request');
        }else{
            alert(res.data.message);
        }
          
        })
        .catch((error) => {
        alert('Invalid Login');
        })
    }

    sendFollowRequest = (uid) => {
    	
        let userid = JSON.parse(window.localStorage.getItem("user"));
        const formData = new FormData();
        formData.append('id', uid);
        formData.append('userid', userid.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/sendfollowrequest',
            formData
        )
        .then((res) => {
	        if(res.data.message == 'success')
	        {   alert('Successfully sent');
	        }else if(res.data.message == 'already'){
	            alert('Already sent friend request');
	        }else{
	            alert(res.data.message);
	        }
          
        })
        .catch((error) => {
        alert('Invalid Login');
        })
    }

    redirectmessages = (uid) => {
        window.location = '/messages';
    }

    helpPop(){
        this.setState({showModal: true})
    }

    closepopup(){
        this.setState({showModal: false})
    }

    handleHelp(event) {
        event.preventDefault();
        if(this.validate()){
            document.getElementById('loadingicon').style.display = 'block';
            let userid = JSON.parse(window.localStorage.getItem("user"));
            const formData = new FormData();
            formData.append('id', userid.value);
            formData.append('category', this.state.input.category);
            formData.append('message', this.state.input.message);
            formData.append('email', this.state.input.email);
            formData.append('name', this.state.input.name);
            axios.post('https://www.digittrix.com/staging/domaintobe/helpmail',
                formData
            )
            .then((res) => {
                document.getElementById('loadingicon').style.display = 'none';
                if(res.data.message == 'success')
                {  
                    this.setState({showModal: false})
                    alert('Successfully sent');
                }else{
                    alert(res.data.message);
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
  
        if (!input["category"]) {
          isValid = false;
          errors["category"] = "Please select category.";
        }
       
        if (!input["message"]) {
          isValid = false;
          errors["message"] = "Please enter text.";
        }
  
        this.setState({
          errors: errors
        });
    
        return isValid;
      }
    
    render() {
        let stringValue = window.localStorage.getItem('user');
        if (stringValue !== null) {
            let value = JSON.parse(stringValue)
            let expirationDate = new Date(value.expirationDate)
            if (expirationDate > new Date()) {
                
            }else{
                window.localStorage.removeItem('id');
                window.localStorage.removeItem('user');
                window.location = "/";
            }
        }else{
            window.localStorage.removeItem('user');
            window.location = "/";
        }

        const isFriendRequest = this.state.isFriendRequest;
        const firendstatus = this.state.firendstatus;
        const isViprole = this.state.isViprole;
        const { plans } = this.state;
        let button,reportbutton,follow,message,vipimage,advertisement,membership;

        if(isFriendRequest) {
           button = '';
           follow = '';
           message = '';
           advertisement = <li><a data-toggle="tab" href="#Membership">Vip Membership</a></li>;
            // membership = <li><a data-toggle="tab" href="#Advertisement">Advertisement</a></li>;
        }else {
            if(firendstatus){
                button = <li onClick={() => this.sendFriendRequest(this.state.input.uid)}>{this.state.input.friendstatus}</li>;
            }else{
                button = <li>{this.state.input.friendstatus}</li>;
            }

            
            follow = <li onClick={() => this.sendFollowRequest(this.state.input.uid)}>Follow</li>;
            message = <li onClick={() => this.redirectmessages()}>Message</li>;
            advertisement = '';
            // membership = '';
            
        }

        if(isViprole){
            vipimage = <div className="report_btni"><img src="/images/vip.png" alt="images"/></div>;
        }else{
            vipimage = '';
        }

        const { galleryimages } = this.state;
        const { businesscardimages } = this.state;
        const from = this.state.from;
        const to = this.state.to;


        return (
            <span>
            <div className="inbanner"  style={{ backgroundImage: `url(${this.state.setbannerimage})`}} ></div>
            <section className="dashboard dashboard_pro" style={{ backgroundImage: `url(${'/images/'+this.state.themeimage})`}}>
            <div className="container">
                <div className="dash_top">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="user usernew">
                                <div className="uphead">
                                    {vipimage}
                                    <div className="userimg">
                                        <img id="myImg" src="/images/blank.png" alt="your image" />
                                    </div>
                                    <a className="help" onClick={() => this.helpPop()}>Help <span><img src="/images/mark.png" alt="your image"/></span> </a>
                                    <ul>
                                        {button}
                                        {follow}
                                        {message}
                                    </ul>
                                </div>
                                <h3>{this.state.input.name}</h3>
                                <p>{this.state.input.description}</p>
                                <h5>{this.state.input.email}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dash_topmain dash2">
                    <i className="fas fa-bars side_b"></i>
                    <div className="dash_sidebar">
                        <i className="fas fa-times side_b close"></i>
                        <ul className="nav nav-tabs">
                            <li><a className="active" data-toggle="tab" href="#posts">Posts</a></li>
                            {(isViprole) ? (this.state.input.buisnessname) ? <li><a data-toggle="tab" href="#home">Business Details</a></li> : ""  : ""}  
                            <li><a data-toggle="tab" href="#Friends">Friends</a></li>
                            <li><a data-toggle="tab" href="#Gallery">Gallery</a></li>
                            <li><a data-toggle="tab" href="#followers">Followers</a></li>
                            <li><a data-toggle="tab" href="#following">Following</a></li>
                            {/* {membership} */}
                            {advertisement}
                        </ul>
                    </div>
                    <div className="loadingicon" id="loadingicon"><img src="/images/loading.gif" /></div>
                    <div className="tab-content">
                        <div id="home" className="tab-pane fade">
                            <div className="bus_det businessddl">
                                <div className="tes">
                                    <h4><b>Business Name</b> 
                                    <span>{this.state.input.buisnessname}</span>
                                    {/* <ul>
                                        <li>Recovered 2000 + Patients</li>
                                        <li><span><img src="/images/brand1.png" alt="icon"/></span></li>
                                        <li><span><img src="/images/brand2.png" alt="icon"/></span></li>
                                        <li><span><img src="/images/brand3.png" alt="icon"/></span></li>
                                        <button className="btn2ul">+</button>
                                    </ul> */}
                                    </h4>
                                </div>
                                <div className="tes">
                                    <h4><b>Profession</b> <span>{this.state.input.professionview}</span></h4>
                                </div>
                                <div className="tes">
                                    <h4><b>Subcategory Profession</b> <span>{this.state.input.subprofessionview}</span></h4>
                                </div>
                                <div className="tes">
                                    <h4><b>Working Days</b>
                                    <span>{this.state.input.days}</span>
                                    </h4>
                                </div>
                                <div className="tes">
                                    <h4><b>From Time</b>
                                    <span>{(this.state.from == false) ? '00:00' : this.state.from} </span>
                                    </h4>
                                </div>
                                <div className="tes">
                                    <h4><b>To Time</b>
                                    <span>{(this.state.to == false) ? '00:00' : this.state.to} </span>
                                    </h4>
                                </div>
                                <div className="tes">
                                    <h4><b>Summary</b>
                                    <span>{this.state.input.description}</span>
                                    </h4>
                                </div>
                                <div className="tes">
                                    <h4><b>Mobile Number</b> <span>{this.state.input.mobile}</span></h4>
                                </div>
                                <div className="tes">
                                    <h4><b>Address</b>
                                    <span>{this.state.input.address}</span>
                                    </h4>
                                </div>


                                <div className="tes">
                                    <h4><b>Business Card</b>
                                    <div className="row"> 
                                        { businesscardimages.map((businesscardimage, i) => (
                                            <div className="col-sm-6 mb-2">
                                                <img className="cart w-100" src={businesscardimage} />
                                            </div>
                                        ))}
                                    </div>
                                    </h4>
                                </div>
                            </div>
                        </div>
                       
                        <div id="posts" className="tab-pane fade show active">
                            <h3>Posts</h3>
                            <div className="listusr help Postall">
                                <div className="row">

                                {this.state.postsdata.map((resultp) => {
                                return (

                                    <div className="col-sm-6 col-lg-6  mb-3">
                                        <div className="singleposttest">
                                            <div className="asuser mb-0">
                                                <span className="userimg"><img src={resultp.userimage} align="icon"/></span>
                                                <h5>{resultp.username}<a className="d_report" href="#">Report</a>
                                                </h5>
                                                <p>{resultp.created} Ago</p>
                                            </div>
                                            <div className="contants">
                                              <p>{resultp.posts}</p>
                                             <a href="">View more <i className="fas fa-long-arrow-alt-right"></i></a>
                                            </div>
                                        </div>
                                    </div>

                                    )
                                })}   

                                </div>
                            </div>
                        </div>
                        
                        <div id="Gallery" className="tab-pane fade">
                            <h3>Gallery</h3>
                            <div className="row allvideoimages mt-0">

                                { galleryimages.map((galleryimage, i) => (
                                    <div className="col-sm-6 col-lg-6 mb-3">
                                        <div className="imagetest">
                                            {galleryimage.image ?  (
                                                <img className="w-100" src={galleryimage.image} alt="ion"/>
                                            ) : (
                                                <video width="320" height="240" controls src={galleryimage.video}/>
                                                    
                                            )}
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                        <div id="Friends" className="addfrbfil tab-pane fade">
                            <h3>All Friends</h3>
                            <div className="row">
                            {this.state.friendsdata.map((result) => {
                            return (
                                <div className="col-lg-6 mb-3">
                                    <div className="testfrnd">
                                        <span className="userimg">
                                            {/* <span>
                                            <i className="fas fa-video"></i>
                                            </span> */}
                                            <img src={result.image} align="icon"/></span>
                                        <h5>{result.name}</h5>
                                        <ul className="followmessage">
                                            <li className="w-100">
                                                <a className="mg" onClick={() => {window.location.href="/viewprofile/"+result.name}}>View Profile</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                )
                            })}
                            </div>
                        </div>

                        <div id="followers" className="addfrbfil tab-pane fade">
                            <h3>All Followers</h3>
                            <div className="row">
                                {this.state.followers.map((resultfo) => {
                                return (
                                    <div className="col-lg-6 mb-3">
                                        <div className="testfrnd">
                                            <span className="userimg">
                                                {/* <span><i className="fas fa-video"></i></span
                                                > */}
                                                <img src={resultfo.image} align="icon"/></span>
                                            <h5>{resultfo.name}</h5>
                                            <ul className="followmessage">
                                                <li>
                                                    <a className="mg" onClick={() => {window.location.href="/viewprofile/"+resultfo.name}}>View Profile</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                                })}
                               
                            </div>
                        </div>

                        <div id="following" className="addfrbfil tab-pane fade">
                            <h3>All Following</h3>
                            <div className="row">
                            {this.state.followingdata.map((results) => {
                            return (
                                <div className="col-lg-6 mb-3">
                                    <div className="testfrnd">
                                        <span className="userimg">
                                            {/* <span><i className="fas fa-video"></i></span> */}
                                            <img src={results.image} align="icon"/></span>
                                        <h5>{results.name}</h5>
                                        <ul className="followmessage">
                                            <li>
                                                <a className="mg" onClick={() => {window.location.href="/viewprofile/"+results.friendid+'/'+results.name}}>View Profile</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                            })}  
                            </div>
                        </div>

                        

                        <div id="Membership" className="tab-pane fade">
                        <h3>Membership</h3>
                        <div className="row">
                            { plans.map((plan, i) => (
                                            
                            <div className="col-lg-4 mb-3">
                                <div className="testup">
                                    <div className="test">
                                        <div className="head_me">
                                            <h5>{plan.duration} Plan
                                                {this.state.input.plan == plan.id ?  (
                                                    <span style={{float:'right',color:'red'}}>{this.state.input.planstatus}</span>
                                                ) : (
                                                    <span></span>
                                                )}
                                            </h5>
                                            <h4>${plan.price}</h4>
                                        </div>
                                        <h5>Features</h5>
                                        <ul>
                                            {plan.quickposting ? (
                                               <li>Quick Posting using feed along with features like attaching photo, video, tagging user and themselves too and using emojis</li>
                                              ) : (
                                               <li></li>
                                            )}

                                            {plan.messageboard ? (
                                               <li>Posting on Message board to start a discussion</li>
                                              ) : (
                                               <li></li>
                                            )}

                                            {plan.markingprofile ? (
                                               <li>Marking profile hidden while adding comments</li>
                                              ) : (
                                               <li></li>
                                            )}

                                            {plan.customprofile ? (
                                               <li>Creating custom profile page with different colour theme, Banner, photos, video, bio, URL and Location</li>
                                              ) : (
                                               <li></li>
                                            )}

                                            {plan.feed ? (
                                               <li>Posting feed or Discussion thread as private with custom duration and password access with share function</li>
                                              ) : (
                                               <li></li>
                                            )}

                                            {plan.membershiprenewal  ? (
                                               <li>To get discounts on membership renewal by allowing ads on profile page</li>
                                              ) : (
                                               <li></li>
                                            )}

                                            {plan.chatvideo  ? (
                                               <li>To receive requests for chat , video call and Help information</li>
                                              ) : (
                                               <li></li>
                                            )}

                                            {plan.galleryfiles  ? (
                                               <li>Multiple delete of gallery files</li>
                                              ) : (
                                               <li></li>
                                            )}

                                            {plan.posts  ? (
                                               <li>Search posts by date</li>
                                              ) : (
                                               <li></li>
                                            )}

                                            {plan.livevideo  ? (
                                               <li>Live video streaming</li>
                                              ) : (
                                               <li></li>
                                            )}
                                            
                                            
                                        </ul>

                                        <button className="btn btn-primary">Choose Plan</button>


                                        {this.state.input.plan == plan.id ?  (
                                            <button style={{float:'right'}} className="btn btn-success">Current Plan</button>
                                        ) : (
                                            <span></span>
                                        )}

                                        {this.state.input.plan == plan.id ?  (
                                            <h5 >Renew on: <span> {this.state.input.expireddate}</span>
                                            </h5>
                                        ) : (
                                            <span></span>
                                        )}

                                    </div>
                                </div>
                            </div>

                            ))}
                            
                            
                        </div>
                    </div>

                    <div id="Advertisement" class="tab-pane fade">
                        <h3>Advertisement</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>

                    </div>
                    <div className="psotiv_right2">
                        <i className="fas fa-times"></i>
                        <div className="inpost">
                            <h5>Advertisement</h5>
                            <img className="w-100" src="/images/limg22.jpg" align="icon"/>
                            <div className="intap">
                                <h6>Women Apparel</h6>
                                <h2>Get upto 50% Off</h2>
                            </div>
                            <a href="#">Click Here</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal fade WelcomeModal ${this.state.showModal ? 'show' : ''}`} 
            style={{
                  display: `${this.state.showModal ? 'block' : 'none'}`,
                }}
            id="WelcomeModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog " role="document">
                    <div className="modal-content">
                        <form onSubmit={this.handleHelp}>
                            <div className="modal-header">
                            <h4 className="modal-title">Help</h4>
                            </div>
                            <div className="modal-body">
                            <div className="form-group">
                                <select value={this.state.input.category}  name="category" id="category" className="form-control" onChange={this.handleChange}>
                                    <option key="" value="">--Select Category--</option>
                                    {this.state.category.map((result) => {
                                    return (
                                            <option key={result.id} value={result.catname} data-set="check">{result.catname}</option>
                                        )
                                    })}
                                </select>
                                <div className="text-danger">{this.state.errors.category}</div>
                            </div>

                            <div className="form-group">
                                <textarea className="form-control" id="message" name="message" rows="4" cols="50" onChange={this.handleChange}></textarea>
                                <div className="text-danger">{this.state.errors.message}</div>
                            </div>
                            </div>
                            <div className="modal-footer">
                            <button type="submit" className="btn btn-success">Submit</button>
                            <button type="button" className="btn btn-danger" onClick={this.closepopup.bind(this)}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



            </section>
        </span>
        )
    }
}

export default Viewprofile;