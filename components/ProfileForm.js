import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileForm() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [photoURL, setPhotoURL] = useState(user.photoURL || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL
      });

      await updateDoc(doc(db, 'users', user.uid), {
        displayName: displayName,
        photoURL: photoURL
      });

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Display Name"
      />
      <input
        type="url"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
        placeholder="Photo URL"
      />
      <button type="submit">Update Profile</button>
    </form>
  );
}
