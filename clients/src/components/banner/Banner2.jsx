import React, { useEffect, useState } from "react";
import "./Banner2.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { getActiveBannersAction } from "../../action/auth_admin/BannerAction";
import { Localhost } from "../../action/host/HostConnection";
import Lodder from "../lodder/Lodder";
function Banner2() {
  const [c_image, setc_image] = useState(1);
  const dispatch = useDispatch();

  //   const { lodding, banners } = useSelector((state) => state.bannerStore);

  //   useEffect(() => {
  //     dispatch(homeBannerGetAction());
  //   }, []);
  useEffect(() => {
    if (c_image) {
      const times = setInterval(() => {
        setc_image((pre) => pre + 1);
      }, 10000);
    }
  }, [c_image]);

  const { lodding, error, activeBanners } = useSelector(
    (state) => state.bannersState
  );
  useEffect(() => {
    dispatch(getActiveBannersAction());
  }, [dispatch]);

  if (activeBanners?.images?.length <= c_image) {
    setc_image(0);
  }
  return (
    <>
      <div className="banner__image__container">
        {lodding && <Lodder />}
        <div className="banner__image__box">
          {activeBanners?.images
            ?.slice(c_image, c_image + 1)
            .map((item, index) => (
              <img
               key={index}
                className="opacity-60"
                loading="true"
                src={Localhost + `/images/banners/${item.image}`}
                alt={index}
              />
            ))}

          <div className="banner__button">
            <p className="md:block hidden" onClick={() => setc_image((pre) => pre - 1)}>
              <ArrowBackIosIcon />
            </p>
             <p className="md:block hidden" onClick={() => setc_image((pre) => pre + 1)}>
              <ArrowForwardIosIcon />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner2;
