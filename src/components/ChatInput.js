import { Button } from '@mui/material'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth, db } from '../firebase';

function ChatInput({ channelName, channelId, chatRef, channelKey }) {
    const [input, setInput] = useState("");
    const [user] = useAuthState(auth);

    const sendMessage = (e) => {
        e.preventDefault();

        if (!channelId) {
            return false;
        }
        addDoc(collection(db, channelKey, channelId, "messages"), {
            message: input,
            timestamp: serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL,
            senderId: user.uid
        });

        chatRef?.current?.scrollIntoView({
            behaviour: "smooth",
        });

        setInput("");
    }

    return (
        <ChatInputContainer>

            <form>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput

const ChatInputContainer = styled.div`
    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form >input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        display: none !important;
    }

`