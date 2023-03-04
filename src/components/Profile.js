import React from 'react'
import UserCalendar from './UserCalendar'
import ClockIn from './ClockIn'

export default function Profile() {
  return (
    <div>
      <ClockIn />
      <UserCalendar />
    </div>
  )
}
