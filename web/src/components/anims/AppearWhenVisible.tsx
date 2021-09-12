import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

export default function FadeInWhenVisible({
  className,
  children
}: {
  className?: string;
  children: React.ReactElement | React.ReactElement[];
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
      transition={{ duration: 0.3 }}
      variants={{
        visible: { y: 0 },
        hidden: { y: 50 }
      }}
    >
      {children}
    </motion.div>
  );
}
