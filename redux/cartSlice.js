import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    stage: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      var available;
      for(var i=0;i<state.products.length;i++){
        available = true;
        if(state.products[i]._id==action.payload._id){
          if(state.products[i].price!=action.payload.price){
            available=false;
            break;
          }
          if(action.payload.extras.length==state.products[i].extras.length){
            for(var y=0;y<state.products[i].extras.length;y++){
              if(state.products[i].extras[y].type!=action.payload.extras[y].type||state.products[i].extras[y].value!=action.payload.extras[y].value){
                available = false;
                break;
              }
            }
            if(available==true){
              if(state.products[i].attributes.length>0){
                for(var y=0;y<state.products[i].attributes[y].length;y++){
                  if(state.products[i].attributes[y].type!=action.payload.attributes[y].type||state.products[i].attributes[y].value!=action.payload.attributes[y].value){
                    available = false;
                    break;
                  }
                }
              }
            }
            if(available==true){
              return;
            }else{
              continue;
            }
          }else{
            continue;
          }
        }else{
          continue;
        }
      }
      state.products.push(action.payload);
      state.quantity += 1* action.payload.quantity;
      state.price = parseInt(action.payload.price);
      state.total += action.payload.price * action.payload.quantity;
      state.stage = 1;
    },
    incrementProduct: (state, action) => {
      var booll;
      for(var i=0;i<state.products.length;i++){
        booll=true;
        
        if(state.products[i]._id==action.payload.id){
            if(state.products[i].price!=action.payload.price){
              booll=false;
            }
          if(action.payload.extras.length==state.products[i].extras.length&&action.payload.attributes.length==state.products[i].attributes.length){
            for(var y=0;y<state.products[i].extras.length;y++){
              if(state.products[i].extras[y].type!=action.payload.extras[y].type){
                booll = false;
                break;
              }
            }
            if(state.products[i].attributes.length>0){
              for(var y=0;y<state.products[i].attributes[y].length;y++){
                if(state.products[i].attributes[y].type!=action.payload.attributes[y].type||state.products[i].attributes[y].value!=action.payload.attributes[y].value){
                  available = false;
                  break;
                }
              }
            }
            if(booll==true){
              const newproduct =  {...state.products[i],quantity:state.products[i].quantity+1};
              state.products[i] = newproduct;
              state.quantity=state.quantity+1;
              state.total+=parseInt(action.payload.price);
              state.stage = 1
              return;
            }else{
              continue;
            }
          }else{
            continue;
          }
        }else{
          continue;
        }
      }
    },
    decrementProduct: (state, action) => {
      var booll;
      var newarray=[];
      for(var i=0;i<state.products.length;i++){
        booll=true;
        if(state.products[i]._id==action.payload.id){
            if(state.products[i].price!=action.payload.price){
              booll=false;
            }
          if(action.payload.extras.length==state.products[i].extras.length&&action.payload.attributes.length==state.products[i].attributes.length){
            for(var y=0;y<state.products[i].extras.length;y++){
              if(state.products[i].extras[y].type!=action.payload.extras[y].type){
                booll = false;
                break;
              }
            }
            if(booll==true){
              if(state.products[i].attributes.length>0){
                for(var y=0;y<state.products[i].attributes[y].length;y++){
                  if(state.products[i].attributes[y].type!=action.payload.attributes[y].type||state.products[i].attributes[y].value!=action.payload.attributes[y].value){
                    booll = false;
                    break;
                  }
                }
              }
            }
            if(booll==true){
              if (state.products[i].quantity!=1){
                const newproduct =  {...state.products[i],quantity:state.products[i].quantity-1};
                newarray.push(newproduct);
              }
            }else{
              newarray.push(state.products[i]);
              continue;
            }
          }else{
            newarray.push(state.products[i]);
            continue;
          }
        }else{
          newarray.push(state.products[i]);
          continue;
        }
      }
      state.products = newarray;
      state.quantity -= 1;
      state.total -= parseInt(action.payload.price);
      state.stage = 1
    },
    removeProduct: (state, action) => {
      var booll;
      var newarray=[];
      for(var i=0;i<state.products.length;i++){
        booll=true;
        if(state.products[i]._id==action.payload.id){
            if(state.products[i].price!=action.payload.price){
              booll=false;
            }
          if(action.payload.extras.length==state.products[i].extras.length&&action.payload.attributes.length==state.products[i].attributes.length){
            for(var y=0;y<state.products[i].extras.length;y++){
              if(state.products[i].extras[y].value!=action.payload.extras[y].value){
                booll = false;
                newarray.push(state.products[i]);
                break;
              }
            }
            if(booll==true){
              if(state.products[i].attributes.length>0){
                for(var y=0;y<state.products[i].attributes[y].length;y++){
                  if(state.products[i].attributes[y].type!=action.payload.attributes[y].type||state.products[i].attributes[y].value!=action.payload.attributes[y].value){
                    booll = false;
                    break;
                  }
                }
              }
            }else{
              newarray.push(state.products[i]);
              continue;
            }

          }else{
            newarray.push(state.products[i]);
            continue;
          }
        }else{
          newarray.push(state.products[i]);
          continue;
        }
      }
      state.products = newarray;
      state.quantity -= 1* action.payload.quantity;
      state.total -= parseInt(action.payload.price) * action.payload.quantity;
      state.stage = 1
    },
    resetCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      state.stage = 0;
    },
    addCart: (state,action) => {
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
      state.stage = 2;
    },
    saved: (state,action) => {
      state.stage = action.payload.stage;
    },
  },
});

export const { addProduct, saved, resetCart, addCart , decrementProduct , incrementProduct , reduceProduct , removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
