import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import firebase from 'firebase';

class Messages extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = {
        input: {},
        errors: {},
        friendsdata: [],
        chatid: '',
        chatusername: '',
        chatuserimage: '',
        chatingdata: [],
        currentusername: '',
        currentuserimage: ''
       }
       this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
          input
        });
    }

    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
     
        if (!input["message"]) {
          isValid = false;
          errors["message"] = "Please add message.";
        }

        this.setState({
            errors: errors
        });
      
        return isValid;
    }

    componentDidMount() {
        let curentlogin = JSON.parse(window.localStorage.getItem("user"));
        // document.getElementById('loadingicon').style.display = 'block';
        const formData = new FormData();
        formData.append('id', curentlogin.value);
        formData.append('user', curentlogin.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/getfriendlist',formData )
        .then((response) => {
            console.log(response);
            if(response.data.status = 'data'){
                this.setState({friendsdata: response.data.message});
            }else{
                alert(response.data.message);
            }

        })
        .catch((error) => {
            alert('Invalid Login');
        })


        const formData1 = new FormData();
        formData1.append('id', curentlogin.value);
        formData1.append('user', curentlogin.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/getuserprofile',
        formData1
            )
        .then((res) => {
            this.setState({
                currentusername: res.data.message.name
            });

            let input = this.state.input;
            input.name = res.data.message.name;
            input.uid = res.data.message.id;
            this.setState({
              input
            });

            if(res.data.message.roles == 'vip'){
               
                this.setState({formfilled: res.data.message.formfilled});
                
                this.setState({isViprole: true});
            }else{
                this.setState({isViprole: false});
            }

            
            if((res.data.message.image == null) || (res.data.message.image == '') ){
                this.setState({userimage: '/images/blank.png'});
            }else{
                this.setState({userimage: res.data.message.image});
            }

        
            if((res.data.message.image == null) || (res.data.message.image == '') ){
                this.setState({currentuserimage: '/images/blank.png'});
            }else{
                this.setState({currentuserimage: res.data.message.image});
            }
          
        })
        .catch((error) => {
            alert('Invalid Login');
        })


        const db = firebase.database();
        db.ref("lastchat/" + curentlogin.value).on("value", snapshot => {
            let check = snapshot.val();
            if(check == null){
                this.setState({
                    chatuserimage: './images/blank.png'
                });
            }else{

                this.setState({
                    chatid: check.uid,
                    chatusername: check.name,
                    chatuserimage: check.image
                });

                const sender = curentlogin.value+'_'+check.uid;
                db.ref("chat/" + sender).on("value", snapshot => {
                    let chatingdatas = [];
                    snapshot.forEach(snap => {
                        chatingdatas.push(snap.val());
                    });
                    this.setState({ chatingdata: chatingdatas });
                });

            }
        });
        // document.getElementById('loadingicon').style.display = 'none';
        
    }

    selectUser = (i,friendid,name,image)  => {
        this.setState({
            chatid: friendid,
            chatusername: name,
            chatuserimage: image
        });

        let curentlogin = JSON.parse(window.localStorage.getItem("user"));
        const db = firebase.database();
        const sender = curentlogin.value+'_'+friendid;

        db.ref("chat/" + sender).on("value", snapshot => {
            let chatingdatas = [];
            snapshot.forEach(snap => {
                chatingdatas.push(snap.val());
            });
            this.setState({ chatingdata: chatingdatas });
        });
    }
    
    submitChat(e){
        e.preventDefault();
        if(this.validate()){

            let curentlogin = JSON.parse(window.localStorage.getItem("user"));

            const sender = curentlogin.value+'_'+this.state.chatid;
            const reciever = this.state.chatid+'_'+curentlogin.value;
            //const timestamp = Date.now();
            const db = firebase.database();
            //console.log('time',timestamp);
            var time = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});

            // console.log('chatuser',this.state.chatuserimage);
            // console.log('myimage',this.state.currentuserimage);

            db.ref("chat/" + sender).push({
                read: 'y',
                side: 'right',
                msg: this.state.input.message,
                image:this.state.currentuserimage,
                time: time
                
            });

            db.ref("chat/" + reciever).push({
                read: 'n',
                side: 'left',
                msg: this.state.input.message,
                image:this.state.currentuserimage,
                time: time
            });

            db.ref("chatwith/" + curentlogin.value+"/"+this.state.chatid).set({
                uid: this.state.chatid,
                name: this.state.chatusername,
                image:this.state.chatuserimage,
                msg: this.state.input.message,
                time: time
            });

            db.ref("chatwith/" + this.state.chatid+"/"+curentlogin.value).set({
                uid: curentlogin.value,
                name: this.state.currentusername,
                image:this.state.currentuserimage,
                msg: this.state.input.message,
                time: time
            });

            db.ref("lastchat/" + curentlogin.value).set({
                uid: this.state.chatid,
                name: this.state.chatusername,
                image:this.state.chatuserimage,
                msg: this.state.input.message,
                time: time
            });

            db.ref("chat/" + sender).on("value", snapshot => {
                let chatingdatas = [];
                snapshot.forEach(snap => {
                    chatingdatas.push(snap.val());
                });
                this.setState({ chatingdata: chatingdatas });
            });

            let input = this.state.input;
            input.message = "";
           
            this.setState({
              input
            });
            
        }
    }

    handleChangeLogout()
    {
    window.localStorage.clear();
    window.location.reload();
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
        const {enteredText} = this.state
       
        // console.log(this.state.formfilled);
        if(isViprole){
            vipimage = <img className="vip" src="/images/vip.png" align="icon"/>;
        }else{
            vipimage = '';
        }

        return (
            <section className="maindiv pr-0">
    <i className="fas fa-bars side_b"></i>
    <div className="sidbar_left">
        <i className="fas fa-times side_b close"></i>
        <div className="logo">
            <Link to="/userdashboard">
                <img src="images/logo.png" alt="logo"/>
            </Link>
        </div>
        <ul>
            <li><Link to="/userdashboard"><span><img src="/images/iconS1.png" align="icon"/></span> News Feed</Link></li>
            <li><Link to="/messages" className="active"><span><img src="/images/iconS2.png" align="icon"/></span> Messages</Link></li>
            <li><Link to="/requests"><span><img src="/images/iconS3.png" align="icon"/></span> Requests</Link></li>
            <li><Link to="/followers" ><span><img src="/images/iconS4.png" align="icon"/></span> My Followers</Link></li>
            <li><Link to="/blocklist"><span><img src="/images/iconS5.png" align="icon"/></span> Blocklist</Link></li>
            <li><Link to="/viewnotifications" ><span><img src="/images/iconS6.png" align="icon"/></span> Notifications</Link></li>
            {/* <li><Link to="pagesliked" ><span><img src="/images/iconS7.png" align="icon"/></span> Pages Liked</Link></li> */}
            <li><Link to="/favorites"><span><img src="/images/iconS8.png" align="icon"/></span> Favorites</Link></li>
        </ul>
    </div>
    <div className="in_center in_center_discussion messagesmain">
        <div className="main_menu ">
            <ul>
                <li>
                    <Link  to="/userdashboard" target="_blank">
                    News Feed</Link>
                </li>
                <li>
                    <Link to="/discussion" target="_blank">
                    Discussion</Link>
                </li>
                <li>
                    <Link to="/help" className="active" target="_blank">
                    Help</Link>
                </li>
                {/* <li><Link to="/blog" target="_blank">Blog</Link></li> */}
            </ul>
        </div>

        {this.state.friendsdata.length > 0  ?
        ""
        :
        <div className="loadingicon" id="loadingicon" style={{display:'block'}}><img src="/images/loading.gif" /></div>
        }

        <div className="messages chats">
            <div className="list">
                {/* <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit"><i className="fas fa-search"></i></button>
                </form> */}
                {this.state.friendsdata.length > 0  ?
                    <div className="nwekaptest">
                        {this.state.friendsdata.map((result,i) => {
                            return (
                            <div className="test" onClick={() => this.selectUser(i,result.friendid,result.name,result.image)}>
                                <div className="images">
                                    <img src={result.image} alt="user"/>
                                </div>
                                <h4>{result.name}</h4>
                            </div>
                            )
                        })}
                    </div>
                :
                ""
                }

            </div>
            <div className="row">
                <div className="col-12">
                    <div className="innchat">
                        <div className="scroll_chat">
                            <h4><img src={this.state.chatuserimage} alt="user"/> Chat With {this.state.chatusername}</h4>
                            <div className="dddd">
                                <div className="row">
                                {this.state.chatingdata.map((chat,i) => {  
                                    return (
                                        <span className="w-100">
                                        { chat.side == 'left' ? 
                                            <div className="col-12 inleft message">
                                                <div className="chatin">
                                                <p>{chat.msg}</p>
                                                    <span>{chat.time}</span>
                                                </div>
                                            </div>
                                        
                                        : 
                                            <div className="col-12 inright text-right message">
                                            <div className="chatin">
                                            <p>{chat.msg}</p>
                                                <span>{chat.time}</span>
                                            </div>
                                            </div>
                                        
                                        }
                                        
                                        </span>
                                    )
                                })}
                                </div>
                            </div>
                            <form className="intype" id={this.state.chatusername} onSubmit={this.submitChat.bind(this)}>
                                <input type="text" className="form-control" id="message" autoComplete="off" placeholder="Compose Message" onChange={this.handleChange} value={this.state.input.message} name="message"/>
                                <div className="text-danger">{this.state.errors.message}</div>
                                <button type="submit"><i className="fas fa-paper-plane"></i> <span>Send</span></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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
            <img src="images/setting.png" align="icon"/>
            </span>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to="/userprofile">My Profile</Link>
                <button className="dropdown-item" onClick={this.handleChangeLogout.bind(this)}>Logout</button>
            </div>
        </div>
    </div>
</div>
</section>
        );
    }
}

export default Messages;