import React from 'react'
import loading from './Images/Loading.gif';

export default function Loading() {
  const loadingStyle = {
    height: '35%',
    width: '15%'
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '600px', alignItems: 'center' }}>
      <img style={loadingStyle} src={loading} alt='Loading...' />
    </div>
  )
}
