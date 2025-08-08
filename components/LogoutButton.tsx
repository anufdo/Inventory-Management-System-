"use client";

import { signOut } from "next-auth/react";
import React from "react";

// Button component to sign out the user and redirect to login
export const LogoutButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button
    onClick={() => signOut({ callbackUrl: "/login" })}
    className={className}
    {...props}
  >
    Logout
  </button>
);
