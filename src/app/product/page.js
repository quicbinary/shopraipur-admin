import React from 'react'
import Addproduct from '@/components/product/addproduct'
import Filterproduct from '@/components/product/filterproduct'
import Productview from '@/components/product/productview'
import Header from '@/components/header'
export default function page() {
  return (
    <div>
      <Header/>
      <Addproduct/>
      <Filterproduct/>
      <Productview/>
    </div>
  )
}