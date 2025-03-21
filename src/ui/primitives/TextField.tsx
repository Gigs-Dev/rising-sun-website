import Image from 'next/image';
import React, { FC } from 'react';



interface IType {
  type: string;
  className: string;
  className1?: string;
  img?: string;
  placeholder: string;
}


const TextField: FC<IType> = ({type, className, className1, img, placeholder}) => {
  return (
    <div className={`flex items-center ${className1}`}>
        <h1 className=''></h1>
       {img && <Image src={img || ''} alt='' className='w-[40px] h-[40px] object-cover'/>}
        <input type={type} className={`${className} outline-none`} placeholder={placeholder}/>
    </div>
  )
}

export default TextField;
