import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Config/Firebase';

const Allusers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">UID</th>
            <th className="py-2 px-4 border-b">Date of Birth</th>
            <th className="py-2 px-4 border-b">Country</th>
            <th className="py-2 px-4 border-b">Mobile</th>
            <th className="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.uid}</td>
              <td className="py-2 px-4 border-b">{user.DateOfBirth}</td>
              <td className="py-2 px-4 border-b">{user.country}</td>
              <td className="py-2 px-4 border-b">{user.Mobile}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allusers;
