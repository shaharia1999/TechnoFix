import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Routes, Route, useParams } from 'react-router-dom';


const Slug = () => {
    const user = useContext(UserContext);
    const {id}= useParams();
     let newId=Number(id)
    const singleItem=user&& user.find((x)=>x.id===newId);
    console.log(singleItem);
    return (
        <div className='container mx-auto mt-5'>
            <h1 className='text-center font-bold text-2xl py-1 bg-[#0891B2] text-yellow-400'>Single Product Hare</h1>
            <div className="cursor-pointer w-max mx-auto  shadow-lg rounded-lg px-10 mt-20"  >
        <div className="">
          <img
            className="w-64 h-64 rounded-full border border-yellow-300 mt-[-40px] m"
            alt={singleItem?.firstName}
            src={singleItem?.image}
          />
          </div>
     
          <h4  className="text-2xl  my-5 font-bold tracking-tight  text-green-500">
           <span className='text-1xl font-semibold'>{singleItem?.firstName}</span>
            <span className='text-1xl font-semibold pl-2'>{singleItem?.lastName}</span>
          </h4>

          <p className="font-bold  text-gray-700 dark:text-gray-400  ">
           Email : <span className='text-1xl font-semibold'>{singleItem?.email}</span>
          </p>
          <p className="font-bold  text-gray-700 dark:text-gray-400  ">
            Address : <span className='text-1xl font-semibold'>{singleItem?.address.address}</span>
          </p>
          <p className="font-bold  text-gray-700 dark:text-gray-400  ">
            City : <span className='text-1xl font-semibold'>{singleItem?.address.city}</span>
          </p>
          <p className="font-bold  text-gray-700 dark:text-gray-400 ">
            State : <span className='text-1xl font-semibold'>{singleItem?.address.state}</span>
          </p>
          <h5 className="text-1xl font-semibold tracking-tight  pb-10">
          Company Name :  <span className='text-1xl font-semibold '>{singleItem?.company.name}</span>
          </h5>
        </div>
        </div>
    );
};

export default Slug;