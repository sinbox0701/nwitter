import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({refreshUser,userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    // const getMyNweets = async () => {
    //     const nweets = await dbService
    //                             .collection("nweets")
    //                             .where("creatorId","==",userObj.uid)
    //                             .orderBy("createdAt")
    //                             .get();
    // }; 

    // useEffect(() => {
    //     getMyNweets();  
    // },[]);// 내가 쓴 NWEET 읽어 오는 방법
    const onChange = (event) => {
        const {
            target: {value}
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName:newDisplayName
            });
            refreshUser();
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    onChange={onChange}
                    type="text"
                    placeholder="Display Name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};