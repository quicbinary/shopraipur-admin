"use client"
import React,{ useEffect, useState } from 'react'
import Selectaddtype from '@/components/ads/selectaddtype'
import { useRouter } from 'next/navigation';
import Sponsorship from '@/components/ads/sponsorship'


export default function page() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user data to state
    } else {
      router.push("/notfound"); // Redirect to 404 page if no user is found
    }
  }, [router]); // Ensure that router is used as a dependency

  return (
    <div>
    <Sponsorship/>
    <Selectaddtype/>
    </div>
  )
}