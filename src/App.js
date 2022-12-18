import styled from 'styled-components';
import React from 'react';
import logo from "./assets/logo-slack.png";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { auth } from './firebase';
import Login from './components/Login';
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "react-spinkit";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContent>
          <img src={logo} alt='' />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContent>
      </AppLoading>
    )
  }





  return (
    <div className="App">
      <BrowserRouter>
        {!user ? (<Login />) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Chat />} />
              </Routes>
            </AppBody>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;

`

const AppLoading = styled.div`
  display: grid;
  place-items:center;
  height: 100vh;
  width: 100%;
`

const AppLoadingContent = styled.div`
  text-align: center;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > img {
      height: 100px;
      padding: 20px;
      margin-bottom: 40px;
    }
`