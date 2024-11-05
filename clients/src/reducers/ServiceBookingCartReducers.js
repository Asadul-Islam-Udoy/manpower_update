import {
  STORE_BOOKING_CART_REQUEST,
  STORE_BOOKING_CART_SUCCESS,
  REMOVE_BOOKING_CART_REQUEST,
  REMOVE_BOOKING_CART_SUCCESS,
  PAYMENT_ADDRESS_BOOKING_CART_SUCCESS,
  PAYMENT_ADDRESS_BOOKING_CART_REQUEST,
  FINAL_STORE_BOOKING_CART_REQUEST,
  FINAL_STORE_BOOKING_CART_SUCCESS,
  STORE_BOOKING_WORKERS_REQUEST,
  STORE_BOOKING_WORKERS_SUCCESS,
  REMOVE_BEFORE_SELECT_WORKER
} from "../constances/ServiceBookingCartConstance";

export const serviceBookingReducers = (
  state = { cartItems: [], addressInfo: {}, workersItems: [] },
  action
) => {
  switch (action.type) {
    case STORE_BOOKING_CART_REQUEST:
    case REMOVE_BOOKING_CART_REQUEST:
    case PAYMENT_ADDRESS_BOOKING_CART_REQUEST:
    case FINAL_STORE_BOOKING_CART_REQUEST:
    case STORE_BOOKING_WORKERS_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case STORE_BOOKING_CART_SUCCESS:
      return {
        ...state,
        lodding: false,
        cartItems: action.payload,
      };
    case STORE_BOOKING_WORKERS_SUCCESS:
      return {
        ...state,
        lodding: false,
        workersItems: action.payload,
      };
    case REMOVE_BEFORE_SELECT_WORKER:{
      return {
        ...state,
        lodding: false,
        workersItems: null
      }; 
    }
    case PAYMENT_ADDRESS_BOOKING_CART_SUCCESS:
      return {
        ...state,
        lodding: false,
        addressInfo: action.payload,
      };
    case REMOVE_BOOKING_CART_SUCCESS:
      const workers = action.payload.wrokerServices;
      var workerList = []
      if(workers.length > 0){
        workers.forEach(element => {
          if(element.services.find((i)=>i.service._id === action.payload.id)){
            workerList = workers.filter((i)=>i._id !== element._id)
            if(workerList){
              return false;
            }
    
          }
        });
      }
      return {
        workersItems : workerList,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload.id
        ),
      };

    case FINAL_STORE_BOOKING_CART_SUCCESS:
      const item = action.payload;
      const existing = state.cartItems.find((i) => i._id === item._id);
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i._id === existing._id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    default:
      return state;
  }
};
