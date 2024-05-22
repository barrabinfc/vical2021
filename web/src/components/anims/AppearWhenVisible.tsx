import React, { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';
import { m, useAnimation } from 'framer-motion';
import { LazyMotion, domAnimation } from 'framer-motion';

import { openSpring, closeSpring } from '../../lib/animations';

export default function AppearWhenVisible({
  className,
  children,
  delay,
  ...props
}: {
  className?: string;
  children: React.ReactElement | React.ReactElement[];
  delay?: number;
}): JSX.Element {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <m.div
      className={className}
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5, type: 'spring ' }}
      variants={{
        visible: { opacity: 1, y: 0, scale: 1.0, transition: { delay }, ...openSpring },
        hidden: { opacity: 0, y: 100, scale: 1.1, ...closeSpring }
      }}
      // {...props}
    >
      {children}
    </m.div>
  );
}
