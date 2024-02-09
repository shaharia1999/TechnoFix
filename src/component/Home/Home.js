import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Home = () => {
    const user = useContext(UserContext);
    const [search,setSearch]=useState('')
    const [sortdata,setSort]=useState([])
    const [controler,sertControler]=useState(false)

    useEffect(()=>{
        if(user){
            setSort(user)  
        }
    },[user,controler])
    // console.log(sortdata);


    const Search=(e)=>{
        console.log(e);
        setSearch(e)
        const FilterData = user?.filter((data) => {
            const fullName = (data.firstName + ' ' + data.lastName).toLowerCase();
            const searchTerm = search.toLowerCase();
            return fullName.includes(searchTerm);
          });
          setSort(FilterData)
    }
     
      
    // sortdata?.sort((a, b) => a.firstName.localeCompare(b.firstName));
     const SortData=(event)=>{
        // setSort(event.target.value);
        let value=event.target.value;
       if(value==='name'){
       let newdata= sortdata?.sort((a, b) => a.firstName.localeCompare(b.firstName));
       setSort(newdata)
       sertControler(!controler)
       }else if(value==='email'){
        let newdata2= sortdata?.sort((a, b) => a.email.localeCompare(b.email));
        setSort(newdata2)
        sertControler(!controler)
       }else if(value==='company'){
        let newdata3= sortdata?.sort((a, b) => a.company.name.localeCompare(b.company.name));
        setSort(newdata3)
        sertControler(!controler)
       }
       
      
     }
    return (
        <div>
           
            <div className="px-20">
            <div className="text-center mt-5 font-semibold  bg-[#0891B2]  py-2 flex justify-between px-5">
                <input   type="text"
                className='px-4 '
              placeholder="Search"
              value={search}
              onChange={(e) =>Search(e.target.value)}/>
              <div className=''>
                <h3 className='text-yellow-400 font-bold text-2xl'>Sort By</h3>
                <p className='h-[3px] w-20 bg-black text-center mx-auto'></p>
                <div className='flex gap-x-3 text-white'>
                <div className='flex'>
                <input type='radio' name='name' value="name" onChange={SortData}/>
                
                  <p className='ml-2'> Name</p>
                </div>
                <div className='flex'>
                <input type='radio' name='name' value="email" onChange={SortData}/>
                  <p className='ml-2'>Email</p>
                </div>
                <div className='flex'>
                <input type='radio' name='name' value="company" onChange={SortData}/>
                  <p className='ml-2'>Company Name</p>
                </div>
                </div>
              </div>
                </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-5 gap-y-20 mt-20 mb-6">
                {
                  sortdata&& sortdata.map((item,index)=>{
                    return(
<div className="cursor-pointer  shadow-lg rounded-lg px-5" key={index} >
        <div className="flex justify-center ">
          <img
            className="w-64 h-64 rounded-full border border-yellow-300 mt-[-40px]"
            alt={item.firstName}
            src={item.image}
          />
          </div>
     
          <h5 className="text-2xl text-center my-5 font-bold tracking-tight  text-green-500">
           <span className='text-1xl font-semibold'>{item.firstName}</span>
            <span className='text-1xl font-semibold pl-2'>{item.lastName}</span>
          </h5>

          <p className="font-bold  text-gray-700 dark:text-gray-400  ">
           Email : <span className='text-1xl font-semibold'>{item.email}</span>
          </p>
          <p className="font-bold  text-gray-700 dark:text-gray-400  ">
            Address : <span className='text-1xl font-semibold'>{item.address.address}</span>
          </p>
          <p className="font-bold  text-gray-700 dark:text-gray-400  ">
            City : <span className='text-1xl font-semibold'>{item.address.city}</span>
          </p>
          <p className="font-bold  text-gray-700 dark:text-gray-400 ">
            State : <span className='text-1xl font-semibold'>{item.address.state}</span>
          </p>
          <h5 className="text-1xl font-semibold tracking-tight  pb-10">
          Company Name :  <span className='text-1xl font-semibold '>{item.company.name}</span>
          </h5>
        </div>
                    )
                  })  
                }
        
        </div>
        </div>
        </div>
    );
};

export default Home;