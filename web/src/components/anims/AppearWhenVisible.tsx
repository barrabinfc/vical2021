import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

import { openSpring, closeSpring } from '../../lib/animations';

export default function AppearWhenVisible({
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
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      className={className}
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5, type: 'spring ' }}
      variants={{
        visible: { opacity: 1, y: 0, scale: 1.0, transition: { delay }, ...openSpring },
        hidden: { opacity: 0, y: 100, scale: 1.1, ...closeSpring }
      }}
    >
      {children}
    </motion.div>
  );
}
