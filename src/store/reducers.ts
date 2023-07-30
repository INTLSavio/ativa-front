const initialState = {
	name: '',
	email: '',
	phone: '',
	cars: [],
	toastMessage: '',
	openErrorToast: false,
	hourSelected: null,
	availability: null,
	car: null,
	loading: true,
	selectedDay: new Date()
};
  
type State = typeof initialState;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rootReducer = (state: State = initialState, action: any) => {
	switch (action.type) {
	case 'SET_NAME':
		return { ...state, name: action.payload };
	case 'SET_EMAIL':
		return { ...state, email: action.payload };
	case 'SET_PHONE':
		return { ...state, phone: action.payload };
	case 'SET_CARS':
		return { ...state, cars: action.payload };
	case 'SET_TOAST_MESSAGE':
		return { ...state, toastMessage: action.payload };
	case 'SET_OPEN_ERROR_TOAST':
		return { ...state, openErrorToast: action.payload };
	case 'SET_HOUR_SELECTED':
		return { ...state, hourSelected: action.payload };
	case 'SET_AVAILABILITY':
		return { ...state, availability: action.payload };
	case 'SET_CAR':
		return { ...state, car: action.payload };
	case 'SET_LOADING':
		return { ...state, loading: action.payload };
	case 'SET_SELECTED_DAY':
		return { ...state, selectedDay: action.payload };
	case 'RESET_STATE':
		return initialState;
	default:
		return state;
	}
};