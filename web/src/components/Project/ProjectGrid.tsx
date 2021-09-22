import React from 'react';
import { cn } from '~/lib/helpers';
import { Page } from '../../lib/page';
import { motion } from 'framer-motion';

import style from './ProjectGrid.module.scss';

import AppearWhenVisible from '../anims/AppearWhenVisible';
import Card from '../Card/Card';

export default function ProjectList({ projects }: { projects: Page[] }) {
  return (
    <motion.div className={cn(style['project-grid'])}>
      {projects.map((project, i) => (
        <AppearWhenVisible key={project.slug} className="item" delay={i / 10}>
          <Card
            key={project.slug}
            delay={i / 5}
            href={project.url.pathname}
            avatar={{ ...project.thumbnail, width: 0, height: 0 }}
            content={project.content}
            className={`item ${project.slug}`}
            loading="lazy"
          />
        </AppearWhenVisible>
      ))}
    </motion.div>
  );
}
