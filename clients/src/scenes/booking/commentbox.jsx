import React, { useEffect } from "react";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import { GetSingleBookingAction } from "../../action/auth_admin/BookingAction";
import { useDispatch, useSelector } from "react-redux";
function Commentbox({ id }) {
  const dispatch = useDispatch();
  const { lodding, error, singlebooking } = useSelector(
    (state) => state.singleBookingState
  );
  useEffect(() => {
    dispatch(GetSingleBookingAction(id));
  }, [id, singlebooking?.ratings]);
  return (
    <>
    <div class="container">
    <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="serviceBox">
                <h3 style={{textAlign:'center'}} class="title">Comment Box</h3>
                {singlebooking?.reviews?.map((item,index) => (
                <p class="description"><span >{index+1}.</span>{item?.comment}</p>
              ))}
                <div class="service-icon">
                    <span><i class="fa fa-globe"></i></span>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  );
}

export default Commentbox;
