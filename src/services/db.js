import { getFirestore, setDoc, doc } from 'firebase/firestore';

// Services
import firebaseApp from '@/services/firebase';

const fireStore = getFirestore(firebaseApp);

export const createUser = async (uid, data) => {
    return await setDoc(
        doc(fireStore, 'users', uid),
        { uid, ...data },
        { merge: true }
    );
};
