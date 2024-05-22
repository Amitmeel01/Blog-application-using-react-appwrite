import React, { useId } from 'react'

function Select({
    options,
    label,
    className='',
    ...Props
   
}, ref) {
const id=useId();
  return (
    <div className='w-full'>
       {label && <label htmlFor={id} className=''>{label}</label>}
       <select id={id}
       {...Props}
       ref={ref}
       className={`${className}`}
       >
         {options? options.map((item)=>
             <option key={item} value={item}>
                {item}
             </option>
        ):null}

       </select>
    </div>
  )
}

export default React.forwardRef(Select);