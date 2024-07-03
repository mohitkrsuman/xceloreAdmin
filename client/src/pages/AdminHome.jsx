import React from 'react'

const data = [
   {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@gmail.com"
   },
   {
      "id": 2,
      "name": "John Doe",
      "email": "johndoe@gmail.com"
   },
   {
      "id": 3,
      "name": "John Doe",
      "email": "johndoe@gmail.com"
   },
]

const AdminHome = () => {
  return (
    <div className='w-full'>
       {data.length ? data.map((item) => (
         <div className='w-[60%]' key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.email}</p>
            <div className='functions'>
               <button>Edit</button>
               <button>Delete</button>
            </div>
         </div>
       )) : (<div>No data</div>)}
    </div>
  )
}

export default AdminHome