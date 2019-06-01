import React from "react";
import s from "./Section.module.css";
export default function Section({
  children,
}) {
  return (
    <div className={s["section"]}>
      {children}
    </div>
  );
}