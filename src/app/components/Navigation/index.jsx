"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./navigation.module.css";
import ThemeProvider from "../../../ThemeProvider";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const pages = [
  ["Automatic layout", "/"],
  ["Manual layout", "/manual"],
];

export default function BasicTabs() {
  const pathName = usePathname();
  const pathIndex = pages.findIndex(([, path]) => {
    if (path === pathName) {
      return true;
    }
  });

  const [value, setValue] = React.useState(pathIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme="auto">
      <div className={styles.container}>
        <Tabs value={value} onChange={handleChange}>
          {pages.map(([label, path], key) => (
            <Tab key={key} label={label} component={Link} href={path} />
          ))}
        </Tabs>
      </div>
    </ThemeProvider>
  );
}
