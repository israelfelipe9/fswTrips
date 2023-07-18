import { prisma } from '@/lib/prisma'
import React from 'react'

const getTrips = async () => {
  const trips = await prisma.trip.findMany({})
  return trips
}

const Trips = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())


  return (
    <div>{data.map(d => <p key={d.id}>{d.title}</p>)}</div>
  )
}

export default Trips