import React from 'react'
import Addproduct from '@/components/product/addproduct'
import Filterproduct from '@/components/product/filterproduct'
import Productview from '@/components/product/productview'
export default function page() {
  return (
    <div>
      <Addproduct/>
      <Filterproduct/>
      <Productview/>
    </div>
  )
}