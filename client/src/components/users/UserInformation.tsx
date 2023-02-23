import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './UserInformation.css';
import { RootState } from '../../redux/store';
import EditUser from '../editUser/EditUser';

export default function UserInformation() {
  const user = useSelector((state: RootState) => state.user.loginUser);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const edit = () => {
    setEditOpen(!editOpen);
  };
  const navigate = useNavigate();
  const logOut = () => {
    navigate('/');
  };

  useEffect(() => {}, [user]);

  return (
    <div>
      <div className='user-div'>
        {user.email === '' ? (
          <p className='user-empty'>Please log in.</p>
        ) : (
          <div className='my-account-div'>
            <div className='account'>
              <h1>My account</h1>
              <p className='info'>name: {user.userName}</p>
              <p className='info'>email: {user.email}</p>
              <div className='userinfo-buttons'>
                <button className='logout-btn' onClick={logOut}>
                  LOG OUT
                </button>
                <button className='edit-btn' onClick={edit}>
                  EDIT INFO
                </button>
                <div>{editOpen === true && <EditUser user={user} setEditOpen={setEditOpen}/>}</div>
              </div>
            </div>
            <div className='history'>
              <h1>My history</h1>
              <h3>Order history</h3>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
