import styles from "../styles/EditEquipment.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import {storage} from "../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import Progress from "./Progress";
import { useSelector } from 'react-redux';
import Image from "next/image";
import CancelIcon from '@mui/icons-material/Cancel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Error from "./Error";
const EditEquipment = ({equipment,token}) => {
    const user = useSelector((state) => state.user);
    const [name, setName] = useState(equipment.name||"");
    const [images, setImages] = useState(equipment.images || []);
    const [tags, setTags] = useState(equipment.tags||[]);
    const [category, setCategory] = useState(equipment.category||"");
    const [price, setPrice] = useState(equipment.price||equipment.prices[0]||"");
    const [forr,setForr] = useState(equipment.forr||"Rent or Sell");
    const [warranty, setWarranty] = useState(equipment.warranty||"");
    const [dValue, setDValue] = useState("");
    const [aType, setAType] = useState("");
    const [aValue, setAValue] = useState("");
    const [description, setDescription] = useState(equipment.description||[]);
    const [attributes, setAttributes] = useState(equipment.attributes||[]);
    const [dType, setDType] = useState("");
    const [pricex, setPricex] = useState("");
    const [durationx, setDurationx] = useState("");
    const [prices,setPrices] = useState(equipment.rentprices||[]);
    const [loading,setLoading] = useState (false);
    const [loadingSR,setLoadingSR]= useState(false);
    const [tag, setTag] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");
    
    const handleFile1 = async (val) => {
      setLoadingSR(true);
      const img = await uploadFiles(val);
      setImages((prev) => [...prev, img]);
      setLoadingSR(false);
    };

    const postData = async (pay) => {
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
        const res11 = await server.put(`api/equipments/${equipment._id}/`, pay);
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
      setImages([]);
    }
    
    const validate = ()=>{
      if(name==""){
        setError("Please add a name.")
        return false;
      }else if(name.length>20){
        setError("Please shorten your name.")
        return false;
      }else if(images.length<1){
        setError("Please add some images.")
        return false;
      }else if(category==""){
        setError("Please add a category.")
        return false;
      }else if(category.length>20){
        setError("Please shorten your category.")
        return false;
      }else if(forr==""){
        setError("Please add for what.")
        return false;
      }else if(forr=="Sell"){
        if(price==""){
          setError("Please add a price.")
          return false;
        }else if(price.length>8){
          setError("Please enter a valide price.")
          return false;
        }else{
          setPrices([]);
          return true;
        }
      }else if(forr=="Rent"){
        if(prices.length<1){
          setError("Please add a price.")
          return false;
        }else{
          setPrice("");
          return true;
        }
      }else if(forr=="Rent or Sell"){
        if(prices.length<1){
          setError("Please add a price.")
          return false;
        }else if(price==""){
          setError("Please add a price.")
          return false;
        }else if(price.length>8){
          setError("Please enter a valide price.")
          return false;
        }else{
          return true;
        }
      }else{
        return true;
      }
    }
    const addTag = (e) => {
      if(tag=="") return;
      setTags((prev) => [...prev, tag]);
      setTag("");
    }

    const handleTag = (index) => {
      const removedTag = tags.splice(index,1);
      setTags(tags.filter((option) =>(option!==removedTag[0])));
    };
    const handlePrice = (index) => {
      const removedPrice = prices.splice(index,1);
      setPrices(prices.filter((option) =>(option!==removedPrice[0])));
    };
    const addDesc = () => {
      if(dValue==""||dType=="") return;
      const obj = {
        type:dType,
        value:dValue
      }
      setDescription((prev) => [...prev, obj]);
      setDValue("");
      setDType("");
    }
    const handleDesc = (index) => {
      const removedDesc = description.splice(index,1);
      setDescription(description.filter((option) =>(option!==removedDesc[0])));
    };
    const addAttr = () => {
      if(aValue==""||aType=="") return;
      const i = attributes.findIndex(e => e.type === aType);
      if (i > -1) {
        if(attributes[i].values.includes(aValue))
          return;
        var temp = attributes[i].values
        temp.push(aValue);
        attributes[i].values=temp;
      }else{
        const obj = {
          type:aType,
          values: [aValue]
        }
        setAttributes((prev) => [...prev, obj]);
      }      
      setAValue("");
    }
    const handleAttr = (index) => {
      const removedAttr = attributes.splice(index,1);
      setAttributes(attributes.filter((option) =>(option!==removedAttr[0])));
    };
    const handleSave = async()=>{
      const validated = validate();
      if(!validated) return;
        setLoading(true);
        const payload = {name,images,tags,category,price,rentprices:prices,forr,attributes,description,warranty};
        try{
          postData(payload);
          setLoading(false);
          router.push("/");
        }catch(err){
          console.log(err);
        }  
            
    }

    const addExtra = () => {
      if(extraType==""||extraValue=="") return;
      const obj = {
        type:extraType,
        value:extraValue
      }
      setExtras((prev) => [...prev, obj]);
      setExtraType("");
      setExtraValue("");
    };
    const handleExtra = (index) => {
      const removedExtra = extras.splice(index,1);
      setExtras(extras.filter((option) =>(option!==removedExtra[0])));
    };

    const handleImage = (index) => {
      const removedSlide = images.splice(index,1);
      setImages(images.filter((option) =>(option!==removedSlide[0])));
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
          <h1>Edit Your Equipment</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.right}>
            <div className={styles.form}>
            <div className={styles.formInput}/> 
            <div className={styles.formInput}/> 
            <div className={styles.formInput}/>
            <div className={styles.formInput}/>
            <div className={styles.formInput}> 
                <TextField
                    id="outlined-name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className={styles.formInput}>
                <TextField
                  id="outlined-name"
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                  <FormControl sx={{ minWidth: 210 }}>
                    <Select
                      id="outlined-name"
                      value={forr}
                      label="For"
                      onChange={(e) => setForr(e.target.value)}
                      renderValue={(value) => `${value}`}
                    >
                      <MenuItem value={'Sell'}>Sell</MenuItem>
                      <MenuItem value={'Rent'}>Rent</MenuItem>
                      <MenuItem value={'Sell or Rent'}>Sell or Rent</MenuItem>
                    </Select>
                  </FormControl>
              </div>
              <div className={styles.middle}>
                  <div className={styles.input}>
                    <TextField
                      id="outlined-name"
                      label="Extra Name"
                      value={extraType}
                      color="grey"
                      onChange={(e) => setExtraType(e.target.value)}
                    />
                    <TextField
                      id="outlined-name"
                      label=" Extra Price"
                      value={extraValue}
                      color="grey"
                      onChange={(e) => setExtraValue(e.target.value)}
                    />
                      <div className={styles.value} onClick={()=>{addExtra()}}>
                        Add
                      </div>
                    </div>
                    
                    <div className={styles.inputs}>
                    { 
                      extras?.map((e,i)=>(
                        <div key={i} onClick={()=>handleExtra(i)} className={styles.value}>{`${e.type} (${e.value}$)`}</div>
                      ))
                    }
                  </div>
                </div>
               <div className={styles.formInput}>
                <TextField
                  id="outlined-name"
                  label="Warranty"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                />
              </div>
              <div className={styles.slider}>
                <div className={styles.text}>
                  <label htmlFor="file1">
                      Images: <DriveFolderUploadOutlinedIcon className={styles.icon} />
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
                    images.length!=0?images.map((slide,i)=>(<img key={`${i}x`} onClick={()=>handleImage(i)} src={slide} alt=""/>)):<></>
                  }
                  {loadingSR?<div className={styles.loading}><Progress/></div>:<></>}
                </div>
                <div  className={styles.x} onClick={()=>handleClear()}>
                  {images.length!=0?(<CancelIcon className={styles.xIcon}/>):(images&&(<CancelIcon className={styles.xIcon}/>))}
                </div>
              </div>
              <div className={styles.middle}>
                <div className={styles.input}>
                  <TextField
                    id="outlined-name"
                    label="Desc.Type"
                    value={dType}
                    color="grey"
                    onChange={(e) => setDType(e.target.value)}
                  />
                  <TextField
                    id="outlined-name"
                    label="Desc.Value"
                    value={dValue}
                    color="grey"
                    onChange={(e) => setDValue(e.target.value)}
                  />
                    <div className={styles.value} onClick={()=>{addDesc()}}>
                      Add
                    </div>
                  </div>
                  
                  <div className={styles.inputs}>
                  { 
                    description?.map((d,i)=>(
                      <div key={i} onClick={()=>handleDesc(i)} className={styles.value}>{`${d.type} (${d.value})`}</div>
                    ))
                  }
                  </div>
                </div>
              <div className={styles.middle}>
                  <div className={styles.input}>
                    <TextField
                      id="outlined-name"
                      label="Attr.Type"
                      value={aType}
                      color="grey"
                      onChange={(e) => setAType(e.target.value)}
                    />
                    <TextField
                      id="outlined-name"
                      label="Attr.Value"
                      value={aValue}
                      color="grey"
                      onChange={(e) => setAValue(e.target.value)}
                    />
                      <div className={styles.value} onClick={()=>{addAttr()}}>
                        Add
                      </div>
                    </div>      
                    <div className={styles.inputs}>
                    { 
                      attributes?.map((a,i)=>(
                        <div key={i} onClick={()=>handleAttr(i)} className={styles.value}>{`${a.type} (${a.values.join(", ")})`}</div>
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
            {(forr=="Rent or Sell"||forr=="Rent")&&
              <div className={styles.middle}>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  label="S.Price"
                  value={pricex}
                  onChange={(e) => setPricex(e.target.value)}
                  color="grey"
                  type="number"
                  />
                  <TextField
                  id="outlined-name"
                  label="S.Duration"
                  color="grey"
                  value={durationx}
                  type="number"
                  onChange={(e) => setDurationx(e.target.value)}
                  />
                  <div className={styles.value} onClick={()=>{addPrice()}}>
                    Add
                  </div>
                </div> 
                <div className={styles.inputs}>
                { 
                  prices?.map((p,i)=>(
                    <div key={i} onClick={()=>handlePrice(i)} className={styles.value}>{`${p.price}/${p.duration}`}</div>
                  ))
                }
                </div>
              </div>
            }
            <div className={styles.middle}>
              <div className={styles.input}>
                <div className={styles.value} onClick={()=>{addAttr()}}>
                  Add
                </div>
              </div>      
              <div className={styles.inputs}>
                { 
                  attributes?.map((a,i)=>(
                    <div key={i} onClick={()=>handleAttr(i)} className={styles.value}>{`${a.type} (${a.values.join(", ")})`}</div>
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

export default EditEquipment;