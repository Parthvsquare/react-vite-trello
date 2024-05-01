import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        overflow: "scroll",
      }}
    >
      <Suspense fallback={<Skeleton />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default HomeLayout;
