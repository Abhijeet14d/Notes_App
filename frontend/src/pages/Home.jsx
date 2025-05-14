import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'

const Home = () => {
  return (
    <>
      <Navbar />

      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <NoteCard title="Meeting on topics"
            date="2023-10-01"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna a"
            tags="#Meeting"
            isPinned={true}
            onDelete={() => {}}
            onEdit={() => {}}
            onPinNote={() => {}}
          />
        </div>

      </div>

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:ng-blue-900 absolute right-10 bottom-10' onClick={() => {}}>
        <MdAdd className='text-[32px] text-white' />
      </button>

      <AddEditNotes />
    </>
  )
}

export default Home