import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, getDoc, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import Message from "./Message";

function Chat() {
    const chatRef = useRef(null);
    const { roomId, name, key } = useSelector(selectRoomId);
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, loading, error] = useCollection(roomId && collection(db, key, roomId, "messages"), orderBy('timestamp', 'asc'));

    async function getChats(roomId) {
        const docRef = doc(db, key, roomId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //console.log(docSnap.data().timestamp);
            setRoomDetails(docSnap.data());
        }
    }

    useEffect(() => {
        if(roomMessages){
            roomMessages.docs.sort((a, b) => {
                return a.timestamp - b.timestamp;
            });
            
            roomMessages.docs.sort((a, b) => {
                return a.timestamp - b.timestamp;
            });

            console.log(roomMessages.docs);
        }

        if (roomId)
            getChats(roomId)
    }, [roomId,roomMessages])


    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behaviour: "smooth",
        });
    }, [roomId, loading])




    return (
        <ChatContainer>
            {roomDetails && roomMessages && <>

                <Header>

                    <HeaderLeft>
                        <h4><strong>{key === "rooms" ? roomDetails ? '#' + roomDetails.name : "Room" : name}</strong></h4>
                        <StarBorderOutlinedIcon />
                    </HeaderLeft>

                    <HeaderRight>
                        <p>
                            <InfoOutlinedIcon /> Details
                        </p>
                    </HeaderRight>

                </Header>

                <ChatMessages>

                    {
                        roomMessages?.docs.map(doc => {
                            const { message, timestamp, user, userImage } = doc.data();
                            return (
                                <Message key={doc.id} message={message} timestamp={timestamp} user={user} userImage={userImage} />
                            )
                        })
                    }
                    <ChatBottom ref={chatRef} />
                </ChatMessages>

                <ChatInput chatRef={chatRef} channelName={key === "rooms" ? roomDetails ? '#' + roomDetails.name : "Room" : name} channelId={roomId} channelKey={key} />
            </>}
        </ChatContainer>
    )
}

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  overflow-y: scroll;
  flex-grow: 1;
  margin-top: 60px;


`

const Header = styled.div`
display: flex;
justify-content: space-between;
padding: 20px;
border-bottom: 1px solid lightgray;
`
const HeaderLeft = styled.div`
display: flex;
align-items: center;
 > h4 {
    display: flex;
    text-transform:lowercase;
    margin-right: 10px;
 }

 >h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
 }
`
const HeaderRight = styled.div`
   > p {
    display: flex;
    align-items: center;
    font-size: 14px;
   }
   
`

const ChatMessages = styled.div`

`

const ChatBottom = styled.div`
    padding-bottom: 200px;

`