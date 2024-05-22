import React from 'react'
// common buttons

function Button({
    children,
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props  // jitni user ne property di hai woh h yeh
}) {

  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} `}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button


// forword ref :- jab hum ek login form bna rhe h usme input field alag h whi input field hum har jagh use krenge toh login page alag h toh wha is input field ke access ke liye hume refrence dena hoga toh uske liye hum forword ref use krte hai