import React, { ReactNode } from "react";
import s from "./Section.module.css";

interface SectionProps {
  children: ReactNode
}

export default function Section({ children }: SectionProps) {
  return (
    <div className={s["section"]}>
      {children}
    </div>
  );
}