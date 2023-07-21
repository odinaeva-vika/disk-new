import React from 'react';
import { NavLink } from "react-router-dom";
import './profile.css'
import arrow from '../../assets/img/arrow.png'
import { useDispatch } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";

const Profile = () => {
    const dispatch = useDispatch()

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div>
          <div className="avatar__box">
            <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <img src={arrow} alt="назад" className="avatar__arrow"/>
            </NavLink>
            <button onClick={() => dispatch(deleteAvatar())} className="avatar__delete">Удалить аватар</button>
          </div>
            <input accept="image/*" onChange={e => changeHandler(e)} className="avatar__input" type="file" placeholder="Загрузить аватар"/>
        </div>
    );
};

export default Profile;
