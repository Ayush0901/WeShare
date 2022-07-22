import React from 'react';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { client } from '../client';
import jwt_decode from "jwt-decode";
import logo2 from "../assets/logo2.png"
import Footer from './Footer';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const Login = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)

  const responseGoogle = (response) => {
    // console.log(response);
    var userObject = jwt_decode(response.credential);
    // console.log(userObject);
    localStorage.setItem('user', JSON.stringify(userObject));
    const { name, sub, picture } = userObject;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    // console.log(doc);


    MySwal.fire({
      title: <p>Hold a sec..</p>,
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        MySwal.showLoading()
        client.createIfNotExists(doc).then(() => {
          navigate('/', { replace: true });
        });
      },
    }).then(() => {
      return MySwal.fire({
        title: <p>Logged in as {name}</p>,
        icon: 'success'
      })
    })


  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center     bg-blackOverlay">
          <div className="p-5">
            <img src={logo2} alt='logo' width="130px" />
          </div>
          <div className="shadow-2xl">
            <GoogleOAuthProvider
              clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
            >
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => {
                  console.log('Login Failed');
                }}
                theme="filled_black"
                size="large"
                shape='pill'
                useOneTap
              />
            </GoogleOAuthProvider>
          </div>
          
          
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Login