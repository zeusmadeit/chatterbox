import { useState, useRef } from 'react';
import { auth, db } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { uploadFile, getFile } from '@/lib/utils';

export default function ProfileForm() {
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState(user.displayName || '');
  // const [photoURL, setPhotoURL] = useState(user.photoURL || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef(null);

  const handleUpload = async (e) => {
    const folder = "avatars/";
    if (selectedFile) {
      const imagePath = await uploadFile(selectedFile, folder);
      const imageUrl = await getFile(imagePath);
      return imageUrl;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setError('');
    setSuccess('');

    const imageUrl = await handleUpload();
    try {
      if (imageUrl) {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: imageUrl,
        })
      } else {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        });
      }

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
      {user?.photoURL && <div className="flex flex-row items-center justify-center"> <img src={user.photoURL} className="my-5 max-h-[140px] max-w-[140px] rounded-full"/> </div>}
      <div>
        <label htmlFor="profilePic" className="block text-sm font-medium text-[var(--text-normal)] mb-1">
          Update Profile Picture
        </label>
        <input
          id="profilePic"
          type="file"
          ref={fileRef}
          onChange={(e) => setSelectedFile(e?.target?.files?.[0])}
        />
      </div>
      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-[var(--text-normal)] mb-1">
          Display Name
        </label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-2 border-none rounded bg-gray-700 text-[var(--text-normal)]"
          placeholder="Display Name"
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
        className={`w-full p-2 rounded text-white font-semibold bg-blue-600 transition-colors ${
          isUpdating ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isUpdating ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
}
