import React, { useState } from 'react';
import {
    Button,
    Dialog,
    Input,
    DialogFooter,
  } from "@material-tailwind/react";

const AddUser = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = ()=>{
      setOpen(!open)}
    return (
        <div>
            <button className='bg-white text-yellow-600 px-4 py-1 rounded-md hover:text-green-500 cursor-pointer'onClick={()=>handleOpen()}>Add Data</button>
               <Dialog open={open} handler={handleOpen} size="md">
   <h1 className="text-3xl font-bold py-2 text-center  applicationTitle text-[#FFD321]">
          Add User
        </h1>
        <div className="grid gap-y-4 mt-3 px-10">
          <div className="grid grid-cols-6 gap-x-2">
            <div className="w-full md:col-span-3 col-span-6">
              <Input
                variant="standard"
                required
                name="First Name"
                label="First Name"
                size="md"
                color="indigo"
                maxLength={255}
              />
            </div>
            <div className="w-full md:col-span-3 col-span-6">
              <Input
                variant="standard"
                required
                label="Last Name"
                size="md"
                color="indigo"
                name="Last Name"
                type="text"
               
          
                onInput={(e) => (e.target.value = e.target.value.slice(0, 15))}
              />
            </div>
          </div>
          </div>
        <div className="grid gap-y-4 mt-3 px-10">
          <div className="grid grid-cols-6 gap-x-2">
            <div className="w-full md:col-span-3 col-span-6">
              <Input
                variant="standard"
                required
                name="Email"
                label="Email"
                size="md"
                color="indigo"
                maxLength={255}
              />
            </div>
            <div className="w-full md:col-span-3 col-span-6">
              <Input
                variant="standard"
                required
                label="City"
                size="md"
                color="indigo"
                name="City"
                type="text"
               
          
                onInput={(e) => (e.target.value = e.target.value.slice(0, 15))}
              />
            </div>
          </div>
          </div>
        <div className="grid gap-y-4 mt-3 px-10">
          <div className="grid grid-cols-6 gap-x-2">
            <div className="w-full md:col-span-3 col-span-6">
              <Input
                variant="standard"
                required
                name="Address"
                label="Address"
                size="md"
                color="indigo"
                maxLength={255}
              />
            </div>
            <div className="w-full md:col-span-3 col-span-6">
              <Input
                variant="standard"
                required
                label="Company"
                size="Company"
                color="indigo"
                name="City"
                type="text"
               
          
                onInput={(e) => (e.target.value = e.target.value.slice(0, 15))}
              />
            </div>
          </div>
          </div>
        <DialogFooter className=' flex justify-center'>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
        </div>
    );
};

export default AddUser;