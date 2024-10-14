import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileForm() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [photoURL, setPhotoURL] = useState(user.photoURL || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL
      });

      await updateDoc(doc(db, 'users', user.uid), {
        displayName: displayName,
        photoURL: photoURL
      });

      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-discord-light mb-1">
          Display Name
        </label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-discord-light"
          placeholder="Display Name"
        />
      </div>
      <div>
        <label htmlFor="photoURL" className="block text-sm font-medium text-discord-light mb-1">
          Photo URL
        </label>
        <input
          id="photoURL"
          type="url"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-discord-light"
          placeholder="Photo URL"
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm">{success}</p>
      )}
      <button
        type="submit"
        disabled={isUpdating}
        className={`w-full p-2 rounded bg-discord-blue text-white font-semibold hover:bg-blue-600 transition-colors ${
          isUpdating ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isUpdating ? 'Updating@.' : 'Update Profile'}
      </button>
    </form>
  );
}
