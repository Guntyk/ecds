import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLogos } from "@redux/features/logosSlice";
import { LogoDropdown } from "components/Dropdown/Logo";
import { Notification } from "components/Notification";
import { Loader } from "components/Loader";
import styles from "pages/AboutUs/Logos/Logos.scss";

import log from "../log.json";

const logParse = JSON.parse(log);

export const Logos = () => {
  const { isLoading, error, logos } = useSelector((state) => state.logos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error && !logos.length) {
      dispatch(getLogos());
    }
  }, []);

  return (
    <div className={styles.logos}>
      {isLoading ? (
        <Loader />
      ) : logParse.length === 0 ? (
        <p className={styles.text}>
          There is no logos available to download yet
        </p>
      ) : (
        logParse.map((logo) => <LogoDropdown logo={logo} key={logo.id} />)
      )}
    </div>
  );
};
