import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function useFollow() {
  const follow = async ({ uid, authorId, followersAuthor, followingUser }) => {
    // Tambahkan id user ke field followers author
    const followerRef = doc(db, 'users', authorId);
    await updateDoc(followerRef, {
      follower: [...followersAuthor, uid],
    });

    // Tambahkan following
    const followingRef = doc(db, 'users', uid);
    await updateDoc(followingRef, {
      following: [...followingUser, authorId],
    });
  };

  const unfol = async ({ uid, authorId, followersAuthor, followingUser }) => {
    const follower = followersAuthor.filter((fol) => fol !== uid);
    const following = followingUser.filter((fol) => fol !== authorId);

    // Hapus id user di field followers author
    const followerRef = doc(db, 'users', authorId);
    await updateDoc(followerRef, {
      follower: [...follower],
    });

    // Hapus Following
    const followingRef = doc(db, 'users', uid);
    await updateDoc(followingRef, {
      following: [...following],
    });
  };

  return { unfol, follow };
}
