import React from 'react';
import LeftMenu from '../../components/LeftMenu'
import {Redirect} from 'react-router-dom';

function ManageSchedule(props) {
  const token = localStorage.getItem('token')

  let isLoggedIn = true
  if (token == null) {
    isLoggedIn = false
  }

  if (!isLoggedIn) {
    return <Redirect to="/admin" />
  }
  return (
    <div>
    <LeftMenu />
      schedule
    </div>
  );
}

export default ManageSchedule;