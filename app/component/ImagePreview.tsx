import Image from "next/image";
import { FunctionComponent } from "react";
import classes from "../page.module.scss";
import { motion } from "framer-motion";

interface ImagePreviewProps {
  backgroundColor: string;
  item: any;
  mobileView: boolean;
}

const ImagePreview: FunctionComponent<ImagePreviewProps> = ({
  item,
  backgroundColor,
  mobileView,
}) => {
  return (
    <motion.div
      initial={
        !mobileView
          ? {
              opacity: 0,
              transform: "translate(-50%, -50%) rotate(45deg)",
            }
          : {
              opacity: 0,
              transform: "translate(-50%, -50%) rotate(135deg)",
            }
      }
      animate={
        !mobileView
          ? {
              opacity: 1,
              transform: "translate(-50%, -50%) rotate(-45deg)",
            }
          : {
              opacity: 1,
              transform: "translate(-50%, -50%) rotate(-0deg)",
            }
      }
      exit={
        !mobileView
          ? {
              opacity: 0,
              transform: "translate(-50%, -50%) rotate(-135deg)",
            }
          : {
              opacity: 0,
              transform: "translate(-50%, -50%) rotate(-135deg)",
            }
      }
      className={classes.image__circle}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={classes.image__container}>
        <Image
          src={item.image}
          alt={`AirPods Max ${item.color}`}
          fill
          className={classes.image}
        />
      </div>
    </motion.div>
  );
};

export default ImagePreview;
