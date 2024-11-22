"use client";

import Error from "next/error";

export default function RootNotFound() {
  return <Error statusCode={404} />;
}
