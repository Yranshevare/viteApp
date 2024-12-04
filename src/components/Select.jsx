import React,{useId} from 'react'

function Select({
    options,
    label,
    className="",
    ...props
},ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {
            label && <label htmlFor={id} className=''></label>
        }
        <select 
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} 
        id={id} {...props} 
        ref={ref}>
            {
                options?.map((option)=>(        //optionally mapping over the option which will ve the array
                    <option key={option} value={option}></option>
                ))
            }
        </select>
    </div>
  )
}

export default reactHooksModule.forwardRef(Select)  //as this as select is returning the reference of an select felid it should be inside the forwardRef   
