import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AvailableUsers from '../components/AvailableUsers';
import ChatPanel from '../components/ChatPanel';

const DirectMessages = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { code } = useParams();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${code}`,
        { withCredentials: true }
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const fetchMe= async () => {
    try {
      const response = await axios.get(`http://localhost:3000/ID`,
        { withCredentials: true }
      );
      console.log("current user", response.data)
      setLoggedInUser(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-72 h-full shadow-md">
        <AvailableUsers users={users} setSelectedUser={setSelectedUser} />
      </div>
      <div className="flex-1 h-full overflow-y-auto w-full">
        <ChatPanel selectedUser={selectedUser} currentUser={loggedInUser}/>
      </div>
    </div>
  );
};

export default DirectMessages;