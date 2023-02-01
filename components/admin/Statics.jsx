import styles from "../../styles/adminStatics.module.scss";
import Sidebar from "./Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import {storage} from "../../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import Progress from "../Progress";
import Error from "../Error";
import CancelIcon from '@mui/icons-material/Cancel';


const Statics = ({data,token}) => {
    const [logo, setLogo] = useState(data.logo || "");
    const [cubeslider, setCubeslider] = useState(data.cubeslider||[]);
    const [servicecards, setServicecards] = useState(data.servicecards||[]);
    const [talents,setTalents]= useState(data.talents||[]);
    const [crews,setCrews]= useState(data.crews||[]);
    const [providers,setProviders]= useState(data.providers||[]);
    const [files, setFiles] = useState([]);
    const [logofile, setLogofile] = useState(null);
    const [SCfile, setSCfile] = useState(null);
    const [SCtitle, setSCtitle] = useState("");
    const [SCdesc, setSCdesc] = useState("");
    const [talent,setTalent]= useState("");
    const [crew,setCrew]= useState("");
    const [provider,setProvider]= useState("");
    const [leftquote,setLeftquote] = useState("");
    const [rightquote,setRightquote] = useState("");
    const [loading,setLoading] = useState(false);
    const [loadingSC,setLoadingSC]= useState(false);
    const [loadingCS,setLoadingCS]= useState(false);
    const [error,setError]= useState("");
    const router = useRouter();
    const server = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      headers: {'Content-Type':'application/json'},
      withCredentials: true
    });
    server.interceptors.request.use(
      async function (config) {
        if (token) {
          config.headers.authorization = token;
        }
        return config;
      },
      async function (error) {
        return Promise.reject(error);
      },
    );

    const handleSave = async()=>{
      const validated = validateCube();
      const validated2 = validateServiceCards();
      const validated3 = validateCategories();
      if(!validated||!validated2||!validated3) return;
      setLoading(true);
      var cs1 = true;
      var arr = [];
      var url;
      var img="";
      if(logofile!=null){
          img = await uploadFiles(logofile);
      }else{
          img = data.logo;
      }
      const payload = {cubeslider,servicecards,talents,crews,providers,leftquote,rightquote,logo:img};
      try{
        postData(payload);
        setLoading(false);
        router.push("/");
      }catch(err){
        console.log(err);
      }  
    }

    const postData = async (pay) => {
      const res1={}
      try{
        const res11 = await server.put("api/statics/", pay);
        res1=res11;
      }catch(err){
        if(err.response.status>=300){
          router.push("/");
        }
      }
      return res1;
    }
   
      function uploadFiles (file){
        if(!file) return;
        return new Promise(resolve =>{
          const storageRef = ref(storage, `/statics/${file.name}`);
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
      const validateCube = () => {
        if(files.length==6){
          return true;
        }else if(cubeslider.length==6){
          return true;  
        }else{
          setError("Cube Slider must be 6 Pictures in total.")
          return false;
        }
      }
      const validateServiceCards = ()=>{
        if(servicecards.length<1){
          setError("Please add some Service Cards.")
          return false;
        }
        else if(servicecards.length>9){
          setError("Please remove some Service Cards.")
          return false;
        }else{
          return true;
        }
      }
      const validateCategories = ()=>{
        if(providers.length<1){
          setError("Please add some Providers.")
          return false;
        }else if(crews.length<1){
          setError("Please add some Crews.")
          return false;
        }else if(talents.length<1){
          setError("Please add some Talents.")
          return false;
        }else{
          return true;
        }
        
      }
      const handleClear = ()=>{
          setCubeslider([]);
          setFiles([]);
      }
      const handleFile = async(val) => {
        setLoadingCS(true);
        const img = await uploadFiles(val);
        setCubeslider((prev) => [...prev, img]);
        setLoadingCS(false);
      };
      const handleSCfile = (val) => {
        setSCfile(val);
      };
      const addSC = async() => {
        if (SCfile == null || SCdesc == "" || SCtitle == ""){
          setError("Enter all the required information for the Service card.")
          return;
        }
        setLoadingSC(true);
        const img = await uploadFiles(SCfile);
        const sc = {
          title: SCtitle,
          description: SCdesc,
          image: img
        }
        setServicecards((prev) => [...prev, sc]);
        setSCfile(null);
        setSCdesc("");
        setSCtitle("");
        setLoadingSC(false);
      }
      const addTalent = (e) => {
        if(talent=="" || talents?.includes(talent)) return;
        setTalents((prev) => [...prev, talent]);
        setTalent("");
      }
      const handleCubeslide = (index) => {
          const removedSlide = cubeslider.splice(index,1);
          setCubeslider(cubeslider.filter((option) =>(option!==removedSlide[0])));
      };
      const handleTalent = (index) => {
        const removedTalent = talents.splice(index,1);
        setTalents(talents.filter((option) =>(option!==removedTalent[0])));
      };
      const handleServicecard = (index) => {
        const removedService = servicecards.splice(index,1);
        setServicecards(servicecards.filter((option) =>(option!==removedService[0])));
      }
      const addProvider = (e) => {
        if(provider=="" || providers?.includes(provider)) return;
        setProviders((prev) => [...prev, provider]);
        setProvider("");
      }
      const handleProvider = (index) => {
        const removedProvider = providers.splice(index,1);
        setProviders(providers.filter((option) =>(option!==removedProvider[0])));
      };
      const addCrew = (e) => {
        if(crew=="" || crews?.includes(crew)) return;
        setCrews((prev) => [...prev, crew]);
        setCrew("");
      }
      const handleCrew = (index) => {
        const removedCrew = crews.splice(index,1);
        setCrews(crews.filter((option) =>(option!==removedCrew[0])));
      };
  return (
    <div className={styles.new}>
      <div className={styles.side}>
        <Sidebar/>
      </div>
      <div className={styles.newContainer}>
        <div className={styles.top}>
          <h1>Your Website Statics</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.up}>
            <div className={styles.slider}>
              <div className={styles.text}>
                  <label htmlFor="file1">
                    Cube Slider: <DriveFolderUploadOutlinedIcon className={styles.icon} />
                  </label>
                  <input
                    type="file"
                    id="file1"
                    onChange={(e) => handleFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
              </div>
              <div className={styles.images}>
                {
                  cubeslider?.map((slide,i)=>(<img key={i} onClick={()=>handleCubeslide(i)} src={slide} alt=""/>))
                }
                {loadingCS?<div className={styles.loading}><Progress/></div>:<></>}
              </div>
              <div   className={styles.x} onClick={()=>handleClear()}>
                {files[0]?(<CancelIcon className={styles.xIcon}/>):(cubeslider?(<CancelIcon className={styles.xIcon}/>):(<></>))}
              </div>
            </div>
          </div>
          <div className={styles.cardsSection}>
            <div className={styles.input}>
              <label htmlFor="SCfile">
                Service Card: <DriveFolderUploadOutlinedIcon className={styles.icon} />
              </label>
              <input
                  type="file"
                  id="SCfile"
                  onChange={(e) => handleSCfile(e.target.files[0])}
                  style={{ display: "none" }}
              />
              <TextField
                id="outlined-name"
                label="Title"
                value={SCtitle}
                onChange={(e) => setSCtitle(e.target.value)}
                />
              <TextField
                id="outlined-name"
                label="Description"
                multiline
                rows={4}
                value={SCdesc}
                onChange={(e) => setSCdesc(e.target.value)}
              />
              <div className={styles.value} onClick={()=>{addSC()}}>
                Add
              </div>
            </div>
            <div className={styles.inputCard}>
            {loadingSC==true?(
            <Progress className={styles.progress}/>
            ):(
              SCfile?
            <img
              src={
                 URL.createObjectURL(SCfile)
              }
              alt=""
            />:<></>
            )}
            
            </div>
            <div className={styles.cards}>
                <div className={styles.images}>
                {
                  servicecards?.map((slide,i)=>(<img key={i} onClick={()=>handleServicecard(i)} src={slide.image} alt=""/>))
                }
              </div>
            </div>
          </div>
          <div className={styles.middle}>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Talent"
                value={talent}
                onChange={(e) => setTalent(e.target.value)}
                />
                <div className={styles.value} onClick={()=>{addTalent()}}>
                Add
              </div>
            </div>
            <div className={styles.inputs}>
            { 
              talents?.map((value,i)=>(
                <div key={i+value} onClick={()=>handleTalent(i)} className={styles.value}>{value}</div>
              ))
            }
            </div>
          </div>
          <div className={styles.middle}>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Crew"
                value={crew}
                onChange={(e) => setCrew(e.target.value)}
                />
                <div className={styles.value} onClick={()=>{addCrew()}}>
                Add
              </div>
            </div>
            <div className={styles.inputs}>
            { 
              crews?.map((value,i)=>(
                <div key={i+value} onClick={()=>handleCrew(i)} className={styles.value}>{value}</div>
              ))
            }
            </div>
          </div>
          <div className={styles.middle}>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Provider"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                />
                <div className={styles.value} onClick={()=>{addProvider()}}>
                Add
              </div>
            </div>
            <div className={styles.inputs}>
            { 
              providers?.map((value,i)=>(
                <div key={i+value} onClick={()=>handleProvider(i)} className={styles.value}>{value}</div>
              ))
            }
            </div>
          </div>
          <div className={styles.down}>
            <div className={styles.form}>
            <div className={styles.formInput}>
            <label htmlFor="file">
            Logo: <DriveFolderUploadOutlinedIcon className="icon" />
          </label> 
          <input
            type="file"
            id="file"
            onChange={(e) => setLogofile(e.target.files[0])}
            style={{ display: "none" }}
          />
          </div>
            <div className={styles.formInput}>
            { logofile || data.logo == "" ? 
            <img
              src={
                logofile
                  ? URL.createObjectURL(logofile)
                  : data.logo
              }
              alt=""
            />:<></>
            }
            </div>
            </div>
            <div className={styles.saveCon}>
            {loading?(<Progress className={styles.progress}/>):<button onClick={handleSave}>Save</button>}
            </div>
              <Error error={error} setError={setError}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statics;