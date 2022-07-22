import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AiTwotoneHeart, AiOutlineEllipsis } from 'react-icons/ai';
import { IconContext } from "react-icons";


const Pin = ({ pin }) => {
  const MySwal = withReactContent(Swal)

  // const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  const { postedBy, image, _id, destination } = pin;

  const user = fetchUser();
  const deletePin = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        client
          .delete(id)
          .then(() => {
            setTimeout(function () {
              window.location.reload();
            }, 5000);
            MySwal.fire(
              'Deleted!',
              'Your pin has been deleted.',
              'success'
            )
          });

      }
    })


  };

  let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.sub);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.sub,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.sub,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };



  return (
    <div className="m-2">
      <div
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {image && (
          <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" />)}
        <div
          className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
          style={{ height: '100%' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <a
                href={`${image?.asset?.url}?dl=`}
                download
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              ><MdDownloadForOffline />
              </a>
            </div>
            {alreadySaved?.length !== 0 ? (
              <button type="button" className="bg-red-400 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                {pin?.save?.length}  
                <IconContext.Provider value={{ color: "#F32424", className: "global-class-name" ,size:"20px"}}>
                  <AiTwotoneHeart />
                </IconContext.Provider>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  savePin(_id);
                }}
                type="button"
                className="bg-red-400 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
              >
                {pin?.save?.length}   {savingPost ? <AiOutlineEllipsis /> : <AiTwotoneHeart />}
              </button>
            )}
          </div>
          <div className=" flex justify-between items-center gap-2 w-full">
            {destination?.slice(8).length > 0 ? (
              <a
                href={destination}
                target="_blank"
                className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                rel="noreferrer"
              >
                {' '}
                <BsFillArrowUpRightCircleFill />
                {destination?.slice(8, 17)}...
              </a>
            ) : undefined}
            {
              postedBy?._id === user?.sub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )
            }
          </div>
        </div>
      </div>
      <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
