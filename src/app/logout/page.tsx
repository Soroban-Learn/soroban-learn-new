'use client';

import { alertMessages } from '@/constants/alertMessages';
import { useAuth } from '@/hooks';
import React, { useEffect } from 'react';
import toast, { Themes } from 'react-simple-toasts';

import 'react-simple-toasts/dist/theme/failure.css';

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    toast(alertMessages.logout, { theme: Themes.FAILURE, duration: 1500 });
    logout();
  }, [logout]);
  return <div>Logout</div>;
}
