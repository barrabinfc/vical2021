import React from "react";
import { cn } from "~/lib/helpers";
import { motion } from "framer-motion";

import style from "./ProjectGrid.module.scss";

import FadeInWhenVisible from "../anims/FadeInWhenVisible";
import Card from "../Card/Card";

export default function ProjectList({
  projects
}: {
  projects: MarkdownPage[];
}) {
  return (
    <motion.div className={cn(style["project-grid"])}>
      {projects.slice(0, 3).map((project, i) => (
        <FadeInWhenVisible key={project.slug} className="item" delay={i / 10}>
          <Card
            key={project.slug}
            delay={i / 10}
            href={project.url.pathname}
            avatar={{ ...project.thumbnail, width: 0, height: 0 }}
            content={project.content}
            className={`item ${project.slug}`}
            loading="lazy"
          />
        </FadeInWhenVisible>
      ))}
    </motion.div>
  );
}
