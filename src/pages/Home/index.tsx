import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="dark:bg-gray-900 bg-white dark:text-white h-full pt-14">
      <Suspense fallback={<Skeleton />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default HomeLayout;
