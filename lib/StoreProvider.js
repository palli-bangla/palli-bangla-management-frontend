'use client'
import { makeStore } from '@/redux/store'
import { useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'


export default function StoreProvider({ children }) {
  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider> 
}