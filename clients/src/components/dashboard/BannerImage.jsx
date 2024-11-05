import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleBannersAction } from "../../action/auth_admin/BannerAction";
import { Localhost } from "../../action/host/HostConnection";

function BannerImage() {
  const { id } = useParams();
  const { lodding, error, singleBanners } = useSelector(
    (state) => state.bannersState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getSingleBannersAction(id));
  }, [dispatch, id, error, toast]);

  return (
    <>
      <div style={{ width: "100%" }}>
        <h1 style={{ textAlign: "center" }}>BANNER IMAGES</h1>
        {singleBanners?.images?.map((item) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Link to={Localhost + `/images/banners/${item.image}`}>
              <img
                style={{ height: "90vh", width: "100%", margin: "10px" }}
                src={Localhost + `/images/banners/${item.image}`}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default BannerImage;
