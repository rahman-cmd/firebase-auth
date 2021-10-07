import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, sendEmailVerification, /* signInWithPopup, GoogleAuthProvider, signOut, */ createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.init.';


initializeAuthentication();

// const provider = new GoogleAuthProvider();

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  // const [user, setUser] = useState({})

  const auth = getAuth();
  /* const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  } */

  /* const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  } */

  const toggleLogin = e => {
    setIsLogin(e.target.checked);
  }

  const handleName = e => {
    setName(e.target.value);

  }
  const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const handleRegister = e => {
    e.preventDefault();
    console.log(email, password);
    if (password.length < 6) {
      setError('Password Must be at least 6 characters long.')
      return;
    }
    if (!/^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/.test(password)) {
      setError('Password must contain tow upaercase and number soymble');
      return;
    }
    // isLogin ? processLogin(email, password) : registerNewUser(email, password)
    if (isLogin) {
      processLogin(email, password);
    }
    else {
      registerNewUser(email, password);
    }
  }

  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('');

      })
      .catch(error => {
        setError(error.message);
      })

  }

  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('');
        verifyEmail();
        setUserName();
      })
      .catch(error => {
        setError(error.message);
      })
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then(result => { })
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {
        console.log(result);
      })
  }

  const handelResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(result => {
      })
  }


  return (
    <div className="mx-5">
      {/* {!user.name ?
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign in</button>
        </div> :
        <button onClick={handleGoogleSignOut}>Google Sign out</button>

      }
      <br />
      {
        user.email && <div>
          <h2>Welcome {user.name}</h2>
          <p>I konw your email address: {user.email}</p>
          <img src={user.photo} alt="" />
          <h1>This is a simple website</h1>
        </div>
      } */}
      <br /><br /><br />
      <div>
        <form onSubmit={handleRegister}>
          <h3 className="text-primary">Please {isLogin ? 'Login' : 'Register'}</h3>
          {!isLogin && <div className="row mb-3">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control mb-3" id="inputName" onBlur={handleName} placeholder="Enter your Name" />
            </div>
          </div>}
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input onBlur={handleEmailChange} type="email" required className="form-control" id="inputEmail33" />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input onBlur={handlePasswordChange} type="password" required className="form-control" id="inputPassword3" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <div className="form-check">
                <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
                <label className="form-check-label" htmlFor="gridCheck1">
                  Already Registered?
                </label>
              </div>
            </div>
          </div>
          <div className="row mb-3 text-danger">{error}</div>
          <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button>
          <button type="button" onClick={handelResetPassword} className="btn btn-secondary btn-sm mx-3">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default App;
