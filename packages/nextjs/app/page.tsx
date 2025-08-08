"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "~~/contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, getDefaultPath } = useAuth();

  useEffect(() => {
    // Redirect to the appropriate role-based interface
    const defaultPath = getDefaultPath();
    router.replace(defaultPath);
  }, [user, router, getDefaultPath]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="backdrop-blur-3xl bg-black/10 p-8 rounded-2xl">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Redirecting to AidChain...</p>
        </div>
      </div>
    </div>
  );
}
