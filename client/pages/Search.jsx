import React from 'react'
import { useSelector } from 'react-redux';

export default function search() {

  const search = useSelector((state) => state.search);
  console.log(search)

  return (
    <div>search</div>
  )
}
