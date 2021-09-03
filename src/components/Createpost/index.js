import { Link } from 'react-router-dom';
import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { getOrientation } from 'get-orientation/browser'
import ImgDialog from '../../ImgDialog'
import { getCroppedImg, getRotatedImage } from '../../canvasUtils'
import { styles } from '../../styles'
import axios from 'axios';

const ListItem = ({ value, onClick }) => (
  <li onClick={onClick}>{value}</li>
);

const List = ({ items, onItemClick }) => (
  <ul className="add_tag">
    {
      items.map((item, i) => <ListItem key={i} value={item} onClick={onItemClick} />)
    }
  </ul>
);

const Lists = ({ items, onItemClick }) => (
  <ul className="add_tag">
    {
      items.map((item, i) => <ListItem key={i} value={item} onClick={onItemClick} />)
    }
  </ul>
);


class Createpost extends React.Component { 
    constructor(props)
    {
      super(props);
      this.state = {
        data: [],
        subcat: [],
        category: '',
        input: {},
        errors: {},
        tags: [],
        inputValue: '',
        fruites: [],
        friends: [],
        files: [],
        imagesPreviewUrls: [],
        isViprole: false,
        userimage : '/images/blank.png',
        formfilled: 'notempty'
       }

       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
       this._handleImageChange = this._handleImageChange.bind(this);
       this.checkboxChecked = this.checkboxChecked.bind(this);
    }

    onClick = () => {
        const { inputValue, fruites } = this.state;
        if (inputValue) {
          const nextState = [...fruites, inputValue];
          this.setState({ fruites: nextState, inputValue: '' });
          document.getElementById('addtag').style.display = 'none';
        }
    }

    onChange = (e) => this.setState({ inputValue: e.target.value });

    handleItemClick = (e) => { console.log(e.target.innerHTML) }


    onFriendClick = () => {
        const { inputValues, friends } = this.state;
        if (inputValues) {
          const nextState = [...friends, inputValues];
          this.setState({ friends: nextState, inputValues: '' });
          document.getElementById('addfriendtag').style.display = 'none';
        }
    }

    onFriendChange  = (e) => this.setState({ inputValues : e.target.value });

    handleItemClicks = (e) => { console.log(e.target.innerHTML) }

    handleChangeLogout()
    {
      window.localStorage.clear();
      window.location.reload();
    }

    handleChangeaddtags()
    {
        document.getElementById('addtag').style.display = 'block';
    }

    handleChangeaddfriendtags(){
        document.getElementById('addfriendtag').style.display = 'block';
    }
    
