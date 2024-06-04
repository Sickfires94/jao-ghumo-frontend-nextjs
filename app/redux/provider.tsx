'use client';

import React, { ReactNode, useRef, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import {store} from './store';
import { setAuthFromStorage } from './authSlice';
import { setUserFromStorage } from './userSlice';

interface ReduxProviderProps {
  children: React.ReactNode;
}

const InitializeAuth = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthFromStorage());
    dispatch(setUserFromStorage());
  }, [dispatch]);

  return <>{children}</>;
};

export default function ReduxProvider({ children }: ReduxProviderProps) {
  const storeRef = useRef<typeof store | null>(null);

  if (!storeRef.current) {
    storeRef.current = store;
  }

  return (
    <Provider store={storeRef.current}>
      <InitializeAuth>
        {children}
      </InitializeAuth>
    </Provider>
  );
}
