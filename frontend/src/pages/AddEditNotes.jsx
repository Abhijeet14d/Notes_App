import { useState } from 'react'
import Taginput from '../components/Taginput'
import { MdClose } from 'react-icons/md'

const AddEditNotes = ({ noteData, type, onClose }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState([])

    const [error, setError] = useState(null)

    const addNewNote = async () =>{
        
    };

    const editNote = async () =>{};

    const handleAddNotes = ()=>{
        if(!title){
            setError('Title is required')
            return
        }
        if(!content){
            setError('Content is required')
            return
        }
        setError("");

        if(type === 'edit'){
            editNote();
        }else{
            addNewNote();
        }
    }
  return (
    <div className='relative'>
        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500'
            onClick={onClose}
        >
            <MdClose className='text-xl text-slate-400 hover:text-red-500' />
        </button>
        <div className='flex flex-col gap-2'>
            <label className='input-lable'>TITLE</label>
            <input 
                type="text"
                className='text-2xl text-slate-900 outline-none'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
             />
        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-lable'>CONTENT</label>
            <textarea 
                type="text"
                className='text-sm text-slate-900 outline-none bg-slate-50 p-2 rounded'
                placeholder='Content' 
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
             />
        </div>
        <div className='mt-3'>
            <label className='input-lable'>TAGS</label>
            <Taginput tags={tags} setTags={setTags} />
        </div>

        {error && (
            <div className='text-red-500 text-sm mt-2'>
                {error}
            </div>
        )}

        <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNotes}>Create</button>
    </div>
  )
}

export default AddEditNotes