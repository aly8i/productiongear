import { useState,useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import styles from "../styles/OrderDetail.module.css";
import Map from '../components/Map';
import TextField from '@mui/material/TextField';
const OrderDetail = ({ createOrder }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state)=> state.user);
  const [name, setName] = useState(user.fullname||"");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber||"");
  const [address, setAddress] = useState(user.address||"");
  const [customerID,setCustomerID] = useState(null);
  const [total,setTotal]=useState(null);
  const [products,setProducts] = useState([]);
  const [lng, setLng] = useState(35.7051);
  const [lat, setLat] = useState(33.9455);
  const [error,setError] = useState(null);

  let array = [];
  const temp = 1;
  const handleClick = () => {
    if(validate()==true){
      const location = {
        lat: lat,
        lng: lng
      }
    createOrder({ name,total,equipments:products,location,customerID,phoneNumber,address });
    }
  };
  useEffect(() => {
    array=[];
    setCustomerID(user.id);
    setTotal(cart.total);
    cart.products.map((product)=>{
      let extras = [];
      product.extras.map((extra)=>{
          extras.push(extra.text);
      })
      let attributes = [];
      product.attributes.map((attribute)=>{
        attributes.push(`${attribute.type} {${attribute.value}}`);
      })
      array.push({equipment: `${product._id}`,attributes:`${attributes}`,price: `${product.price}`,amount: `${product.quantity}`,extras: `${extras}`});
    });
    setProducts([...array]);
  },[temp]);
  const validate = () =>{
    setError(null);
    if(name == "" || name == null || phoneNumber == "" || phoneNumber == null || address == "" || address == null){
      setError("Please fill up all your order's details !");
      return false;
    }else{
      return true;
    }
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>You will pay ${total} after delivery.</h1>
          <div className={styles.item}>
            <TextField
          id="outlined-name"
          label="Full Name"
          color="grey"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
          </div>
          <div className={styles.item}>
          <TextField
          id="outlined-name"
          label="Phone Number"
          value={phoneNumber}
          color="grey"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
          </div>
          <div className={styles.item}>
            <TextField
            id="outlined-multiline-static"
            label="Address"
            value={address}
            color="grey"
            multiline
            rows={4}
            onChange={(e) => setAddress(e.target.value)}
          />
          </div>
          <div className={styles.item}>
            <div className={styles.map}>
              <Map lng={lng} lat={lat} setLng={setLng} setLat={setLat}/>
            </div>
          </div>
          <button className={styles.button} onClick={handleClick}>
            Order
          </button>
        </div>
        
      </div>
      
    </>
  );
};

export default OrderDetail;
