import { AvailabilityItem, Car } from './types';

export const setName = (name: string) => ({ type: 'SET_NAME', payload: name });
export const setEmail = (email: string) => ({ type: 'SET_EMAIL', payload: email });
export const setPhone = (phone: string) => ({ type: 'SET_PHONE', payload: phone });
export const setToastMessage = (toastMessage: string) => ({ type: 'SET_TOAST_MESSAGE', payload: toastMessage });
export const setOpenErrorToast = (openErrorToast: boolean) => ({ type: 'SET_OPEN_ERROR_TOAST', payload: openErrorToast });
export const setHourSelected = (hourSelected: number) => ({ type: 'SET_HOUR_SELECTED', payload: hourSelected });
export const setAvailability = (availability: AvailabilityItem[]) => ({ type: 'SET_AVAILABILITY', payload: availability });
export const setCar = (car: Car) => ({ type: 'SET_CAR', payload: car });
export const setCars = (cars: Car[]) => ({ type: 'SET_CARS', payload: cars });
export const setLoading = (loading: boolean) => ({ type: 'SET_LOADING', payload: loading });
export const setSelectedDay = (selectedDay: Date) => ({ type: 'SET_SELECTED_DAY', payload: selectedDay });
export const resetState = () => ({ type: 'RESET_STATE' });
