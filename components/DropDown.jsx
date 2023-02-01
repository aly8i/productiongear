import React,{useState} from 'react'
const DropDown = ({setType,type}) => {
  const [selected,setSelected]=useState("filter ");
  const options = [
    {
      name: "All",
      fn: () => {
        setType("");
        setSelected("All ");
      }
    },
    {
      name: "Facebook",
      fn: () => {
        setType("facebook");
        setSelected("Facebook ");
      }
    },
    {
      name: "Instagram",
      fn: () => {
        setType("instagram");
        setSelected("Instagram ");
      }
    },
    {
      name: "Github",
      fn: () => {
        setType("github");
        setSelected("Github ");
      }
    },
    {
      name: "LinkedIn",
      fn: () => {
        setType("linkedIn");
        setSelected("LinkedIn ");
      }
    },
    {
      name: "Email",
      fn: () => {
        setType("Email");
        setSelected("Email ");
      }
    },
    {
      name: "Twitter",
      fn: () => {
        setType("twitter ");
        setSelected("Twitter ");
      }
    },
    {
      name: "Whatsapp",
      fn: () => {
        setType("whatsapp");
        setSelected("Whatsapp ");
      }
    },
    {
      name: "Youtube",
      fn: () => {
        setType("youtube");
        setSelected("Youtube ");
      }
    },
    {
      name: "Pintrest",
      fn: () => {
        setType("pinterest");
        setSelected("Pintrest ");
      }
    },
    {
      name: "Reddit",
      fn: () => {
        setType("reddit");
        setSelected("Reddit ");
      }
    }
  ]
  return (
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {selected}
        </button>
        <ul class="dropdown-menu">
          {options.map((option)=>(
            <li key={option} onClick={()=>option.fn()}><a class="dropdown-item" href="#">{option.name}</a></li>
          ))}
        </ul>
        <script async src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    </div>
  )
}

export default DropDown