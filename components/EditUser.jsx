import styles from "../styles/adminNew.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import {storage} from "../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import Progress from "./Progress"; 
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {fieldofstudyOptions,educationlevelOptions,languagesOptions,countriesOptions} from "./data"
import Select from '@mui/material/Select';
import { InputLabel } from "@mui/material";
import Image from "next/image";
import Autocomplete from '@mui/material/Autocomplete';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect } from "react";
import Error from "./Error";
const EditUser = ({user,token,crews,providers,talents}) => {
    const [file, setFile] = useState(null);
    const [country, setCountry] = useState(user.address?.country);
    const [city, setCity] = useState(user.address?.city || "");
    const [lat, seLat] = useState(user.location?.lat);
    const [long, setLong] = useState(user.location?.long);
    const [url, setUrl] = useState(user.url||"");
    const [department, setDepartment] = useState(user.department);
    const [speciality, setSpeciality] = useState(user.speciality);
    const [category, setCategory] = useState(user.category);
    const [yearsofexperience, setYearsofexperience] = useState(user.yearsofexperience);
    const [interests, setInterests] = useState(user.interests);
    const [interest, setInterest] = useState("");
    const [view, setView] = useState(user.view);
    const [linkedin, setLinkedin] = useState(user.links[0]?.link);
    const [imdb, setImdb] = useState(user.links[1]?.link);
    const [vimeo, setVimeo] = useState(user.links[2]?.link);
    const [educationlevel, setEducationlevel] = useState(user.education?.educationlevel);
    const [fieldofstudy,setFieldofstudy] = useState(user.education?.fieldofstudy);
    const [graduationyear,setGraduationyear] = useState(user.education?.graduationyear);
    const [showreel, setShowreel] = useState(user.showreel||[]);
    const [about,setAbout] = useState(user.about)
    const [languages,setLanguages] = useState(user.languages);
    const [language,setLanguage] = useState("");
    const [fullname, setFullname] = useState(user.fullname);
    const [email, setEmail] = useState(user.email);
    const [phonenumber,setPhonenumber]= useState(user.phonenumber);
    const [username, setUsername] = useState(user.fullname);
    const [role,setRole]= useState(user.role);
    const [loading,setLoading] = useState (false);
    const [loadingSR,setLoadingSR]= useState(false);
    const router = useRouter();
    const [error,setError]= useState("");
    const [options,setOptions] = useState ([]);
    useEffect(()=>{
      if(department=="Talents"){
        setOptions(talents)
      }else if(department=="Service Providers"){
        setOptions(providers)
      }else{
        setOptions(crews)
      }
    },[department])
    
    const handleFile1 = async (val) => {
      setLoadingSR(true);
      const img = await uploadFiles(val);
      setShowreel((prev) => [...prev, img]);
      setLoadingSR(false);
    };

    const postUser = async (pay) => {
      var res1 = {}
      const server = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        headers: {'Content-Type':'application/json'},
        withCredentials: true
      });
      server.interceptors.request.use(
        async function (config) {
          const accessToken =  token;
          if (accessToken) {
            config.headers.authorization = accessToken;
          }
          return config;
        },
        async function (error) {
          return Promise.reject(error);
        },
      );
      try{
        const res11 = await server.put(`api/users/${user._id}/`, pay);
        res1=res11;
    }catch(err){
      if(err&&err.response?.status>=300){
        return {
          redirect: {
            permanent: false,
            destination: "/"
          },
        };
      }
    }
        return res1;
    }
    const handleClear = ()=>{
      setShowreel([]);
    }
    const addInterest = (e) => {
      if(interest=="" || interests.includes(interest)) return;
      setInterests((prev) => [...prev, interest]);
      setInterest("");
    }
    const addLanguage = (e) => {
      if(language=="" || languages.includes(language)) return;
      setLanguages((prev) => [...prev, language]);
      setLanguage("");
    }
    const handleInterest = (index) => {
      const removedInterest = interests.splice(index,1);
      setInterests(interests.filter((option) =>(option!==removedInterest[0])));
    };
    const handleLanguage = (index) => {
      const removedLanguage = languages.splice(index,1);
      setLanguages(languages.filter((option) =>(option!==removedLanguage[0])));
    };
    const validate = ()=>{
      if(city?.length>15){
        setError("Please enter a valide city.")
        return false;
      }else if(username.length>20){
        setError("Please shorten your username.")
        return false;
      }else if(graduationyear?.length>5){
        setError("Please enter a valid year.")
        return false;
      }else if(fullname.length>20){
        setError("Please shorten your fullname.")
        return false;
      }else if(email?.length>40){
        setError("Please enter a valid email.")
        return false;
      }else if(phonenumber?.length>30){
        setError("Please enter a valid phone number.")
        return false;
      }else{
        return true;
      }
    }
    const handleSave = async()=>{
      const validated = validate();
      if(!validated) return;
      setLoading(true);
      var img="";
      if(file!=null){
          img = await uploadFiles(file);
      }else{
          img = user.image;
      }
      const payload = {username,fullname,image:img,phonenumber,address:{country,city},email,url,view,about,department,speciality,category,yearsofexperience,interests,links:[{provider:"linkedin",link:linkedin},{provider:"imdb",link:imdb},{provider:"vimeo",link:vimeo}],education:{educationlevel,fieldofstudy,graduationyear},languages,showreel};
      try{
        postUser(payload);
        setLoading(false);
        router.push("/");
      }catch(err){
        console.log(err);
      }  
    }

    const handleShowreel = (index) => {
      const removedSlide = showreel.splice(index,1);
      setShowreel(showreel.filter((option) =>(option!==removedSlide[0])));
    };

      function uploadFiles (file){
        if(!file) return;
        return new Promise(resolve =>{
          const storageRef = ref(storage, `/pizzas/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on("state_changed",(snapshot) =>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100);
          }, (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then(urlz => {
              resolve(urlz);
            }
            )
          }
          );
        })
      };
  return (
    <div className={styles.new}>
      <div className={styles.newContainer}>
        <div className={styles.top}>
          <h1>Edit Your Profile</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <div className={styles.imgCon}>
              <Image
                src={
                  file
                    ? URL.createObjectURL(file)
                    : user.image ? user.image
                    : img
                }
                alt=""
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className={styles.imageInput}>
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className={styles.icon} />
                </label>    
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  /> 
              </div>
          </div>
          <div className={styles.right}>
            <div className={styles.form}>
              
             
              <div className={styles.section}>
              <h1>Credentials</h1>
              <div className={styles.formInput}> 
                <TextField
                    id="outlined-name"
                    label="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="Phone Number"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="Email"
                    value={email}
                    disabled
                />
              </div>
              </div>
              <div className={styles.section}>
              <h1>Location</h1>
              <div className={styles.formInput}>
              <Autocomplete
                  disablePortal
                  options={countriesOptions}
                  value={country}
                  onChange={(event,value) => setCountry(value)}
                  renderInput={(params) => <TextField {...params} label="Country" />}
                />
                </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
              </div>
              </div>
              <div className={styles.section}>
              <h1>Social Links</h1>
              <div className={styles.formInput}>
                <TextField
                    onChange={(e)=>setVimeo(e.target.value)}
                    id="outlined-name"
                    label="Vimeo"
                    value={vimeo}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    onChange={(e)=>setLinkedin(e.target.value)}
                    id="outlined-name"
                    label="Linkedin"
                    value={linkedin}
                />
              </div>
              <div className={styles.formInput}>  
                <TextField
                    onChange={(e)=>setImdb(e.target.value)}
                    id="outlined-name"
                    label="IMDB"
                    value={imdb}
                />
              </div>
              <div className={styles.formInput}>  
                <TextField
                  onChange={(e)=>setUrl(e.target.value)}
                  id="outlined-name"
                  label="URL"
                  value={url}
                />
              </div>
              </div>
              <div className={styles.section}>
              <h1>Display Info</h1>
              <div className={styles.formInput}>
                  <FormControl sx={{ minWidth: 210 }}>
                  <InputLabel>Type</InputLabel>
                    <Select
                      id="outlined-name"
                      value={view}
                      label="Type"
                      onChange={(e) => setView(e.target.value)}
                      renderValue={(value) => `${value}`}
                    >
                      <MenuItem value={'Employeer'}>Employeer</MenuItem>
                      <MenuItem value={'Talent'}>Talent</MenuItem>
                    </Select>
                  </FormControl>
                </div>

              <div className={styles.formInput}>  
                  <TextField
                    onChange={(e)=>setSpeciality(e.target.value)}
                    id="outlined-name"
                    label="Speciality"
                    value={speciality}
                  />
              </div>
              {user.role=="admin"?(
                <div className={styles.formInput}>
                  <FormControl sx={{ minWidth: 210 }}>
                    <Select
                      id="outlined-name"
                      value={role}
                      label="Role"
                      onChange={(e) => setRole(e.target.value)}
                      renderValue={(value) => `${value}`}
                    >
                      <MenuItem value={'admin'}>Admin</MenuItem>
                      <MenuItem value={'user'}>User</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              ):(
                <></>
              )}
              <div className={styles.formInput}>
                  <FormControl sx={{ minWidth: 210 }}>
                  <InputLabel>Department</InputLabel>
                    <Select
                      id="outlined-name"
                      label="Department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      renderValue={(value) => `${value}`}
                    >
                      <MenuItem value={'Talents'}>Talents</MenuItem>
                      <MenuItem value={'Service Providers'}>Service Providers</MenuItem>
                      <MenuItem value={'Crews'}>Crews</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className={styles.formInput}>  
                  <Autocomplete
                    disablePortal
                    value={category}
                    options={options}
                    onInputChange={(event,value) => setCategory(value)}
                    renderInput={(params) => <TextField {...params} label="Category" />}
                  />
                </div>
              <div className={styles.formInput}>  
                <TextField
                  onChange={(e)=>setAbout(e.target.value)}
                  id="outlined-name"
                  label="About"
                  value={about}
                  multiline
                  rows={4}
                />
              </div>
              </div>
              <div className={styles.section}>
              <h1>Education & Experience</h1>
              <div className={styles.formInput}>
                <FormControl sx={{ minWidth: 210 }}>
                  <InputLabel>Years of Experience</InputLabel>
                    <Select
                      id="outlined-name"
                      value={yearsofexperience}
                      label="Years of Experience"
                      onChange={(e) => setYearsofexperience(e.target.value)}
                      renderValue={(value) => `${value}`}
                    >
                      <MenuItem value={'1'}>1</MenuItem>
                      <MenuItem value={'2'}>2</MenuItem>
                      <MenuItem value={'3'}>3</MenuItem>
                      <MenuItem value={'4'}>4</MenuItem>
                      <MenuItem value={'5'}>5</MenuItem>
                      <MenuItem value={'6'}>6</MenuItem>
                      <MenuItem value={'7'}>7</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              <div className={styles.formInput}>  
                <TextField
                  onChange={(e)=>setGraduationyear(e.target.value)}
                  id="outlined-name"
                  label="Graduation Year"
                  value={graduationyear}
                />
              </div>

              <div className={styles.formInput}>  
                <Autocomplete
                  disablePortal
                  value={fieldofstudy}
                  options={fieldofstudyOptions}
                  onChange={(event,value) => setFieldofstudy(value)}
                  renderInput={(params) => <TextField {...params} label="Field of Study" />}
                />
              </div>
              <div className={styles.formInput}>  
                <Autocomplete
                  disablePortal
                  value={educationlevel}
                  options={educationlevelOptions}
                  onChange={(event,value) => setEducationlevel(value)}
                  renderInput={(params) => <TextField {...params} label="Education Level" />}
                />
              </div>
              </div>
              <div className={styles.section}>
                <h1>Skillset</h1>
                <div className={styles.formInput}>  
                <TextField
                  onChange={(e)=>setInterest(e.target.value)}
                  id="outlined-name"
                  label="Interest"
                  value={interest}
                />
                <div className={styles.extraItems}>
                  <div className={styles.btn} onClick={()=>{addInterest()}}>
                    Add
                  </div>
                </div>
              </div>
                <div className={styles.formInput}>
                <Autocomplete
                  disablePortal
                  options={languagesOptions}
                  value={language}
                  onChange={(event,value) => setLanguage(value)}
                  renderInput={(params) => <TextField {...params} label="Language" />}
                /> 
                <div className={styles.extraItems}>
                  <div className={styles.btn} onClick={()=>{addLanguage()}}>
                    Add
                  </div>
                </div>
              </div>
              <div className={styles.formInput}>
                <div className={styles.extraItems}>
                { 
                  interests?.map((interest,i)=>(
                    <div key={i+interest} onClick={()=>handleInterest(i)} className={styles.btn}>{interest}</div>
                  ))
                }
                </div>
              </div>
              <div className={styles.formInput}>
                  <div className={styles.extraItems}>
                  { 
                    languages?.map((lan,i)=>(
                      <div key={i+lan} onClick={()=>handleLanguage(i)} className={styles.btn}>{lan}</div>
                    ))
                  }
                  </div>
                </div>
              </div>



              <div className={styles.section}>
              <h1>Show Reel</h1>
              <div className={styles.slider}>
              <div className={styles.text}>
                <label htmlFor="file1">
                    <DriveFolderUploadOutlinedIcon className={styles.icon} />
                </label>
                <input
                  type="file"
                  id="file1"
                  onChange={(e) => handleFile1(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className={styles.images}>
                {
                  showreel.length!=0?showreel.map((slide,i)=>(<img key={`${i}x`} onClick={()=>handleShowreel(i)} src={slide} alt=""/>)):<></>
                }
                {loadingSR?<div className={styles.loading}><Progress/></div>:<></>}
              </div>
              <div  className={styles.x} onClick={()=>handleClear()}>
                {showreel.length!=0?(<CancelIcon className={styles.xIcon}/>):(showreel?(<CancelIcon className={styles.xIcon}/>):(<></>))}
              </div>
            </div>
            </div>
              <div className={styles.saveSection}>
              {loading?(<Progress className={styles.progress}/>):<button className={styles.save} onClick={handleSave}>Save</button>}
              </div>
              <Error error={error} setError={setError}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;