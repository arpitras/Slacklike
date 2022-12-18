import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, addDoc, collection } from '../firebase';
import { getAllUsers } from '../Utility/function';
import styled from 'styled-components';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';


function DirectMessages({ imgUrl, userId, name }) {
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    // console.log(imgUrl);

    const openChat = async () => {
        if (user && userId) {
            const key = user.uid > userId ? user.uid + userId : userId + user.uid;
            dispatch(enterRoom({
                roomId : key,
                key: "directMessages",
                name: name
            }))
            
        }
    }

    return (
        <DirectMessagesContainer key={userId} onClick={openChat}>
            <DirectMessagesOption >
                <img src={imgUrl} alt={""} /> {name}
            </DirectMessagesOption>
        </DirectMessagesContainer>
    )
}

export default DirectMessages

const DirectMessagesContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }
`

const DirectMessagesOption = styled.h3`
padding: 10px 0;
font-weight: 450;
display: flex;
align-items: center;

>img{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
}
`