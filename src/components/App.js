import React, {useState, useEffect} from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";
import Footer from "./Footer";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => { // user가 있는지 확인하는 함수
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });//user object의 일부만 적용해야 React가 헷갈리지 않음
      }else{
        setUserObj(null);
      }
      setInit(true);
    });
  },[]);
  //새로고침할 때 마다 작동
  
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  };

  return (
    <>
      {init ? <AppRouter
                refreshUser={refreshUser} 
                isLoggedIn={Boolean(userObj)} 
                userObj={userObj}
              /> : "Initializing..."}
      <Footer/>
    </>
  );
}

export default App;