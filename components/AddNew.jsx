import styles from "../styles/AddNew.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import Image from "next/image";
import {storage} from "../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import Progress from "./Progress";
import img from "../public/Camera.jpg"
import Error from "./Error";

const AddNew = ({token}) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const [article, setArticle] = useState([]);
    const [sectionTitle, setSectionTitle] = useState("");
    const [sectionContent, setSectionContent] = useState("");
    const [loading,setLoading] = useState (false);
    const router = useRouter();
    const [error, setError] = useState("");


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

    const handleSection = (index) => {
      const removedSection = article.splice(index,1);
      setArticle(article.filter((option) =>(option!==removedSection[0])));
    };
    const addSection = (e) => {
      if(sectionTitle=="" || sectionContent=="") return;
      setArticle((prev) => [...prev, {sectionTitle,sectionContent}]);
      setSectionContent("");
      setSectionTitle("");
    }

    const handleTag = (index) => {
      const removedTag = tags.splice(index,1);
      setTags(tags.filter((option) =>(option!==removedTag[0])));
    };
    const addTag = (e) => {
      if(tag=="") return;
      setTags((prev) => [...prev, tag]);
      setTag("");
    }

    const postNew = async (pay) => {
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
        const res11 = await server.post("api/news", pay);
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

    const validate = ()=>{
      if(file==null){
        setError("Please add an image.")
        return false;
      }else if(title==""){
        setError("Please add a title")
        return false;
      }else if(title.length>20){
        setError("Please shorten your title")
        return false;
      }else if(description==""){
        setError("Please add a description.")
        return false;
      }else if(tags.length<1){
          setError("Please add some tags.")
          return false;
      }else if(article.length<1){
            setError("Please add the article's sections.")
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
        }
        const payload = {title,image:img,description,tags,article};
        try{
        postNew(payload);
        setLoading(false);
        console.log(payload)
        router.push("/news");
        }catch(err){
        console.log(err);
        }  
    }
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
          <h1>Add Article</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}> 
          <div className={styles.formInput}>    
                <TextField
                  id="outlined-name"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
          <div className={styles.formInput}>
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
          </div>
            <div className={styles.imgCon}>
              <Image
                src={
                  file
                    ? URL.createObjectURL(file)
                    : img
                }
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.formInput}>    
                <TextField
                  id="outlined-name"
                  label="Description"
                  value={description}
                  multiline
                  rows={5}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
          </div>
          <div className={styles.right}>
            <div className={styles.form}>    
              <div className={styles.article}>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  label="Section Title"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                />
              </div>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  label="Section Content"
                  value={sectionContent}
                  multiline
                  rows={7}
                  onChange={(e) => setSectionContent(e.target.value)}
                />
              </div>
              <div className={styles.value} onClick={()=>{addSection()}}>
                Add
              </div>
              <div className={styles.inputs}>
                  { 
                    article?.map((section,i)=>(
                      <div key={i+section} onClick={()=>handleSection(i)} className={styles.value}>{section.sectionTitle}</div>
                    ))
                  }
                  </div>
              </div>
              <div className={styles.middle}>
                <div className={styles.input}>
                  <TextField
                    id="outlined-name"
                    label="Tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    />
                    <div className={styles.value} onClick={()=>{addTag()}}>
                      Add
                    </div>
                  </div>
                  <div className={styles.inputs}>
                  { 
                    tags?.map((value,i)=>(
                      <div key={i+value} onClick={()=>handleTag(i)} className={styles.value}>{value}</div>
                    ))
                  }
                  </div>
                </div>
              <div className={styles.saveSection}>
              {loading?(<Progress className={styles.progress}/>):<button className={styles.save} onClick={handleSave}>Save</button>}
              </div>
              <Error setError={setError} error={error}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddNew;