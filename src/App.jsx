
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setContent } from './document/slice';
import { useEffect } from 'react';
import { io } from "socket.io-client"
import Header from './Header';

function App() {
  // Use useSelector to get the content from the Redux store
  const content = useSelector((state) => state.document.content);

  // Use useDispatch to get the dispatch function for dispatching actions
  const dispatch = useDispatch();

  // useEffect to handle socket.io connection and events
  useEffect(() => {
    dispatch({ type: 'document/initiateSocket' });    
  }, [dispatch]);


  //Function to handle textarea changes
  const handleChange = async (e) => {
    // Dispatch setContent action to update the content in the Redux store
    dispatch(setContent(e.target.value));

    // Send a PUT request to update the content on the server
    const result = await fetch("https://documentapi-3eqb.onrender.com/api/documents/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          content: e.target.value
        }
      })
    });
    

  }

  // useEffect to fetch the initial content from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      // Send a GET request to fetch the content
      const res = await fetch("https://documentapi-3eqb.onrender.com/api/documents/1");
      const data = await res.json();

      // Dispatch setContent action to update the content in the Redux store with the fetched data      
      dispatch(setContent(data.data.attributes.content));
    }
    fetchData();
  }, []);

  // Render the component
  return (
    <>
    <Header />
  <div className='flex flex-col justify-center items-center bg-gray-100'>
    <div className='mb-5'>
    </div>
    <textarea className='w-3/4 h-dvh p-4 border-2 border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-black resize-none text-gray-800 placeholder-gray-500 text-lg'
      value={content}
      onChange={handleChange}
      placeholder="Type your text here..."
    >
    </textarea>
  </div>
</>

  );
}

export default App;
