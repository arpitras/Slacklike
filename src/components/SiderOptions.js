import React from 'react'
import styled from 'styled-components'
import { db, addDoc, collection } from '../firebase';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';

function SiderOptions({ Icon, title, addChannelOption, id, onPress, setHide, hide }) {
  const dispatch = useDispatch();
  const addChannel = async () => {

    const ChannelName = prompt("Please enter the channel name");

    if (ChannelName) {

      const docRef = await addDoc(collection(db, "rooms"), {
        name: ChannelName,
      });
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom({
        roomId: id,
        name: "",
        key: "rooms"
      }))
    }
  };

  const handlePress = () => {
    if (hide) {
      setHide(false);
    }
    else {
      setHide(true);
    }
  }


  return (
    <SiderOptionsContainer onClick={
      onPress ? handlePress : addChannelOption ? addChannel : selectChannel
    }  >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )

      }
    </SiderOptionsContainer>
  )
}

export default SiderOptions;

const SiderOptionsContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`

const SidebarOptionChannel = styled.h3`
padding: 10px 0;
font-weight: 300;
`