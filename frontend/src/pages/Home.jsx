import Navbar from '../components/Navbar.jsx'
import NoteCard from '../components/NoteCard.jsx'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes.jsx'
import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../utils/axiosinstance.js'
import Toast from '../components/Toast.jsx'
import EmptyCard from '../components/EmptyCard.jsx'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userinfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  // Removed unused isSearch state

  const navigate = useNavigate();

  const handleEdit = (noteDetails) =>{
    setOpenAddEditModal({
      isShown: true,
      type: 'edit',
      data: noteDetails,
    });
  };

  const showToastMessage = (message, type) =>{
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  }

  const updateisPinned = (noteData) => {
    const noteId = noteData._id;
    try {
      const response = axiosInstance.put('/notes/pin/'+noteId, {
        isPinned: !noteData.isPinned,
      });
      if(response.data && response.data.note){
        showToastMessage(
                noteData.isPinned ? 'Note unpinned successfully' : 'Note pinned successfully',
                'success'
            );
        getallNotes();
      }

    } catch (error) {
      if(error.response && error.response.data){
        console.log("Error in updateisPinned:", error.response.data.message);
      }
    }
  }
  const handleCloseToast = () =>{
    setShowToastMsg({
      isShown: false,
      message: "",
      type: "",
    });
  }

  const getuserinfo = async () => {
    try {
      const response = await axiosInstance.get('/users/getuser');
      if (response.data) {
        setUserInfo(response.data);
      }
    } catch (error) {
      console.error("Error in getuserinfo:", error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  const getallNotes = async () =>{
    try {
      const response = await axiosInstance.get('/notes/allNotes');
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Error in getallNotes:", error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  }

  const deleteNote = async (data) =>{
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete('/notes/delete/' +noteId);
      if (response.data && !response.data.note) {
        showToastMessage('Note deleted successfully', "delete");
        getallNotes();
      }
    } catch (error) {
      if(error.response && error.response.data){
        console.log("Error in deleteNote:", error.response.data.message);
      }
    }
  }

  const onSearchNote = async (query) => {
    try{
      const response = await axiosInstance.get('/notes/search',{ params: { query },
      });
      if (response.data && response.data.notes) {
        // Removed isSearch state update
        setAllNotes(response.data.notes);
      }
    }catch (error) {
      console.log("Error in onSearchNote:", error);
    }
  };

  const handleClearSearch = () => {
    // Removed isSearch state update
    getallNotes();
  };

  useEffect(() => {
    getuserinfo();
    getallNotes();
  }, [getuserinfo, getallNotes]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching user info
  }

  return (
    <>
      <Navbar userinfo={userinfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      <div className='container mx-auto'>
        {allNotes.length > 0 ? (
          <div className='grid grid-cols-3 gap-4 mt-8'>
            {allNotes.map((item) => (
              <NoteCard title={item.title}
                key={item._id}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onDelete={() => deleteNote(item)}
                onEdit={() => handleEdit(item)}
                onPinNote={() => updateisPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard />
        )}
      </div>

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:ng-blue-900 absolute right-10 bottom-10' onClick={() => {
        setOpenAddEditModal({
          isShown: true,
          type: 'add',
          data: null,
        })
      }}>
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal 
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
        >
        <AddEditNotes
          type = {openAddEditModal.type}
          noteData = {openAddEditModal.data}
        onClose={() =>{
          setOpenAddEditModal({
            isShown: false,
            type: 'add',
            data: null,
          });
        }}
        getAllNotes={getallNotes}
        showToastMessage={showToastMessage}
         />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  )
}

export default Home