import React, { useId } from 'react'

// iska kaam complete header manage karn h matlb hume agar background change krna h khi toh hum isme bs ek jagh kr denge alag alag jagh nahi karna padega , bas yahi kaam hai iska
 function Container({children}) {
  const id=useId()
  
  return (
    <div className='w-full max-w-7xl mx-auto px-4' key={id}>{children}</div>
  )
}

export default Container