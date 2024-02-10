import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import AddUser from '../AddUser';
import '../../App.css'


const Home = () => {
  const user = useContext(UserContext);
  const [search, setSearch] = useState('')
  const [sortdata, setSort] = useState([]);
  const [sortupdate, setSortUpdate] = useState(false)

  useEffect(() => {
    if (user) {
      setSort(user)
    }
  }, [user, sortupdate])


  // This Function work for data Searching
  const Search = (e) => {
    console.log(e);
    setSearch(e)
    const FilterData = user?.filter((data) => {
      const fullName = (data.firstName + ' ' + data.lastName).toLowerCase();
      const searchTerm = search.toLowerCase();
      return fullName.includes(searchTerm);
    });
    setSort(FilterData)
  }

  // This Function work for data Sorting
  const SortData = (event) => {
    let value = event.target.value;
    if (value === 'name') {
      let newdata = sortdata?.sort((a, b) => a.firstName.localeCompare(b.firstName));
      setSort(newdata)
      setSortUpdate(!sortupdate)

    } else if (value === 'email') {
      let newdata2 = sortdata?.sort((a, b) => a.email.localeCompare(b.email));
      setSort(newdata2)
      setSortUpdate(!sortupdate)

    } else if (value === 'company') {
      let newdata3 = sortdata?.sort((a, b) => a.company.name.localeCompare(b.company.name));
      setSort(newdata3)
      setSortUpdate(!sortupdate)
    }


  }
  return (
    <div>


      <div className="lg:px-20 md:px-5 px-2">
        <div className="text-center mt-5 font-semibold  bg-[#0891B2]  py-2 md:flex md:justify-between px-5">
         
          <div className=''>
            <h3 className='text-yellow-400 font-bold text-2xl'>Sort By</h3>
            <p className='h-[3px] w-20 bg-black text-center mx-auto'></p>
            <div className='flex gap-x-3 text-white'>
              <div className='flex'>
                <input type='radio' name='name' value="name" onChange={SortData} />

                <p className='ml-2'> Name</p>
              </div>
              <div className='flex'>
                <input type='radio' name='name' value="email" onChange={SortData} />
                <p className='ml-2'>Email</p>
              </div>
              <div className='flex'>
                <input type='radio' name='name' value="company" onChange={SortData} />
                <p className='ml-2'>Company Name</p>
              </div>
            </div>
          </div>
          <div className='md:flex md:justify-center items-center mt-2 md:mt-0'>
          <input type="text"
            className='px-3 py-2 '
            placeholder="Search"
            value={search}
            onChange={(e) => Search(e.target.value)} />
            </div>
          <div className='flex justify-center items-center md:mt-0 mt-2'>
            <AddUser />
          </div>
        </div>
        {
          user? <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-5 gap-y-20 mt-20 mb-6">
          {
            sortdata && sortdata.map((item, index) => {
              return (
                <div className="  shadow-lg rounded-lg px-5" key={index} >
                  <div className="flex justify-center ">
                    <img
                      className="w-64 h-64 rounded-full border border-yellow-300 mt-[-40px]"
                      alt={item.firstName}
                      src={item.image}
                    />
                  </div>

                  <Link to={`${item.id}`} className="text-2xl text-center my-5 font-bold tracking-tight  text-green-500">
                    <span className='text-1xl font-semibold'>{item.firstName}</span>
                    <span className='text-1xl font-semibold pl-2'>{item.lastName}</span>
                  </Link>

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

        </div>:  <div className='w-full mt-20 flex justify-center items-center'>
          <h1 className='text-3xl font-bold text-yellow-500'>Loading Data...</h1>
        </div>
        }
       
      
      </div>
    </div>
  );
};

export default Home;