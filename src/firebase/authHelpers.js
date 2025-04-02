import { auth } from "./firebase";

import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword, sendEmailVerification } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}
export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}
export const doSignOut = () => {
    return auth.signOut();
}
export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};
export const doPasswordChange = (password) => {
    return updatePassword(currentUser, password);
};
export const doSendEmailVerification = () => {
    return sendEmailVerification(currentUser, {
        url: `${window.location.origin}/login`,
    });
};