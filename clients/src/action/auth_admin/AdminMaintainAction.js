import axios from "axios";
import {
  GET_ALL_WORKERS_FAIL,
  GET_ALL_WORKERS_REQUEST,
  GET_ALL_WORKERS_SUCCESS,
  REFRESH_WORKER_REQUEST,
  GET_SINGLE_WORKER_SUCCESS,
  GET_SINGLE_WORKER_REQUEST,
  GET_SINGLE_WORKER_FAIL,
  DELETE_WORKER_REQUEST,
  DELETE_WORKER_SUCCESS,
  DELETE_WORKER_FAIL,
  GET_ALL_SERVICES_REQUEST,
  GET_ALL_SERVICES_SUCCESS,
  GET_ALL_SERVICES_FAIL,
  UPDATE_WORKER_PROFILE_REQUEST,
  UPDATE_WORKER_PROFILE_SUCCESS,
  UPDATE_WORKER_PROFILE_FAIL,
  UPDATE_WORKER_AVATAR_PROFILE_REQUEST,
  UPDATE_WORKER_AVATAR_PROFILE_SUCCESS,
  UPDATE_WORKER_AVATAR_PROFILE_FAIL,
  GET_ALL_CATEGORY_SERVICES_SUCCESS,
  GET_ALL_CATEGORY_SERVICES_FAIL,
  GET_ALL_CATEGORY_SERVICES_REQUEST,
  CREATE_CATEGORY_SERVICES_SUCCESS,
  CREATE_CATEGORY_SERVICES_FAIL,
  CREATE_CATEGORY_SERVICES_REQUEST,
  UPDATE_CATEGORY_SERVICES_SUCCESS,
  UPDATE_CATEGORY_SERVICES_FAIL,
  UPDATE_CATEGORY_SERVICES_REQUEST,
  DELETE_CATEGORY_SERVICES_SUCCESS,
  DELETE_CATEGORY_SERVICES_FAIL,
  DELETE_CATEGORY_SERVICES_REQUEST,
  REFRESH_SERVICE_CATEGORY_REQUEST,
  CREATE_SEND_OTP_WORKERS_REQUEST,
  CREATE_SEND_OTP_WORKERS_SUCCESS,
  CREATE_CONFRIM_WORKERS_FAIL,
  CREATE_CONFRIM_WORKERS_SUCCESS,
  CREATE_CONFRIM_WORKERS_REQUEST,
  UPDATE_WORKER_IS_FREE_REQUEST,
  UPDATE_WORKER_IS_FREE_SUCCESS,
  UPDATE_WORKER_IS_FREE_FAIL,
  CREATE_SEND_OTP_WORKERS_FAIL,
  GET_ALL_CLIENTS_REQUEST,
  GET_ALL_CLIENTS_SUCCESS,
  GET_ALL_CLIENTS_FAIL,
  CLIENTS_REFRESH_REQUEST,
  UPDATE_SERVICES_REQUEST,
  UPDATE_SERVICES_SUCCESS,
  UPDATE_SERVICES_FAIL,
  DELETE_SERVICES_REQUEST,
  DELETE_SERVICES_SUCCESS,
  DELETE_SERVICES_FAIL,
  CREATE_SERVICES_REQUEST,
  CREATE_SERVICES_SUCCESS,
  CREATE_SERVICES_FAIL,
  REFRESH_SERVICES,
  SERVICE_DISCOUNT_REQUEST,
  SERVICE_DISCOUNT_SUCCESS,
  SERVICE_DISCOUNT_FAIL,
  GET_ALL_PAYMENT_REQUEST,
  GET_ALL_PAYMENT_SUCCESS,
  GET_ALL_PAYMENT_FAIL,
  CREATE_HOME_APPS_REQUEST,
  CREATE_HOME_APPS_SUCCESS,
  CREATE_HOME_APPS_FAIL,
  GET_HOME_APPS_REQUEST,
  GET_HOME_APPS_SUCCESS,
  GET_HOME_APPS_FAIL,
  CREATE_HOME_PAGE_VIDEO_REQUEST,
  CREATE_HOME_PAGE_VIDEO_SUCCESS,
  CREATE_HOME_PAGE_VIDEO_FAIL,
  GET_HOME_PAGE_VIDEO_REQUEST,
  GET_HOME_PAGE_VIDEO_SUCCESS,
  GET_HOME_PAGE_VIDEO_FAIL,
  RESET_HOME_PAGES_METHOD,
  GET_ALL_DIVISION_REQUEST,
  GET_ALL_DIVISION_SUCCESS,
  GET_ALL_DIVISION_FAIL,
  GET_ALL_DISTRICT_REQUEST,
  GET_ALL_DISTRICT_SUCCESS,
  GET_ALL_DISTRICT_FAIL,
  GET_ALL_UPAZILA_FAIL,
  GET_ALL_UPAZILA_REQUEST,
  GET_ALL_UPAZILA_SUCCESS
} from "../../constances/AdminMaintainConstance";
import { Localhost } from "../host/HostConnection";

