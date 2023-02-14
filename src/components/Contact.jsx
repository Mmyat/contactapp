import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {AiFillDelete,AiFillEdit,AiOutlinePlusCircle} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import {IoMdContact} from 'react-icons/io'
const Contact = () => {
  const [contact,setContact]=useState([]);
  const getContact = async()=>{
    const {data} = await axios.get('http://localhost:3001/contacts')
    setContact(data);
  }
  const swalWithButtons = Swal.mixin({
    customClass: {
      confirmButton: 'bg-orange-500 text-white px-5 py-1 rounded shadow-lg',
      cancelButton: 'bg-red-500 text-white px-5 py-1 rounded shadow-lg mr-3'
    },
    buttonsStyling: false
  })
  const apiDeleteContact=async(id)=>{
    swalWithButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {
        swalWithButtons.fire(
          'Deleted!',
          'Your contact has been deleted.',
          'success'
        );
        const {data}= await axios.delete(`http://localhost:3001/contacts/${id}`);
        getContact();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithButtons.fire(
          'Cancelled',
          'Your contact is safe :)',
          'error'
        )
      }
    })
  }
  useEffect(()=>{
    getContact()
  },[])
  return (
    <>
    <div className='flex flex-col text-center'>
      <IoMdContact className='text-cyan-500 self-center  text-7xl'/>
      <h1 className='text-cyan-500 text-3xl'>Contact App</h1>
    </div>
    <Link to="/create">
        <button className='flex align-middle items-center text-white bg-emerald-500 rounded px-4 py-2 my-3'>
          Create New Contact
          <AiOutlinePlusCircle className='ml-2'/>
        </button>
    </Link>
    <div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-white-400">
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 bg-gray-500">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Email Address
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-500">
                          Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                {contact?.map((contact,key=contact.id)=>(
                  <tr key={contact.id} className="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 bg-gray-500 dark:text-white dark:bg-black-300">
                          {contact.name}
                      </th>
                      <td className="px-6 py-4">
                          {contact.email}
                      </td>
                      <td className="px-6 py-3 text-gray-900 bg-gray-500">
                          {contact.phone}
                      </td>
                      <td className="px-6 py-4 flex gap-3">
                        <Link to={`/edit/${contact.id}`}>
                          <AiFillEdit className='text-2xl text-orange-500 cursor-pointer'/>
                        </Link>
                        <AiFillDelete onClick={()=>apiDeleteContact(contact.id)} className='text-2xl text-red-500 cursor-pointer'/>
                      </td>
                  </tr>
                ))}
              </tbody>
          </table>
      </div>
    </div>
    </>
  )
}

export default Contact;