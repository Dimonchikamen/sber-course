import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { Action, configureStore, ThunkDispatch } from '@reduxjs/toolkit';

import type { StateSchema } from '$models';

type RootState = ReturnType<ReturnType<typeof configureStore<StateSchema>>['getState']>;
type AppDispatch = ReturnType<typeof configureStore<StateSchema>>['dispatch'] & ThunkDispatch<StateSchema, any, Action>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
