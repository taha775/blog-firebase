// src/components/AllModerators.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModerators, approveModerator, declineModerator, deleteModerator } from '../../store/slices/authorSlice';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Config/Firebase';

const AllModerators = () => {
  const dispatch = useDispatch();
  const { moderators, status, error } = useSelector(state => state.moderators);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchModerators());
    }
  }, [status, dispatch]);

  const handleApprove = async (userId) => {
    try {
      await updateDoc(doc(db, 'users', userId), { status: 'approved' });
      dispatch(approveModerator(userId));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleDecline = async (userId) => {
    try {
      await updateDoc(doc(db, 'users', userId), { status: 'declined' });
      dispatch(declineModerator(userId));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this moderator?')) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        dispatch(deleteModerator(userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="relative h-auto w-auto">
      <h1 className="text-2xl font-bold mb-4">All Moderators</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status === 'succeeded' && (
        <>
          <p className="mb-4">Total Moderators: {moderators.length}</p>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date of Birth
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {moderators.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.uid}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.DateOfBirth}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.Mobile}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <>
                        <button
                          onClick={() => handleApprove(user.id)}
                          className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2 ${user.status !== 'pending' ? 'hidden' : ''}`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDecline(user.id)}
                          className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2 ${user.status !== 'pending' ? 'hidden' : ''}`}
                        >
                          Decline
                        </button>
                      </>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className={`bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ${user.role === "moderator" ? 'disabled' : 'enabled'}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AllModerators;
