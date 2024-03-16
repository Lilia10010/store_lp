"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  return (
    <div>
      <span>{data?.user?.name}</span>
    </div>
  );
}
