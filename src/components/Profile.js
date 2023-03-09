import React from 'react'
import UserCalendar from './UserCalendar'
import Sidebar from './Sidebar'
import ClockIn from './ClockIn'

export default function Profile() {
  return (
    <div>
      <Sidebar />
      <ClockIn />
      <UserCalendar />
    </div>
  )
}
