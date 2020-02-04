import React, { useState } from 'react';

function UserInfo(props) {
    const [userName, setUserName ] = useState('');
    return (
        <div className="chatBoxUserInfoWrap">
            <input className="chatBoxUserNameInput" 
                placeholder="Enter you name" 
                onChange={(e) => setUserName(e.target.value)} 
            />
            <button className="chatBoxUserInfoSubmit" 
                onClick={() => props.onUserNameSubmit(userName)} 
            >
                Submit
            </button>
        </div>
    );
}
 
export default UserInfo;