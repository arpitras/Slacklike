import styled from 'styled-components';
import React, { useEffect, useState } from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import AppsIcon from '@mui/icons-material/Apps';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SiderOptions from './SiderOptions';
import AddIcon from "@mui/icons-material/Add"
import { db, collection, auth } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import ForumIcon from '@mui/icons-material/Forum';
import DirectMessages from './DirectMessages';
import { getAllUsers } from '../Utility/function';

function Sidebar() {
    const [user] = useAuthState(auth);
    const [hide, setHide] = useState(false);
    const [Users, setUsers] = useState(null);
    const [channels, loading, error] = useCollection(collection(db, "rooms"),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        });

    useEffect(() => {
        hello();
    }, [user])

    async function hello() {
        if (user) {
            const data = await getAllUsers(user.uid);
            setUsers(data);
          // console.log(data.);
            // dispatch(getUsers(data));
        }
    }


    return (

        <SidebarContainer>

            <SidebarHeader>
                <SidebarInfo>
                    <h2>Mikey</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {user.displayName}
                    </h3>
                </SidebarInfo>
                <CreateIcon />
            </SidebarHeader>

            <SiderOptions Icon={InsertCommentIcon} title="Threads" />
            <SiderOptions Icon={InboxIcon} title="Mentions & reactions" />
            <SiderOptions Icon={DraftsIcon} title="Saved Items" />
            <SiderOptions Icon={BookmarkBorderIcon} title="Channel browser" />
            <SiderOptions Icon={PeopleAltIcon} title="People & user group" />
            <SiderOptions Icon={AppsIcon} title="Apps" />
            <SiderOptions Icon={FileCopyIcon} title="File browser" />

            <hr />

            <SiderOptions onPress setHide={setHide} hide={hide} Icon={!hide ? ExpandLessIcon : ExpandMoreIcon} title="Channels" />


            {!hide && <SiderOptions Icon={AddIcon} addChannelOption title="Add Channel" />}

            {!hide && channels?.docs.map(doc => (
                <SiderOptions key={doc.id} id={doc.id} title={doc.data().name} />
            ))}

            <hr />

            <SiderOptions Icon={ForumIcon} addChannelOption title="Direct Messages" />

            {Users && Users.docs.map(doc => (
                <DirectMessages key={doc.data().userId} userId={doc.data().userId} name={doc.data().name} imgUrl={doc.data().imgUrl} />

            ))}
        </SidebarContainer>
    )
}

export default Sidebar;

const SidebarContainer = styled.div`

background-color: var(--slack-color);
color: white;
flex: 0.3;
border-top: 1px solid #49274b;
margin-top: 60px;
max-width: 260px;
overflow-y: scroll;

::-webkit-scrollbar {
  width: 0px;
}

> hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
}
`


const SidebarHeader = styled.div`
display: flex;
border-bottom: 1px solid #49274b;
padding: 13px;

> .MuiSvgIcon-root{
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
}

`
const SidebarInfo = styled.div`

    flex: 1;
    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`


