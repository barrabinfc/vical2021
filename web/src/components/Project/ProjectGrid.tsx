import React from 'react';
import { cn } from '../../lib/helpers';
import { HeadingLevel } from '../../@types/a11y';

import { Page } from '../../lib/page';

import style from './ProjectGrid.module.scss';

import LazyMotion from '../../components/LazyMotion/LazyMotion';
import AppearWhenVisible from '../anims/AppearWhenVisible';
import Card from '../Card/Card';

export interface ProjectListProps {
  projects: Page[];
  TitleHeadingLevel: HeadingLevel;
}

export default function ProjectList({ projects, TitleHeadingLevel = HeadingLevel.h2 }: ProjectListProps) {
  return (
    <div className={cn(style['project-grid'])}>
      <LazyMotion>
        {projects.map((project, i) => (
          // <AppearWhenVisible key={project.slug} className="item" delay={i / 10}>
          <div key={project.slug} className="item">
            <Card
              key={project.slug}
              delay={i / 5}
              href={project.url.pathname}
              TitleHeadingLevel={TitleHeadingLevel}
              avatar={{ ...project.thumbnail, width: 0, height: 0 }}
              content={{
                title: project.content.title,
                subtitle: project.content.subtitle
              }}
              className={`item`}
              data-slug={project.slug}
              loading="lazy"
            />
          </div>
          // </AppearWhenVisible>
        ))}
      </LazyMotion>
    </div>
  );
}
