import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

export default function FadeInWhenVisible({
  className,
  children,
  delay
}: {
  className?: string;
  children: React.ReactElement | React.ReactElement[];
  delay?: number;
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      className={className}
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.3, type: "spring" }}
      variants={{
        visible: { opacity: 1, transition: { delay } },
        hidden: { opacity: 0 }
      }}
    >
      {children}
    </motion.div>
  );
}
