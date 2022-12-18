import { Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth, provider } from '../firebase';
import { createUser, getAllUsers } from '../Utility/function';
import logo from "./../assets/logo-slack.png";
function Login() {
  const [user, loading] = useAuthState(auth);

  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).then((result) => {
      const USER = {
        userId: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        phoneNumber: result.user.phoneNumber,
        imgUrl: result.user.photoURL
      }

      createUser(USER);
    }).catch((error) => {

    });

  }




  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src={logo} alt="" />
        <h1>Sign In</h1>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>

    </LoginContainer>
  )
}

export default Login

const LoginContainer = styled.div`
background-color: #f8f8f8;
height: 100vh;
display: grid;
place-items: center;
`

const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  >img {
    object-fit: contain;
    height: 100px;
    margin: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit ;
    background-color: #0a8d48 !important;
    color: white;
  }
`