//create worker send otp
export const createWorkerOtpAction =
  (phone_or_email, userType) => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      dispatch({ type: CREATE_SEND_OTP_WORKERS_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.post(
        Localhost + "/api/users/sign_in/sign_up",
        { phone_or_email, userType },
        config
      );
      if (data) {
        dispatch({
          type: CREATE_SEND_OTP_WORKERS_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_SEND_OTP_WORKERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//worker create confrim
export const createWorkerConfrimAction =
  (otp) => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      dispatch({ type: CREATE_CONFRIM_WORKERS_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.put(
        Localhost + "/api/users/signup/phone_email/verified",
        { otp },
        config
      );
      if (data) {
        dispatch({
          type: CREATE_CONFRIM_WORKERS_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_CONFRIM_WORKERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//get all workers
export const getAllWorkerAction = (keyword) => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: GET_ALL_WORKERS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    let link;
    if (keyword) {
      link = Localhost + `/api/workers/get/all?keyword=${keyword}`;
    } else {
      link = Localhost + "/api/workers/get/all";
    }
    console.log("hil", link);
    const { data } = await axios.get(link);
    if (data) {
      dispatch({
        type: GET_ALL_WORKERS_SUCCESS,
        payload: data.workers,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_WORKERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get single worker
export const getSingleWorkerAction = (id) => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: GET_SINGLE_WORKER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + `/api/workers/get/unique/worker/profile/${id}`,
      config
    );
    if (data) {
    
      dispatch({
        type: GET_SINGLE_WORKER_SUCCESS,
        payload: data.workerDetailsList,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_SINGLE_WORKER_FAIL,
      payload: error.response.data.message,
    });
  }
};
//get all division
export const getAllDivisionAction = () => async(dispatch,getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: GET_ALL_DIVISION_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + '/api/workers/get/all/divisions/',
      config
    );
    if (data) {
      dispatch({
        type: GET_ALL_DIVISION_SUCCESS,
        payload: data.divisions,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_DIVISION_FAIL,
      payload: error.response.data.message,
    });
  }
}

//get all district
export const getAllDistrictAction = (id) => async(dispatch,getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: GET_ALL_DISTRICT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + `/api/workers/get/all/districts/${id}`,
      config
    );
    if (data) {
      dispatch({
        type: GET_ALL_DISTRICT_SUCCESS,
        payload: data.districts,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_DISTRICT_FAIL,
      payload: error.response.data.message,
    });
  }
}
//get all upazila
export const getAllUpazilaAction = (id) => async(dispatch,getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: GET_ALL_UPAZILA_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + `/api/workers/get/all/upazilas/${id}`,
      config
    );
    if (data) {
      dispatch({
        type: GET_ALL_UPAZILA_SUCCESS,
        payload: data.upazilas,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_UPAZILA_FAIL,
      payload: error.response.data.message,
    });
  }
}

//delete single worker and client
export const deleteWorkerClientAction = (id) => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: DELETE_WORKER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.delete(
      Localhost + `/api/users/delete/user/${id}`,
      config
    );
    if (data) {
      dispatch({
        type: DELETE_WORKER_SUCCESS,
        payload: data.users,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_WORKER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get single client
export const getSingleClientAction = (id) => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: GET_SINGLE_WORKER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + `/api/clients/get/unique/client/profile/${id}`,
      config
    );
    if (data) {
      dispatch({
        type: GET_SINGLE_WORKER_SUCCESS,
        payload: data.client,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_SINGLE_WORKER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//worker profile update
export const workerProfileUpdateAction =
  (
    id,
    listWorkerInfo,
    listWorkerAddress,
    listWorkerEducations,
    emergencyContract
  ) =>
  async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      dispatch({ type: UPDATE_WORKER_PROFILE_REQUEST });
      const { data } = await axios.put(
        Localhost + `/api/workers/update/worker/profile/${id}/`,
        {
          listWorkerInfo,
          listWorkerAddress,
          listWorkerEducations,
          emergencyContract
        },
        config
      );
      if (data) {
        dispatch({
          type: UPDATE_WORKER_PROFILE_SUCCESS,
          payload: data.workers,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_WORKER_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//worker profile image update
export const workerProfileAvatarUpdateAction =
  (id, avatarForm) => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      dispatch({ type: UPDATE_WORKER_AVATAR_PROFILE_REQUEST });
      const { data } = await axios.put(
        Localhost + `/api/workers/update/avatar/worker/profile/${id}/`,
        avatarForm,
        config
      );
      dispatch({
        type: UPDATE_WORKER_AVATAR_PROFILE_SUCCESS,
        payload: data.workers,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_WORKER_AVATAR_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//worker is free update
export const workerisFreeUpdateAction =
  (id, text) => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      dispatch({ type: UPDATE_WORKER_IS_FREE_REQUEST });
      const { data } = await axios.put(
        Localhost + `/api/workers/worker/is/free/${id}/`,
        { text },
        config
      );
      dispatch({
        type: UPDATE_WORKER_IS_FREE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_WORKER_IS_FREE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//refresh workers reducers
export const refreshWorkerAction = () => (dispatch) => {
  dispatch({
    type: REFRESH_WORKER_REQUEST,
  });
};

///start CL
//get all clients
export const getAllClientsAction = () => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: GET_ALL_CLIENTS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + "/api/clients/get/all",
      config
    );
    if (data) {
      dispatch({
        type: GET_ALL_CLIENTS_SUCCESS,
        payload: data.client_profile,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_CLIENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const refreshClientsAction = () => (dispatch) => {
  dispatch({
    type: CLIENTS_REFRESH_REQUEST,
  });
};

////start services

//get all services
export const getAllServicesAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SERVICES_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get(
      Localhost + "/api/services/get/all",
      config
    );
    if (data) {
      dispatch({
        type: GET_ALL_SERVICES_SUCCESS,
        payload: data.services,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_SERVICES_FAIL,
      payload: error.response.data.message,
    });
  }
};
//create service
export const CreateServicesAction =
  (datafrom) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_SERVICES_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.post(
        Localhost + `/api/services/create/`,
        datafrom,
        config
      );
      if (data) {
        dispatch({
          type: CREATE_SERVICES_SUCCESS,
          payload: data.services,
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_SERVICES_FAIL,
        payload: error.response.data.message,
      });
    }
  };
//update services
export const UpdateServicesAction =
  (id, datafrom) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_SERVICES_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.put(
        Localhost + `/api/services/update/${id}/`,
        datafrom,
        config
      );
      if (data) {
        dispatch({
          type: UPDATE_SERVICES_SUCCESS,
          payload: data.services,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_SERVICES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//delete service
export const DeleteServicesAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_SERVICES_REQUEST });
    const {
      loginState: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.delete(
      Localhost + `/api/services/delete/${id}/`,
      config
    );
    if (data) {
      dispatch({
        type: DELETE_SERVICES_SUCCESS,
        payload: data.services,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_SERVICES_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete service
export const DiscountServicesAction =
  (id, fromdata) => async (dispatch, getState) => {
    try {
      dispatch({ type: SERVICE_DISCOUNT_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.put(
        Localhost + `/api/services/update/discount/${id}/`,
        fromdata,
        config
      );
      if (data) {
        dispatch({
          type: SERVICE_DISCOUNT_SUCCESS,
          payload: data.services,
        });
      }
    } catch (error) {
      dispatch({
        type: SERVICE_DISCOUNT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

///refresh service
export const refreshServiceAction = () => (dispatch) => {
  dispatch({
    type: REFRESH_SERVICES,
  });
};

////start service category

//get all services category
export const getAllCategoriesServicesAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CATEGORY_SERVICES_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get(
      Localhost + "/api/services/categories/get/all",
      config
    );
    if (data) {
      dispatch({
        type: GET_ALL_CATEGORY_SERVICES_SUCCESS,
        payload: data.categories,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORY_SERVICES_FAIL,
      payload: error.response.data.message,
    });
  }
};

///create category
export const createServicesCategoriesAction =
  (datafrom) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_CATEGORY_SERVICES_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.post(
        Localhost + "/api/services/categories/create",
        datafrom,
        config
      );
      if (data) {
        dispatch({
          type: CREATE_CATEGORY_SERVICES_SUCCESS,
          payload: data.categories,
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_CATEGORY_SERVICES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

///update category
export const updateServicesCategoriesAction =
  (id, datafrom) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_CATEGORY_SERVICES_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.put(
        Localhost + `/api/services/categories/update/${id}/`,
        datafrom,
        config
      );
      if (data) {
        dispatch({
          type: UPDATE_CATEGORY_SERVICES_SUCCESS,
          payload: data.categories,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_CATEGORY_SERVICES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

///delete category
export const deleteServicesCategoriesAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_CATEGORY_SERVICES_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.delete(
        Localhost + `/api/services/categories/delete/${id}/`,
        config
      );
      if (data) {
        dispatch({
          type: DELETE_CATEGORY_SERVICES_SUCCESS,
          payload: data.categories,
        });
      }
    } catch (error) {
      dispatch({
        type: DELETE_CATEGORY_SERVICES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

///get all payment
export const getAllPaymentAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_PAYMENT_REQUEST });
    const {
      loginState: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + "/api/payments/ammerpay/get/all",
      config
    );
    if (data) {
      dispatch({
        type: GET_ALL_PAYMENT_SUCCESS,
        payload: data.payments,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_PAYMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

///create home apps
export const crateHomeAppsAction = (fromdata) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_HOME_APPS_REQUEST });
    const {
      loginState: { userInfo },
    } = getState();
    const { data } = await axios.post(
      Localhost + "/api/homepages/create/apps",
      fromdata,
      {
        headers: {
          Authorization: userInfo?.token?.accesstoken,
        },
      }
    );
    if (data) {
      dispatch({
        type: CREATE_HOME_APPS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_HOME_APPS_FAIL,
      payload: error.response.data.message,
    });
  }
};

///create home apps
export const getHomeAppsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HOME_APPS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      Localhost + "/api/homepages/get/apps",
      config
    );
    if (data) {
      dispatch({
        type: GET_HOME_APPS_SUCCESS,
        payload: data.apps,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_HOME_APPS_FAIL,
      payload: error.response.data.message,
    });
  }
};

///create home video
export const crateHomeVideosAction =
  (fromdata) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_HOME_PAGE_VIDEO_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const { data } = await axios.post(
        Localhost + "/api/homepages/create/videos",
        fromdata,
        {
          headers: {
            Authorization: userInfo?.token?.accesstoken,
          },
        }
      );
      if (data) {
        dispatch({
          type: CREATE_HOME_PAGE_VIDEO_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_HOME_PAGE_VIDEO_FAIL,
        payload: error.response.data.message,
      });
    }
  };

///create home apps
export const getHomeVideosAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HOME_PAGE_VIDEO_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      Localhost + "/api/homepages/get/videos",
      config
    );
    if (data) {
      dispatch({
        type: GET_HOME_PAGE_VIDEO_SUCCESS,
        payload: data.videos,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_HOME_PAGE_VIDEO_FAIL,
      payload: error.response.data.message,
    });
  }
};

//refresh service category reducers
export const refreshServiceCategoryAction = () => (dispatch) => {
  dispatch({
    type: REFRESH_SERVICE_CATEGORY_REQUEST,
  });
};

//refresh service category reducers
export const homePagesRefreshAction = () => (dispatch) => {
  dispatch({
    type: RESET_HOME_PAGES_METHOD,
  });
};
