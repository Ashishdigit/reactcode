import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import TimeInput from 'react-input-time';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Userprofile extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = {
        data: [],
        input: {},
        errors: {},
        isViprole : false,
        friendsdata: [],
        postsdata: [],
        followingdata: [],
        friendsrequests: [],
        followers: [],
        tags: [],
        files: [],
        galleryimages: [],
        from : '00:00',
        to : '00:00',
        plans: [],
        checkedItems: [],
        checkall : '',
        copied: false,
        selectedFile: '',
        themecolor: '#016afb',
        themeimage: 'select2.jpg',
        setbannerimage: 'http://localhost:3000/images/bannerimage.png',
        profession:[],
        buisnessFile: [],
        childVisible: false,
        businesscardimages:[],
        drivinglicenseimage: '',
        passportimage: '',
        subcategoryprofession:[],
        professionview:'',
        subprofessionview:'',
        studentidimage:'',
        licenseimage:''
       }

       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
    //    this.imageChange = this.imageChange.bind(this);
       this.deleteGallery = this.deleteGallery.bind(this);
       this.handleBusiness = this.handleBusiness.bind(this);
       this.handleProfession = this.handleProfession.bind(this);
       this.handleadvertisementSubmit = this.handleadvertisementSubmit.bind(this);

    }

    onChange = ({target: {value}}) => {
        this.setState({value, copied: false});
    }

    onClick = ({target: {innerHTML}}) => {
        console.log(`Clicked on "${innerHTML}"!`); 
    }

    onCopy = () => {
        this.setState({copied: true});
    }

    handleInputChange= (event) => {
        let newArray = [...this.state.checkedItems, event.target.id];
        if (this.state.checkedItems.includes(event.target.id)) {
          newArray = newArray.filter(day => day !== event.target.id);
        }
        this.setState({
          checkedItems: newArray
        });
        this.setState({checkall: ''});
    }

    handleInputAllGallery = (event) => {
        if(event.target.checked){
            this.setState({checkall: event.target.id});
        }else{
            this.setState({checkall: ''});
        }
    }

    deleteGallery(event) {
        event.preventDefault();
        let curentlogin = JSON.parse(window.localStorage.getItem("user"));
        document.getElementById('loadingicon').style.display = 'block';
        const formData = new FormData();
        formData.append('id', curentlogin.value);
        formData.append('all', this.state.checkall);
        formData.append('items', this.state.checkedItems);
        axios.post('https://www.digittrix.com/staging/domaintobe/deletegalley',
                formData
            )
        .then((res) => {
            console.log(res);
            if(res.data.message == 'success'){
                this.componentDidMount();
                document.getElementById('loadingicon').style.display = 'none';
            }else{
                alert(res.data.message);
            }
        })
        .catch((error) => {
            alert('Invalid Login');
        }) 
    }


    // imageChange(event){
    //     const preview = document.querySelector('#myImg');
    //     const file = document.querySelector('input[type=file]').files[0];
    //     const reader = new FileReader();
    //     var setfile = '';
    //     reader.addEventListener("load", function () {
    //         //convert image file to base64 string
    //        preview.src = reader.result;
    //     }, false);

    //     if (file) {
    //        reader.readAsDataURL(file);
    //     }
    // }

    fileSelectedHandler = (e) => {
        this.setState({ files: [...this.state.files, ...e.target.files] });
    }

    uploadGallery = (e) => {
        e.preventDefault();
        let curentlogin = JSON.parse(window.localStorage.getItem("user"));
        document.getElementById('loadingicon').style.display = 'block';
        const formData = new FormData();
        formData.append('id', curentlogin.value);
        this.state.files.forEach((file) => formData.append('files[]', file));
        axios.post('https://www.digittrix.com/staging/domaintobe/galleryimages',
                formData
            )
        .then((res) => {
            //console.log(res);
            if(res.data.message == 'Successfully Upload'){
                alert(res.data.message);
                this.componentDidMount();
                document.getElementById('loadingicon').style.display = 'none';
            }else{
                alert(res.data.message);
            }

        })
        .catch((error) => {
            alert('Invalid Login');
        })   
    }

    componentDidMount() {
        let curentlogin = JSON.parse(window.localStorage.getItem("user"));
        const formData = new FormData();
        formData.append('id', curentlogin.value);
        formData.append('user', curentlogin.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/getuserprofile',
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
            input.referralid = res.data.message.referralid;
            input.plan = res.data.message.plan;
            input.planstatus = res.data.message.planstatus;
            input.expireddate = res.data.message.expireddate;
            input.university = res.data.message.university;
            input.certificate = res.data.message.certificate;
            input.licence = res.data.message.licence;
            input.references = res.data.message.references;
            if(res.data.message.themecolor == null){
                this.setState({ themecolor: '#016afb' });
            }else{
                this.setState({ themecolor: res.data.message.themecolor });
            }

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

            this.setState({ tags: res.data.message.tags});
            this.setState({ from: res.data.message.from});
            this.setState({ to: res.data.message.to});
            this.setState({ galleryimages: res.data.message.galleryimages});
            this.setState({ businesscardimages: res.data.message.businesscard});

            if(res.data.message.roles == 'vip'){
                this.setState({isViprole: true});
            }else{
                this.setState({isViprole: false});
            }

            
            if((res.data.message.image == null) || (res.data.message.image == '') ){
                var image = '/images/blank.png';
            }else{
                var image = res.data.message.image;
            }   
           
            const preview = document.querySelector('#myImg');
            preview.src = image;

        })
        .catch((error) => {
            alert('Invalid Login');
        })


        const formData3 = new FormData();
        formData3.append('id', curentlogin.value);
        // formData3.append('user', curentlogin.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/getusersposts',
                formData3
            )
        .then((response2) => {
            // console.log(response2);
            if(response2.data.status = 'data'){
                this.setState({postsdata: response2.data.message});
            }else{
                alert(response2.data.message);
            }

        })
        .catch((error) => {
            alert('Invalid Login');
        })


        const formData2 = new FormData();
        formData2.append('id', curentlogin.value);
        // formData2.append('user', curentlogin.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/getfollowing',
                formData2
            )
        .then((response1) => {
            //console.log(response1);
            if(response1.data.status = 'data'){
                this.setState({followingdata: response1.data.message});
            }else{
                alert(response1.data.message);
            }

        })
        .catch((error) => {
            alert('Invalid Login');
        })


        const formData1 = new FormData();
        formData1.append('id', curentlogin.value);
        formData1.append('user', curentlogin.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/getfriendlist',
                formData1
            )
        .then((response) => {
            //console.log(response);
            if(response.data.status = 'data'){
                this.setState({friendsdata: response.data.message});
            }else if(response.data.status = 'no'){

            }else{
                alert(response.data.message);
            }

        })
        .catch((error) => {
            alert('Invalid Login1');
        })


        const formData4 = new FormData();
        formData4.append('id', curentlogin.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/getfriendrequests',
                formData4
            )
        .then((response3) => {
            //console.log(response3);
            if(response3.data.status = 'data'){
                this.setState({friendsrequests: response3.data.message});
            }else{
                alert(response3.data.message);
            }

        })
        .catch((error) => {
            alert('Invalid Login1');
        })


        const formData5 = new FormData();
        formData5.append('id', curentlogin.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/getfollowers',
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
        .then((response5) => {
            //console.log(response5);
            this.setState({ plans: response5.data.result});
        })
        .catch((error) => {
            alert('Invalid Login');
        })


        axios.get('https://www.digittrix.com/staging/domaintobe/getprofessions').then(response6 => 
        {
            this.setState({profession: response6.data.message});
        }).catch((error) => {
            alert('Invalid Login');
        })

        axios.get('https://www.digittrix.com/staging/domaintobe/getprofessionssubcategories').then(response7 => 
        {
            this.setState({subcategoryprofession: response7.data.message});
        }).catch((error) => {
            alert('Invalid Login');
        })

    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
          input
        });
    }

    handleProfession(event){

        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
          input
        });

        const formData = new FormData();
        formData.append('id', event.target.value);
        axios.post('https://www.digittrix.com/staging/domaintobe/getprofessionsubcategory',
            formData
        )
        .then((res) => {
            this.setState({subcategoryprofession: res.data.result});

        })
        .catch((error) => {
            alert('Invalid Login');
        })
        
    }

    handleadvertisementSubmit(event){
        event.preventDefault();
        if(this.avalidated()){
            document.getElementById('loadingicon').style.display = 'block';
            let curentlogin = JSON.parse(window.localStorage.getItem("user"));
            const formData = new FormData();
            formData.append('userid', curentlogin.value);
            formData.append('businessname', this.state.input.abusinessname);
            formData.append('advertisement', this.state.input.advertisement);
            formData.append('duration', this.state.input.duration);
            formData.append('description', this.state.input.adescription);
            axios.post('https://www.digittrix.com/staging/domaintobe/saveadvertisement',
                formData
            )
            .then((res) => {
                document.getElementById('loadingicon').style.display = 'none';
                alert(res.data.message);
                event.target.reset();
            })
            .catch((error) => {
                alert('Invalid Login');
            })

        }
    }


    avalidated(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
  
        if (!input["advertisement"]) {
          isValid = false;
          errors["advertisement"] = "Please enter type of advertisement.";
        }
  
        if (!input["abusinessname"]) {
          isValid = false;
          errors["abusinessname"] = "Please enter your buisnessname.";
        }
  
        if (!input["duration"]) {
          isValid = false;
          errors["duration"] = "Please select duration.";
        }
  
        if (!input["adescription"]) {
          isValid = false;
          errors["adescription"] = "Please enter description.";
        }
  
        this.setState({
          errors: errors
        });
    
        return isValid;
    }



    handleSubmit(event) {
        event.preventDefault();
        if(this.validate()){

            // var imgsrc = document.getElementById("myImg").src;
            // if(imgsrc == 'http://localhost:3000/blank'){
            //     var useimage = '';
            // }else{
            //     var useimage = imgsrc;
            // }
            document.getElementById('loadingicon').style.display = 'block';
            var obj = JSON.parse(window.localStorage.getItem("user"));
            const formData = new FormData();
            formData.append('name', this.state.input.name);
            formData.append('lname', this.state.input.lname);
            formData.append('email', this.state.input.email);
            formData.append('mobile', this.state.input.mobile);
            //formData.append('profession', this.state.input.profession);
            //formData.append('buisnessname', this.state.input.buisnessname);
            //formData.append('university', this.state.input.university);
            //formData.append('certificate', this.state.input.certificate);
            //formData.append('licence', this.state.input.licence);
            formData.append('references', this.state.input.references);
            //formData.append('days', this.state.input.days);
            formData.append('address', this.state.input.address);
            formData.append('age', this.state.input.age);
            formData.append('description', this.state.input.description);
            //formData.append('from', this.state.input.from);
            //formData.append('to', this.state.input.to);
            formData.append('tags', this.state.tags);
            formData.append('userid', obj.value);
            // formData.append('image', useimage);
            formData.append('banner', this.state.selectedFile);
            formData.append('drivinglicense', this.state.drivinglicenseimage);
            formData.append('passport', this.state.passportimage);
            formData.append('studentid', this.state.studentidimage);
            formData.append('facebook', this.state.input.facebook);
            formData.append('twitter', this.state.input.twitter);
            formData.append('tumbler', this.state.input.tumbler);
            formData.append('snapchat', this.state.input.snapchat);
            formData.append('amazon', this.state.input.amazon);
            formData.append('ebay', this.state.input.ebay);
            formData.append('whatsapp', this.state.input.whatsapp);
            //formData.append('businesscard', this.state.buisnessFile);
            formData.append('bannerimage', this.state.setbannerimage);
            axios.post('https://www.digittrix.com/staging/domaintobe/saveinfo',
                formData
            )
            .then((res) => {
                if(res.data.message == 'success')
                {   document.getElementById('loadingicon').style.display = 'none';
                    alert('Successfully Update');
                    this.componentDidMount()
                }else{
                    alert(res.data.message);
                    this.componentDidMount()
                }
            })
            .catch((error) => {
                alert('Invalid Login');
            })

        }
    }

    bannerChange = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    }

    drivinglicense = (e) => {
        this.setState({ drivinglicenseimage: e.target.files[0] });
    }

    studentid = (e) => {
        this.setState({ studentidimage: e.target.files[0] });
    }

    licenceImage = (e) => {
        this.setState({ licenseimage: e.target.files[0] });
    }

    passport = (e) => {
        this.setState({ passportimage: e.target.files[0] });
    }

    validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;

      if (!input["name"]) {
        isValid = false;
        errors["name"] = "Please enter your username.";
      }
  
      if (typeof input["name"] !== "undefined") {
        const re = /^\S*$/;
        if(input["name"].length < 6 ){
            isValid = false;
            errors["name"] = "Please enter valid username.";
        }
      }

      if (!input["lname"]) {
        isValid = false;
        errors["lname"] = "Please enter your last name.";
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

      if (!input["mobile"]) {
        isValid = false;
        errors["mobile"] = "Please enter your mobile.";
      }

      if (typeof input["mobile"] !== "undefined") {
        const rep = /^\d*$/;
        if(input["mobile"].length < 10 || !rep.test(input["mobile"])){
            isValid = false;
            errors["mobile"] = "Please enter your valid 10 digit mobile.";
        }
      }

    //   if (!input["profession"]) {
    //     isValid = false;
    //     errors["profession"] = "Please enter your profession.";
    //   }

    //   if (!input["buisnessname"]) {
    //     isValid = false;
    //     errors["buisnessname"] = "Please enter your buisnessname.";
    //   }

    //   if (!input["days"]) {
    //     isValid = false;
    //     errors["days"] = "Please add your day.";
    //   }

      if (!input["address"]) {
        isValid = false;
        errors["address"] = "Please enter your address.";
      }

      if (!input["description"]) {
        isValid = false;
        errors["description"] = "Please enter your description.";
      }

      if (!input["age"]) {
        isValid = false;
        errors["age"] = "Please enter your age.";
      }

    //    if (!input["university"]) {
    //     isValid = false;
    //     errors["university"] = "Please enter your university.";
    //    }

    //     if (!input["certificate"]) {
    //     isValid = false;
    //     errors["certificate"] = "Please enter your degree certificate.";
    //     }

    //     if (!input["licence"]) {
    //         isValid = false;
    //         errors["licence"] = "Please enter your business licence.";
    //     }


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

      // if (!input["from"]) {
      //   isValid = false;
      //   errors["from"] = "Please enter from time.";
      // }

      // if (!input["to"]) {
      //   isValid = false;
      //   errors["to"] = "Please enter to time.";
      // }

      this.setState({
        errors: errors
      });
  
      return isValid;
    }

    acceptFriendrequest = (i,id)  => {
        const formData = new FormData();
        formData.append('id', id);
        axios.post('https://www.digittrix.com/staging/domaintobe/acceptfriendrequests',
            formData
        )
        .then((res) => {
            alert(res.data.message);
            window.location.reload(false);
        })
        .catch((error) => {
            alert('Invalid Login');
        })
    }

    unFriendrequest = (i,id) => {
        const formData = new FormData();
        formData.append('id', id);
        axios.post('https://www.digittrix.com/staging/domaintobe/removefriend',
            formData
        )
        .then((res) => {
            alert(res.data.message);
            window.location.reload(false);
        })
        .catch((error) => {
            alert('Invalid Login');
        })
    }

    changebutton = ()  => {
        document.getElementsByName("submitform")[0].type = "submit";
    }

    removeTag = (i) => {
        const newTags = [ ...this.state.tags ];
        newTags.splice(i, 1);
        this.setState({ tags: newTags });
    }

    inputKeyDown = (e) => {
    document.getElementsByName("submitform")[0].type = "button";
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
          if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
            return;
          }
          this.setState({ tags: [...this.state.tags, val]});
          this.tagInput.value = null;
        } else if (e.key === 'Backspace' && !val) {
          this.removeTag(this.state.tags.length - 1);
        }
    }

    cardChange = (e) => {
        this.setState({ buisnessFile: [...this.state.buisnessFile, ...e.target.files] });
    }

    onShowfields() {
        this.setState({childVisible: !this.state.childVisible});
    }

    validated(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
  
        if (!input["profession"]) {
          isValid = false;
          errors["profession"] = "Please enter your profession.";
        }
  
        if (!input["buisnessname"]) {
          isValid = false;
          errors["buisnessname"] = "Please enter your buisnessname.";
        }
  
        if (!input["days"]) {
          isValid = false;
          errors["days"] = "Please add your day.";
        }
  
        if (!input["university"]) {
          isValid = false;
          errors["university"] = "Please enter your university.";
        }
  
        if (!input["certificate"]) {
          isValid = false;
          errors["certificate"] = "Please enter your degree certificate.";
        }
  
        // if (!input["licence"]) {
        //     isValid = false;
        //     errors["licence"] = "Please enter your business licence.";
        // }
  
        // if (!input["from"]) {
        //   isValid = false;
        //   errors["from"] = "Please enter from time.";
        // }
  
        // if (!input["to"]) {
        //   isValid = false;
        //   errors["to"] = "Please enter to time.";
        // }
  
        this.setState({
          errors: errors
        });
    
        return isValid;
    }

    handleBusiness(event) {
        event.preventDefault();
        if(this.validated()){
            document.getElementById('loadingicon').style.display = 'block';
            var obj = JSON.parse(window.localStorage.getItem("user"));
            const formData = new FormData();
            formData.append('profession', this.state.input.profession);
            formData.append('buisnessname', this.state.input.buisnessname);
            formData.append('university', this.state.input.university);
            formData.append('certificate', this.state.input.certificate);
            formData.append('days', this.state.input.days);
            formData.append('subcategory', this.state.input.subprofession);
            formData.append('from', document.getElementById("from").value);
            formData.append('to', document.getElementById("to").value);
            formData.append('licenseimage', this.state.licenseimage);
            formData.append('userid', obj.value);
            this.state.buisnessFile.forEach((file) => formData.append('files[]', file));
            // formData.append('businesscard', this.state.buisnessFile);
            axios.post('https://www.digittrix.com/staging/domaintobe/businessdetails',
                formData
            )
            .then((res) => {
                if(res.data.message == 'success')
                {   document.getElementById('loadingicon').style.display = 'none';
                    alert('Successfully Update');
                    this.componentDidMount();
                }else{
                    alert(res.data.message);
                }
            })
            .catch((error) => {
                alert('Invalid Login');
            })

        }
    }

    selecthemecolor = (i,id) => {
        document.getElementById('loadingicon').style.display = 'block';
        var currentuser = JSON.parse(window.localStorage.getItem("user"));
        const formData = new FormData();
        formData.append('user', currentuser.value);
        formData.append('color', i);
        formData.append('image', id);
        axios.post('https://www.digittrix.com/staging/domaintobe/changetheme',
            formData
        )
        .then((res) => {
            if(res.data.message == 'success')
            {   
                alert('Successfully Update');
                this.componentDidMount();
            }else{
                alert(res.data.message);
            }
            document.getElementById('loadingicon').style.display = 'none';
        })
        .catch((error) => {
            alert('Invalid Login');
        })
    }

    userimage = (e) => {
        const preview = document.querySelector('#myImg');
        const file = e.target.files[0];
        const reader = new FileReader();
        var setfile = '';
        reader.addEventListener("load", function () {
            //convert image file to base64 string
        preview.src = reader.result;
        }, false);

        if (file) {
        reader.readAsDataURL(file);
        }

        var currentuser = JSON.parse(window.localStorage.getItem("user"));
        const formData = new FormData();
        formData.append('user', currentuser.value);
        formData.append('image', e.target.files[0]);
    
        axios.post('https://www.digittrix.com/staging/domaintobe/uploadimage',
            formData
        )
        .then((res) => {
            if(res.data.message == 'success')
            {   
                this.componentDidMount();
            }else{
                alert(res.data.message);
            }
        })
        .catch((error) => {
            alert('Invalid Login');
        })

    }
    
    render() {
        //console.log(this.state.checkedItems);
        //console.log(this.state.checkall);
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

        const { tags } = this.state;
        const { plans } = this.state;
        const { galleryimages } = this.state;
        const { businesscardimages } = this.state;

        const isViprole = this.state.isViprole;
        const from = this.state.from;
        const to = this.state.to;
        let vipimage,gallerybutton,theme,bannerimage,businessbutton,galleroption;
       
        if(isViprole){
            vipimage = <div className="report_btni"><img src="/images/vip.png" alt="images"/></div>;

            gallerybutton = <div className="uplodim"><input type="file" multiple onChange={this.fileSelectedHandler} accept=".jpg,.jpeg,.png, .mp4"/>Choose images<button type="button" onClick={this.uploadGallery}>Upload</button></div>;

            theme = <div class="user2">
            <h3>Select theme</h3>
            <ul class="llctthems">
                <li><span onClick={() => this.selecthemecolor('#016afb', 'select2.jpg')}    style={{ backgroundImage: `url(/images/select2.jpg)`}} ></span></li>
                <li><span onClick={() => this.selecthemecolor('#66a21c', 'select1.jpg')}  style={{ backgroundImage: `url(/images/select1.jpg)`}} ></span></li>
                <li><span onClick={() => this.selecthemecolor('#e3611c', 'select3.jpg')} style={{ backgroundImage: `url(/images/select3.jpg)`}} ></span></li>
                <li><span onClick={() => this.selecthemecolor('#000116', 'select4.jpg')} style={{ backgroundImage: `url(/images/select4.jpg)`}} ></span></li>
            </ul>
        </div>;
            
            businessbutton = <li><a data-toggle="tab" href="#business">Business Details</a></li>
            galleroption = <li><a data-toggle="tab" href="#Gallery">Gallery</a></li>
            
        }else{
            vipimage = '';
            gallerybutton = '';
            theme = '';
            businessbutton = '';
            galleroption = '';
        }

        

        return (
            <span>
                <div className="inbanner"  style={{ backgroundImage: `url(${this.state.setbannerimage})`}} ></div>
                <section className="dashboard" style={{ backgroundImage: `url(${'/images/'+this.state.themeimage})`}}>
                <div className="container">
                    <div className="loadingicon" id="loadingicon"><img src="/images/loading.gif" /></div>
                    <div className="dash_top">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="user pro_user" style={{backgroundColor: this.state.themecolor}} >
                                <div className="uphead">
                                    {vipimage}
                                    <div className="userimg">
                                        <img id="myImg" src="/images/blank.png" alt="your image" />
                                        <span className="uploadImg">
                                            <img className="camerai" src="/images/camerai.png" alt="your image" />
                                            <input className="form-control" type="file" id="userimage" name="userimage" onChange={this.userimage} accept=".jpg,.jpeg,.png"/>
                                        </span>
                                    </div>
                                    <h3>{this.state.input.name}</h3>
                                    <p>{this.state.input.description}</p>
                                    <h5>{this.state.input.email}</h5>
                                    <h6>Your code {this.state.input.referralid} 
                                    <CopyToClipboard text={'http://localhost:3000/Signup/?'+this.state.input.referralid}
                                      onCopy={() => this.setState({copied: true})}>
                                      <span style={{cursor: "pointer"}}><i className="fa fa-copy"></i></span>
                                    </CopyToClipboard>
                                    {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                                    </h6>
                                    <h6>Tags</h6>
                                    <ul>
                                        { tags.map((tag, i) => (
                                            (tag) ? <li>{tag}</li> : ""
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            {theme}
                        </div>
            </div>
            </div>
            <div className="dash_topmain">
                <i className="fas fa-bars side_b"></i>
                <div className="dash_sidebar">
                    <i className="fas fa-times side_b close"></i>
                    <ul className="nav nav-tabs">
                        <li><a className="active"data-toggle="tab" href="#posts">Posts</a></li>
                        <li><a data-toggle="tab" href="#bioinfo">Bio Information</a></li>
                        {businessbutton}
                        <li><a data-toggle="tab" href="#Friends">Friends</a></li>
                        <li><a data-toggle="tab" href="#friendrequests">Friend Requests</a></li>
                        {galleroption}
                        <li><a data-toggle="tab" href="#Followers">Followers</a></li>
                        <li><a data-toggle="tab" href="#Following">Following</a></li>
                        <li><a data-toggle="tab" href="#Membership">Vip Membership</a></li>
                        <li><a data-toggle="tab" href="#Advertisement">Advertisement</a></li>
                        <li><Link to="/userdashboard">Home</Link></li>
                    </ul>
                </div>
                <div className="tab-content">


                    <div id="posts" className="tab-pane fade show active">
                        <h3>Posts</h3>
                        <div className="listusr help Postall">
                            <div className="row">

                                {this.state.postsdata.map((resultp) => {
                                return (
                                    <div className="col-sm-6 col-lg-4  mb-3">
                                        <div className="singleposttest">
                                            <div className="asuser mb-0">
                                                <span className="userimg"><img src={resultp.userimage} align="icon"/></span>
                                                <h5>{resultp.username}
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

                    <div id="bioinfo" className="tab-pane fade">
                        <div className="bus_det editInformation">
                            <h3>Edit Bio Information</h3>
                            {/* {(() => {
                                console.log('hshhs',this.state.errors);  
                                   
                            })()} */}
                            <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-sm-6">
                                <div className="tes">
                                <h4>First Name</h4>
                                <input type="text" id="name" className="form-control" name="name" placeholder="First name" value={this.state.input.name} onChange={this.handleChange}/>
                                <div className="text-danger">{this.state.errors.name}</div>
                                </div>
                                </div>

                                <div className="col-sm-6">
                                <div className="tes">
                                <h4>Last Name</h4>
                                <input type="text" className="form-control" name="lname" placeholder="Last name" id="lname" value={this.state.input.lname} onChange={this.handleChange}/>
                                <div className="text-danger">{this.state.errors.lname}</div>
                                </div>
                                </div>

                                <div className="col-sm-6">
                                <div className="tes">
                                <h4>Email address</h4>
                                <input type="text" className="form-control" name="email" placeholder="Enter email" id="email" value={this.state.input.email} onChange={this.handleChange}/>
                                <div className="text-danger">{this.state.errors.email}</div>
                                </div>
                                </div>

                                <div className="col-sm-6">
                                <div className="tes">
                                <h4>Phone Number</h4>
                                <input type="text" className="form-control" name="mobile" placeholder="Enter number" id="mobile" value={this.state.input.mobile} onChange={this.handleChange}/>
                                <div className="text-danger">{this.state.errors.mobile}</div>
                                </div>
                                </div>

                                <div className="col-sm-6">
                                <div className="tes">
                                <h4>References</h4>
                                <input type="text"  name="references" value={this.state.input.references} onChange={this.handleChange} className="form-control" id="references" autoComplete="off"/>
                                <div className="text-danger">{this.state.errors.references}</div>
                                </div>
                                </div>

                                <div className="col-sm-6">
                                <div className="tes">
                                <h4>Address</h4>
                                <input type="text" className="form-control" name="address" id="address" placeholder="Address" value={this.state.input.address} onChange={this.handleChange}/>
                                <div className="text-danger">{this.state.errors.address}</div>
                                </div>
                                </div>

                                <div className="col-sm-6">
                                <div className="tes">
                                <h4>Dob<sup>(dd/MM/yyyy)</sup></h4>
                                <input type="text" className="form-control" name="age" id="age" placeholder="Age" value={this.state.input.age} onChange={this.handleChange}/>
                                <div className="text-danger">{this.state.errors.age}</div>
                                </div>
                                </div>

                                {/* <div className="col-sm-6">
                                <div className="tes">
                                <h4>Profile Image</h4>
                                <input type="file" className="form-control"  accept=".jpg,.jpeg,.png"/>
                                </div>
                                </div> */}

                                <div className="col-sm-6">
                                <div className="tes">
                                <h4>Tags</h4>
                                <input type="text" className="form-control" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} />
                              
                                    <ul className="input-tag__tags">
                                    { tags.map((tag, i) => (
                                        (tag) ? 
                                            <li key={tag}>
                                            {tag}
                                            <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
                                            </li>
                                        : 
                                        ""
                                    ))}
                                    <li className="input-tag__tags__input"></li>
                                    </ul>
                                      
                                
                                
                                </div>
                                </div>
                                <div className="col-sm-6"><div className="tes"><h4>Banner Image</h4><input className="form-control" type="file" id="banner" name="banner" onChange={this.bannerChange} accept=".jpg,.jpeg,.png"/></div></div>

                                <div className="col-sm-6"><div className="tes"><h4>Driving License</h4>
                                <input className="form-control" type="file" id="drivinglicense" name="drivinglicense" onChange={this.drivinglicense} accept=".jpg,.jpeg,.png"/></div></div>

                                <div className="col-sm-6"><div className="tes"><h4>Passport</h4>
                                <input className="form-control" type="file" id="passport" name="passport" onChange={this.passport} accept=".jpg,.jpeg,.png"/></div></div>

                                <div className="col-sm-6"><div className="tes"><h4>Student Id</h4>
                                <input className="form-control" type="file" id="studentid" name="studentid" onChange={this.studentid} accept=".jpg,.jpeg,.png"/></div></div>

                                <div className="col-sm-6">
                                    <div className="tes">
                                    <h4>Facebook</h4>
                                    <input type="text" className="form-control" name="facebook" id="facebook" placeholder="Facebook" value={this.state.input.facebook} onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="tes">
                                    <h4>Twitter</h4>
                                    <input type="text" className="form-control" name="twitter" id="twitter" placeholder="Twitter" value={this.state.input.twitter} onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="tes">
                                    <h4>Tumbler</h4>
                                    <input type="text" className="form-control" name="tumbler" id="tumbler" placeholder="Tumbler" value={this.state.input.tumbler} onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="tes">
                                    <h4>Snapchat</h4>
                                    <input type="text" className="form-control" name="snapchat" id="snapchat" placeholder="Snapchat" value={this.state.input.snapchat} onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="tes">
                                    <h4>Whatsapp</h4>
                                    <input type="text" className="form-control" name="whatsapp" id="whatsapp" placeholder="Whatsapp" value={this.state.input.whatsapp} onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="tes">
                                    <h4>Amazon</h4>
                                    <input type="text" className="form-control" name="amazon" id="amazon" placeholder="Amazon" value={this.state.input.amazon} onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="tes">
                                    <h4>Ebay</h4>
                                    <input type="text" className="form-control" name="ebay" id="ebay" placeholder="Ebay" value={this.state.input.ebay} onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="col-sm-12">
                                <div className="tes">
                                <h4>Bio </h4>
                                <textarea className="form-control" placeholder="Description" id="description" name="description" value={this.state.input.description} onChange={this.handleChange}></textarea>
                                <div className="text-danger">{this.state.errors.description}</div>
                                </div>
                                </div>
                            </div>
                            <button type="button" name="submitform" onClick={() => this.changebutton() }>Submit</button>
                            </form>


                        </div>
                    </div>

                    <div id="business" className="tab-pane fade show">
                        <div className="bus_det businessddl">
                            <h3>Business Details <i className="fa fa-edit" onClick={() => this.onShowfields()}></i></h3>
                            <form onSubmit={this.handleBusiness}>
                            <div className="tes">
                                <h4><b>Business Name</b> 
                                    { this.state.childVisible
                                        ? 
                                        <span>
                                        <input type="text" className="form-control" name="buisnessname" id="buisnessname" placeholder="Buisness Name" value={this.state.input.buisnessname} onChange={this.handleChange}/>
                                        <div className="text-danger">{this.state.errors.buisnessname}</div>
                                        </span> 
                                        : <span>{this.state.input.buisnessname}</span>
                                    } 
                                </h4>
                            </div>
                            <div className="tes">
                            <h4><b>Profession</b> 
                                    { this.state.childVisible
                                        ?  
                                        <span>
                                        <select className="form-control" name="profession" value={this.state.input.profession} onChange={this.handleProfession} id="profession">
                                        <option key="" value="">--Select Profession--</option>
                                        {this.state.profession.map((results) => {
                                            return (
                                                <option  value={results.id}>{results.name}
                                                </option>
                                            )
                                        })}
                                        </select>
                                        <div className="text-danger">{this.state.errors.profession}</div>
                                        </span>
                                        : <span>{this.state.input.professionview}</span>
                                    }   
                            </h4>
                            </div>

                            <div className="tes">
                            <h4><b>Subcategory Profession</b> 
                                    { this.state.childVisible
                                        ?  
                                        <span>
                                        <select className="form-control" name="subprofession" value={this.state.input.subprofession} onChange={this.handleChange} id="subprofession">
                                        <option key="" value="">--Select Subcategory--</option>
                                        {this.state.subcategoryprofession.map((results) => {
                                                return (
                                                    <option key={results.name} value={results.id} >{results.name}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                        <div className="text-danger">{this.state.errors.subprofession}</div>
                                        </span>
                                        : <span>{this.state.input.subprofessionview}</span>
                                    }   
                            </h4>
                            </div>

                            <div className="tes">
                            <h4><b>University</b> 
                                { this.state.childVisible
                                    ? 
                                    <span> 
                                    <input type="text"  name="university" value={this.state.input.university} onChange={this.handleChange} className="form-control" id="university" autoComplete="off"/>
                                    <div className="text-danger">{this.state.errors.university}</div>
                                    </span>
                                    : <span>{this.state.input.university}</span>
                                }   
                                </h4>
                            </div>
                            <div className="tes">
                                <h4><b>Degree Certificate</b> 
                                    { this.state.childVisible
                                        ? 
                                        <span> 
                                        <input type="text"  name="certificate" value={this.state.input.certificate} onChange={this.handleChange} className="form-control" id="certificate" autoComplete="off"/>
                                        <div className="text-danger">{this.state.errors.certificate}</div>
                                        </span>
                                        : <span>{this.state.input.certificate}</span>
                                    } 
                                </h4>
                            </div>

                            { this.state.childVisible
                                ?
                                <div className="tes">
                                    <h4><b>Business Licence</b> 
                                        <span> 
                                        <input type="file"  name="licence"  onChange={this.licenceImage} className="form-control" id="licence" autoComplete="off" accept=".jpg,.jpeg,.png"/>
                                        </span> 
                                    </h4>
                                </div>
                             : ""
                            }   

                            <div className="tes">
                                <h4><b>Working Days</b>
                                { this.state.childVisible
                                    ? 
                                    <span> 
                                    <select className="form-control" id="days" name="days" value={this.state.input.days} onChange={this.handleChange} id="plan">
                                    <option value="">--Select Days--</option>
                                    <option>1 Day</option>
                                    <option>2 Days</option>
                                    <option>3 Days</option>
                                    <option>4 Days</option>
                                    <option>5 Days</option>
                                    <option>6 Days</option>
                                    <option>7 Days</option>
                                    </select>
                                    <div className="text-danger">{this.state.errors.days}</div>
                                    </span>
                                     : <span>{ this.state.input.days}</span> }
                                    
                                </h4>
                               
                            </div>
                            <div className="tes">
                                <h4><b>From Time</b>
                                { this.state.childVisible
                                    ? 
                                    <span> 
                                    <TimeInput className="input-time form-control" initialTime={(this.state.from == false) ? '00:00' : this.state.from} onChange={this.handleChange} name="from" id="from"/>
                                    </span> 
                                    : <span>{ this.state.from}</span> 
                                }
                                </h4>
                            </div>
                            <div className="tes">
                                <h4><b>To Time</b>
                                { this.state.childVisible
                                    ? 
                                    <span>
                                    <TimeInput className="input-time form-control" initialTime={(this.state.to == false) ? '00:00' : this.state.to}  onChange={this.handleChange} name="to" id="to"/>
                                    </span>
                                    : <span>{ this.state.to}</span> 
                                }
                                </h4>
                            </div>
                            <div className="tes">
                                <h4><b>Business Card</b>
                                { this.state.childVisible
                                    ? 
                                    <span> 
                                        <input type="file" multiple  name="card" className="form-control" onChange={this.cardChange} id="card" autoComplete="off" accept=".jpg,.jpeg,.png"/>
                                    </span>
                                    :
                                    <div className="row"> 
                                    { businesscardimages.map((businesscardimage, i) => (
                                        <div className="col-sm-6 mb-2">
                                            <img className="cart w-100" src={businesscardimage} />
                                        </div>
                                    ))}
                                    </div>
                                }
                                </h4>
                            </div>
                            <div><button type="submit" name="" value="Submit">Submit</button></div>
                            </form>
                        </div>
                    </div>
                    
                    <div id="Friends" className="addfrbfil tab-pane fade">
                        <h3>All Friends</h3>
                        <div className="row">
                        {this.state.friendsdata.map((result, i) => {
                            return (
                            <div className="col-lg-6 mb-3">
                                <div className="testfrnd">
                                    <span className="userimg">
                                        {/* <span><i className="fas fa-video"></i></span> */}
                                        <img src={result.image} align="icon"/></span>
                                    <h5>{result.name}</h5>
                                    <p>Lorem Ipsum is simply dummy text. simply dummy text.</p>
                                    <ul className="followmessage">
                                        <li><a onClick={() => this.unFriendrequest(i, result.id)}>Remove</a></li>
                                        <li><a className="mg" onClick={() => {window.location.href="/viewprofile/"+result.friendid+'/'+result.name}}>View Profile</a></li>
                                    </ul>
                                </div>
                            </div>
                            )
                        })}
                        </div>
                    </div>
                    <div id="friendrequests" className="addfrbfil tab-pane fade">
                        <h3>All Friends Requests</h3>
                        <div className="row">

                            {this.state.friendsrequests.map((resultf, i) => {
                            return (
                            <div className="col-lg-6 mb-3">
                                <div className="testfrnd">
                                    <span className="userimg">
                                        {/* <span><i className="fas fa-video"></i></span> */}
                                        <img src={resultf.image} align="icon"/></span>
                                    <h5>{resultf.name}</h5>
                                    <p>Lorem Ipsum is simply dummy text. simply dummy text.</p>
                                    <ul className="followmessage">
                                        <li><a onClick={() => this.acceptFriendrequest(i, resultf.id)}>Add Friend</a></li>
                                        <li><a className="mg" onClick={() => {window.location.href="/viewprofile/"+resultf.userid+'/'+resultf.name}}>View Profile</a></li>
                                    </ul>
                                </div>
                            </div>
                            )
                            })}

                        </div>
                    </div>
                    <div id="Gallery" className="tab-pane fade">
                        <h3>Gallery</h3>
                        {gallerybutton}
                        <div className="row allvideoimages">
                            { galleryimages.map((galleryimage, i) => (
                                <div className="col-sm-6 col-lg-4 mb-3">
                                    {i == 0 ?  (
                                    <div className="imagetest first-imagetest">

                                    <div className="removemultipleimages">
                                        <input type="checkbox" value="all" onChange={this.handleInputAllGallery}  id="all"/>Select All
                                        <button type="button" className="btn btn-success" onClick={this.deleteGallery}>Submit</button>
                                    </div>

                                    <input type="checkbox" value={i} onChange={this.handleInputChange} id={i}/>
                                        {galleryimage.image ?  (
                                            <img className="w-100" src={galleryimage.image} alt="ion"/>
                                        ) : (
                                            <video width="320" height="240" controls src={galleryimage.video}/>
                                        )}
                                    </div>
                                    ) : (

                                    <div className="imagetest">
                                    <input type="checkbox" value={i} onChange={this.handleInputChange} id={i}/>
                                        {galleryimage.image ?  (
                                            <img className="w-100" src={galleryimage.image} alt="ion"/>
                                        ) : (
                                            <video width="320" height="240" controls src={galleryimage.video}/>
                                        )}
                                    </div>

                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id="Followers" className="addfrbfil tab-pane fade ">
                        <h3>Followers</h3>
                        <div className="row">

                            {this.state.followers.map((resultfo) => {
                            return (
                                <div className="col-lg-6 mb-3">
                                    <div className="testfrnd">
                                        <span className="userimg">
                                            {/* <span><i className="fas fa-video"></i></span> */}
                                            <img src={resultfo.image} align="icon"/></span>
                                        <h5>{resultfo.name}</h5>
                                        <ul className="followmessage">
                                            <li>
                                                <a className="mg" onClick={() => {window.location.href="/viewprofile/"+resultfo.userid+'/'+resultfo.name}}>View Profile</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                            })}

                        </div>
                    </div>
                    <div id="Following" className="addfrbfil tab-pane fade">
                        <h3>Following</h3>
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
                    <div id="Advertisement" className="tab-pane fade">
                        <h3>Advertisement</h3>
                        <div className="bus_det editInformation">
                        <form onSubmit={this.handleadvertisementSubmit}>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="tes">
                                        <h4>Business name</h4>
                                        <input type="text" id="abusinessname" className="form-control" name="abusinessname" placeholder="Business name" onChange={this.handleChange} autoComplete="off"/>
                                        <div className="text-danger">{this.state.errors.abusinessname}</div>
                                    </div>
                                </div>
                            
                                <div className="col-sm-6">
                                    <div className="tes">
                                        <h4>Type of advertisement</h4>
                                        <input type="text" id="advertisement" className="form-control" name="advertisement" placeholder="Type of advertisement"  onChange={this.handleChange} autoComplete="off"/>
                                        <div className="text-danger">{this.state.errors.advertisement}</div>
                                    </div>
                                </div>
                            

                        
                                <div className="col-sm-6">
                                    <div className="tes">
                                        <h4>Duration</h4>
                                        <select className="form-control" name="duration" onChange={this.handleChange} id="duration" autoComplete="off">
                                            <option value="">--Select Duration--</option>
                                            <option>One Week</option>
                                            <option>One Month</option>
                                        </select>
                                        <div className="text-danger">{this.state.errors.duration}</div>
                                    </div>
                                </div>
                           
                                <div className="col-sm-12">
                                    <div className="tes">
                                    <h4>Description</h4>
                                    <textarea className="form-control" placeholder="Description" id="description" name="adescription"  onChange={this.handleChange}></textarea>
                                    <div className="text-danger">{this.state.errors.adescription}</div>
                                    </div>

                                    <button >Submit</button>
                                </div>
                            </div>

                        </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </section>
            </span>
        )
    }
}

export default Userprofile;         

