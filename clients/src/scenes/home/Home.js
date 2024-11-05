import React, { useEffect, useState } from "react";
import "./Home.css";
import Footer from "../../components/footer/Footer";
import AppSection from "../../components/appSection/AppSection";
import Banner from "../../components/banner/Banner";
import Customer from "../../components/customer/Customer";
import AllService from "../../components/allservices/AllService";
import OtherCard from "../../components/otherscard/OtherCard";
import Header from "../../components/header/Header";
import WorkerMangement from "../../components/workmanagement/WorkManage";
import { Localhost } from "../../action/host/HostConnection";
import { getActiveBannersAction } from "../../action/auth_admin/BannerAction";
import { useDispatch, useSelector } from "react-redux";
import Lodder from "../../components/lodder/Lodder";

function Home() {
  const [dataothers, setDataOthers] = useState([]);
  const [dataallservice, setDataAllService] = useState([]);
  const [loddingother, setLoadingOther] = useState(true);
  const [loddingallservice, setLoadingAllService] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingAllService(true);
        const response = await fetch(
          Localhost + "/api/services/home/pages/categories/services"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDataAllService(result.servicesList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingAllService(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingOther(true);
        const response = await fetch(
          Localhost + "/api/services/home/pages/new/services"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDataOthers(result.servicesList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingOther(false);
      }
    };

    fetchData();
  }, []);

  const { lodding } = useSelector((state) => state.bannersState);
  useEffect(() => {
    dispatch(getActiveBannersAction());
  }, [dispatch]);
  return (
    <>
     {lodding && <Lodder /> }
        <div className="home__container">
          <div className="home__container__box">
            <Header />
            <div>
              <Banner />
            </div>
            <AppSection />
            {dataallservice?.length > 0 && (
              <AllService data={dataallservice} lodding={loddingallservice} />
            )}
            {dataothers?.length > 0 && (
              <OtherCard data={dataothers} lodding={loddingother} />
            )}
            <Customer />
            <div className=" bg-white">
              <WorkerMangement />
            </div>

            <Footer />
          </div>
        </div>
    </>
  );
}

export default Home;