    handleChange(event) {
        // console.log(event.target.checked);
        // console.log(event.target.name);
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
          input
        });
    }

    checkboxChecked(event){
        let input = this.state.input;
        input[event.target.name] = event.target.checked;
        this.setState({
          input
        });
    }


    _handleImageChange(e) {
        e.preventDefault();

        let files = Array.from(e.target.files);

        files.forEach((file) => {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({    
                     files: [...this.state.files, file],
                     imagesPreviewUrls: [...this.state.imagesPreviewUrls, reader.result]
                });
            }
            reader.readAsDataURL(file);
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.state.formfilled == 'empty'){
            alert('Complete your personal details');
            window.location = "/userprofile";
            return false;
        }else{

            if(this.validate()){
                var obj = JSON.parse(window.localStorage.getItem("user"));
                const formData = new FormData();
                formData.append('category', this.state.input.category);
                formData.append('subcategory', this.state.input.subcategory);
                formData.append('title', this.state.input.title);
                formData.append('description', this.state.input.description);
                formData.append('tags', this.state.fruites);
                formData.append('tagfriends', this.state.friends);
                formData.append('url', this.state.input.url);
                formData.append('userid', obj.value);
                formData.append('privatepost', this.state.input.private);
                this.state.files.forEach((file) => formData.append('files[]', file));

                axios.post('https://www.digittrix.com/staging/domaintobe/savediscussion',
                    formData
                )
                .then((res) => {
                    console.log(res);
                    if(res.data.message == 'success')
                    {
                        window.location.reload();
                        // this.state.input.post = "";
                    }else{
                        alert(res.data.message);
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    alert('Invalid Login');
                })
            }

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

    //   if (!input["subcategory"]) {
    //     isValid = false;
    //     errors["subcategory"] = "Please select subcategory.";
    //   }

      if (!input["title"]) {
        isValid = false;
        errors["title"] = "Please add title.";
      }

      if (!input["description"]) {
        isValid = false;
        errors["description"] = "Please add description.";
      }

      this.setState({
        errors: errors
      });
  
      return isValid;
    }
   

    componentDidMount() {
        axios.get('https://www.digittrix.com/staging/domaintobe/category').then(res => 
        {
            this.setState({data: res.data.message});
        }); 

        axios.get('https://www.digittrix.com/staging/domaintobe/subcategory').then(response => 
        {
            this.setState({subcat: response.data.message});
        });


        let curentlogin = JSON.parse(window.localStorage.getItem("user"));
        const formData = new FormData();
        formData.append('id', curentlogin.value);
        formData.append('user', curentlogin.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/getuserprofile',
                formData
            )
        .then((response) => {
            console.log(response);
            let input = this.state.input;
            input.name = response.data.message.name;
            input.uid = response.data.message.id;
            this.setState({
              input
            });
            
            if(response.data.message.roles == 'vip'){
                this.setState({formfilled: response.data.message.formfilled});
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
        let vipimage,privatepost;

        if(isViprole){
            vipimage = <img className="vip" src="/images/vip.png" align="icon"/>;
            privatepost = <p className="vipp"><label className="checkcontainer"><input type="checkbox" name="private" onChange={this.checkboxChecked}/><span className="radiobtn"></span></label>Make post private</p>;
        }else{
            vipimage = '';
            privatepost = '';
        }

        const { fruites, inputValue } = this.state;
        const { friends, inputValues } = this.state;
        return (
            <section className="maindiv">
            <i className="fas fa-bars side_b"></i>
            <div className="sidbar_left">
                <i className="fas fa-times side_b close"></i>
                <div className="logo">
                    <Link to="/userdashboard" target="_blank">
                        <img src="images/logo.png" alt="logo"/>
                    </Link>
                </div>
                <ul>
                    <li><Link className="active"  to="/userdashboard"><span><img src="images/iconS1.png" align="icon"/></span> News Feed</Link></li>
                    <li><Link  to="/messages"><span><img src="images/iconS2.png" align="icon"/></span> Messages</Link></li>
                    <li><Link  to="/requests"><span><img src="images/iconS3.png" align="icon"/></span> Requests</Link></li>
                    <li><Link  to="/followers"><span><img src="images/iconS4.png" align="icon"/></span> My Followers</Link></li>
                    <li><Link to="/blocklist" ><span><img src="/images/iconS5.png" align="icon"/></span> Blocklist</Link></li>
                    <li><Link to="/viewnotifications" ><span><img src="images/iconS6.png" align="icon"/></span> Notifications</Link></li>
                    {/* <li><Link to="pagesliked" ><span><img src="/images/iconS7.png" align="icon"/></span> Pages Liked</Link></li> */}
                    <li><Link to="/favorites"><span><img src="/images/iconS8.png" align="icon"/></span> Favorites</Link></li>
                </ul>
            </div>
            <div className="in_center in_center_discussion">
                <div className="main_menu ">
                    <ul>
                        <li><Link target="_blank" to="/userdashboard">News Feed</Link></li>
                        <li><Link target="_blank" to="/discussion" className="active">Discussion</Link></li>
                        <li><Link target="_blank" to="/help">Help</Link></li>
                        {/* <li><Link to="/blog" target="_blank">Blog</Link></li> */}
                    </ul>
                </div>
                <div className="create_post">
                    <h3>Create a Post</h3>
                    <div className="create_in">
                        <form className="add_create" onSubmit={this.handleSubmit}>
                        <ul className="select_in">
                            <li>
                                <label>Select Category</label>
                                <select value={this.state.input.category} onChange={this.handleChange} name="category" id="category">
                                    <option key="" value="">--Select Category--</option>
                                    {this.state.data.map((result) => {
                                    return (
                                        <option key={result.id} value={result.id} data-set="check">{result.catname}</option>
                                    )
                                  })}
                                </select>
                                <div className="text-danger">{this.state.errors.category}</div>
                            </li>
                            <li>
                                <label>Sub Category</label>
                                <select value={this.state.input.subcategory} onChange={this.handleChange} name="subcategory" id="subcategory">
                                    <option key="" value="">--Select Sub Category--</option>
                                    {this.state.subcat.map((result) => {
                                    return (
                                        <option key={result.id} value={result.id} data-catid={result.catid}>{result.subcat}</option>
                                    )
                                  })}
                                </select>
                                {/* <div className="text-danger">{this.state.errors.subcategory}</div> */}
                            </li>
                        </ul>
                            <input className="input" type="text" placeholder="Add Title..." name="title" value={this.state.input.title} onChange={this.handleChange} id="title" />
                            <div className="text-danger">{this.state.errors.title}</div>
                            <h4>Description</h4>
                            <textarea  placeholder="Write Here..." name="description" value={this.state.input.description} onChange={this.handleChange} id="description"></textarea>
                            <div className="text-danger">{this.state.errors.description}</div>
                            <h4>Add Photos</h4>
                            <div className="row">
                                {this.state.imagesPreviewUrls.map((imagePreviewUrl) => {
                                return <div className="col-sm-3 col-lg-2 mb-4"><img className="upim w-100" key={imagePreviewUrl} alt='previewImg' src={imagePreviewUrl} /></div>
                                 })}

                                <div className="col-sm-3 col-lg-2 mb-3">
                                    <div className="addbtn">
                                        <input type="file" name="" onChange={this._handleImageChange} multiple accept=".jpg,.jpeg,.png"/>
                                        <i className="fas fa-plus"></i>
                                    </div>
                                </div>
                            </div>
                            <h4>Add Tags</h4>
                            <List items={fruites} onItemClick={this.handleItemClick} />
                            <ul className="add_tag">
                                <span onClick={this.handleChangeaddtags.bind(this)} className="btn"><i className="fas fa-plus"></i></span>
                            </ul>
                            <div id="addtag"><input type="text" placeholder="Tags" value={inputValue} onChange={this.onChange}  id="inputtag" autoComplete="off" /><button type="button" className="btn btn-sm btn-primary" onClick={this.onClick}  >Submit</button></div>
                            <h4>
                            <Lists items={friends} onItemClick={this.handleItemClick} />
                            <img src="images/dubleicon.png" alt="images"/> Tag Friends <span onClick={this.handleChangeaddfriendtags.bind(this)} className="btn"><i className="fas fa-plus"></i></span></h4>
                                <div id="addfriendtag"><input type="text" placeholder="Friend Tags" autoComplete="off" value={inputValues} onChange={this.onFriendChange} /><button type="button" className="btn btn-sm btn-primary" onClick={this.onFriendClick} >Submit</button></div>
                            <div className="url">
                                <img src="images/addicon4.png" alt="images"/>
                                <input className="input" type="text" placeholder="Add url" name="url" value={this.state.input.url} onChange={this.handleChange}/>
                            </div>

                            {privatepost}
                            

                            <ul className="save_draft">
                                <li><a href="#" className="btn">Save as Draft</a></li>
                                <li><a href="#" className="btn">Discard</a></li>
                                <li><button type="submit" className="postbtn btn">Post</button></li>
                            </ul>
                        </form>
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
                            <a className="dropdown-item" href="#">Action</a>
                            <Link className="dropdown-item" to="/userprofile">My Profile</Link>
                            <button className="dropdown-item" onClick={this.handleChangeLogout.bind(this)}>Logout</button>
                        </div>
                    </div>
                </div>
            {/* <div className="test showchatt">
                <h3>Messages list</h3>
                <div className="all mmss">
                    <div className="testin" >
                        <div className="images">
                            <img src="images/usermsg.jpg" alt="user"/>
                        </div>
                        <h4>Emely Barnett</h4>
                        <p>Lorem Ipsum is simply.... </p>
                        <h6>6:59 AMM.</h6>
                    </div>
                    <div className="testin" >
                        <div className="images">
                            <img src="images/userimg2.jpg" alt="user"/>
                        </div>
                        <h4>Emely Barnett</h4>
                        <p>Lorem Ipsum is simply.... </p>
                        <h6>6:59 AMM.</h6>
                    </div>
                    <div className="testin" >
                        <div className="images">
                            <img src="images/userimg22.jpg" alt="user"/>
                        </div>
                        <h4>Emely Barnett</h4>
                        <p>Lorem Ipsum is simply.... </p>
                        <h6>6:59 AMM.</h6>
                    </div>
                    <div className="testin" >
                        <div className="images">
                            <img src="images/usermsg.jpg" alt="user"/>
                        </div>
                        <h4>Emely Barnett</h4>
                        <p>Lorem Ipsum is simply.... </p>
                        <h6>6:59 AMM.</h6>
                    </div>
                    <div className="testin" >
                        <div className="images">
                            <img src="images/usermsg.jpg" alt="user"/>
                        </div>
                        <h4>Emely Barnett</h4>
                        <p>Lorem Ipsum is simply.... </p>
                        <h6>6:59 AMM.</h6>
                    </div>
                </div>
            </div> */}
            </div>
        </section>
        );
    }
}

export default Createpost;