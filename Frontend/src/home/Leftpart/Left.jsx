import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'
import Menu from '../../components/Menu'

function Left() {
  return (
    <div className='w-[30%] bg-black text-gray-300'>
      <Search />
      <div style={{minHeight: "calc(84vh - 10vh)"}} className='overflow-y-auto scrollbar-none' >
       <Users />
      </div>
      <Logout />
    </div>
  )
}

export default Left
