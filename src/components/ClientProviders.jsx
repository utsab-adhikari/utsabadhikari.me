// src/components/ClientProviders.jsx
"use client";

import { SessionProvider, useSession } from "next-auth/react";
import RecordView from "./RecordView";
import NavDropdown from "./home/NavDropDown";
import { Fragment } from "react";

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <RecordView />
      <NavDropdown />
      {children}
    </SessionProvider>
  );
}
