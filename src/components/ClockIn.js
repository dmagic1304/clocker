import React from 'react'
import { format } from 'date-fns'


export default function ClockIn() {
  const date = format(new Date(), 'Pp')

  return (
    <div>
      Welcome "name"  {/*get user name from authorization */}
      {date}
      <button >Clock in</button>
    </div>
  )
}
