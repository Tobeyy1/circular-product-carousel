"use client";

import React, { useState, useEffect } from "react";
import classes from "./page.module.scss";
import Image, { StaticImageData } from "next/image";
import LOGO from "../images/tien logo no_bg.png";
import { itemData } from "./utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import ImagePreview from "./component/ImagePreview";

interface itemDataInterface {
  image: StaticImageData;
  color: string;
  bgImage: string;
  circleColor: string;
}

const Home = () => {
  const [currentItem, setCurrentItem] = useState<number>(0);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [mobileView, setMobileView] = useState<boolean>(false);
  const mql = window.matchMedia("(max-width: 999px)");
  const imagePreview = itemData.map(
    (item: itemDataInterface, index: number) => {
      return (
        <ImagePreview
          backgroundColor={itemData[currentItem].circleColor}
          item={item}
          key={index}
          mobileView={mobileView}
        />
      );
    }
  );

  useEffect(() => {
    if (mql.matches) {
      setMobileView(true);
    }
    mql.addEventListener("change", (e) => {
      const mobileLayout = e.matches;
      if (mobileLayout) {
        setMobileView(true);
        setShowMenu(false);
      } else {
        setMobileView(false);
        setShowMenu(true);
      }
    });
    return mql.removeEventListener("change", (e) => {
      const mobileLayout = e.matches;
      if (mobileLayout) {
        setMobileView(true);
        setShowMenu(false);
      } else {
        setMobileView(false);
        setShowMenu(true);
      }
    });
  }, [mql]);

  return (
    <div
      className={classes.container}
      style={{ backgroundImage: itemData[currentItem].bgImage }}
    >
      <nav className={classes.nav}>
        <div className={classes.logo}>
          <Image src={LOGO} alt="logo" fill className={classes.image} />
        </div>

        <AnimatePresence initial={false}>
          {showMenu && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100%", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={classes.link__list}
            >
              <li>APPLE</li>
              <li>FIND STORE</li>
              <li>ABOUT US</li>
              <li>CONTACT</li>
            </motion.ul>
          )}
        </AnimatePresence>
        {/* <button className={classes.nav__cta}>ONLINE STORE</button> */}

        <input
          type="checkbox"
          id={classes.checkbox}
          checked={showMenu}
          onChange={() => setShowMenu(!showMenu)}
        />
        <label
          htmlFor="checkbox"
          className={classes.toggle}
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className={classes.bars} id={classes.bar1}></div>
          <div className={classes.bars} id={classes.bar2}></div>
          <div className={classes.bars} id={classes.bar3}></div>
        </label>
      </nav>
      <section className={classes.content}>
        <section className={classes.ui}>
          <header className={classes.header}>
            <h1 className={classes.name}>AirPods Max</h1>
            <h2 className={classes.color}>{itemData[currentItem].color}</h2>
            <p>
              Apple&apos;s AirPods Max offer an exceptional audio experience
              with their high-fidelity sound and active noise cancellation.
              These over-ear headphones feature a sleek design, combining
              premium materials and advanced technology. With seamless
              integration into the Apple ecosystem, they provide effortless
              pairing and intuitive controls. Enjoy immersive audio and
              luxurious comfort with AirPods Max.
            </p>
          </header>
          <nav className={classes.nav}>
            <ul className={classes.link__list}>
              {itemData.map((item: itemDataInterface, index: number) => {
                return (
                  <li
                    className={classes.list__item}
                    key={index}
                    onClick={() => {
                      setCurrentItem(index);
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={`AirPods Max ${item.color}`}
                      fill
                      className={classes.image}
                    />
                  </li>
                );
              })}
            </ul>
            <span
              className={classes.bottom__bar}
              style={
                mobileView
                  ? { top: `${currentItem * 20}%` }
                  : { left: `${currentItem * 20}%` }
              }
            ></span>
          </nav>
        </section>
        <section className={classes.item__image}>
          <AnimatePresence>{imagePreview[currentItem]}</AnimatePresence>
        </section>
      </section>
    </div>
  );
};

export default Home;
