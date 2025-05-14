import { MdAdd, MdClose } from 'react-icons/md'
import { useState } from 'react'

const Taginput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const addNewTag = () =>{
        if(inputValue.trim() === '') return;
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
    }

    const handleKeydown = (e) =>{
        if(e.key === 'Enter'){
            addNewTag();
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    }
  return (
    <div>

        {tags?.length > 0 && (
            <div className='flex items-center gap-2 flex-wrap mt-2'>
            {tags.map((tag, index) => (
                <span key={index} className='flex items-center gap-2 bg-slate-200 text-slate-900 text-sm px-3 py-1 rounded-full mt-2'>
                    #{tag}
                    <button onClick={()=>{handleRemoveTag(tag)}} >
                        <MdClose className='text-slate-900 hover:text-red-500' />
                    </button>
                </span>
            ))}
            </div>
        )}
        <div className='flex item-center gap-4 mt-3'>
            <input 
                type="text"
                className='text-sm bg-transparent border px-3 py-2 rounded outline-none' 
                placeholder='Add a tag'
                onChange={handleInputChange}
                onKeyDown={handleKeydown}
                value={inputValue}
             />
             <button className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-900' 
             onClick={() =>{addNewTag()}}>
                <MdAdd className='text-2xl text-blue-700 hover:text-white' />
             </button>
        </div>
    </div>
  )
}

export default Taginput