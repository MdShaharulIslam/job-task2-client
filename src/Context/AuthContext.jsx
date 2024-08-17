/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,

  signInWithPopup,
} from "firebase/auth";
import app from "../firebase.config";



const auth = getAuth(app);

export const ContextData = createContext(null);

const AuthContext = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const GoogleProvider = new GoogleAuthProvider();

  // Create user with email and password
  const createUser = async (email, password) => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    return userCredential;
  };

  // Sign user in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  };

  // Update user profile name and photo
  const profileUpdate = async (name, photo) => {
    setLoading(true);
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    const updatedUser = {
      ...auth.currentUser,
      displayName: name,
      photoURL: photo
    };
    setUser(updatedUser);
  };

  // Log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Google login
  const googleLogin = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, GoogleProvider);
    return result;
  };





  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {

        setLoading(false);
      } else {
        setLoading(false);
        setUser(null);

      }
    });
    return () => {
      unsubscribe();
    };
  }, [user,auth]);

  const contextData = {
    createUser,
    signIn,
    profileUpdate,
    user,
    logOut,
    loading,
    setLoading,
    googleLogin,
    setUser,
    
  };

  return (
    <ContextData.Provider value={contextData}>
      {children}
    </ContextData.Provider>
  );
};

export default AuthContext;