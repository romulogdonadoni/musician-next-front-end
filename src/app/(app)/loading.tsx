import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default async function Loading() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="flex flex-col gap-4">
        <Skeleton width={340} height={20} />
        <div className="flex justify-between gap-4">
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
        </div>
        <div className="flex justify-between gap-4">
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
        </div>
        <div className="flex justify-between gap-4">
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
        </div>
        <div className="flex justify-between gap-4">
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
        </div>
        <div className="flex justify-between gap-4">
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
        </div>
        <div className="flex justify-between gap-4">
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
          <Skeleton width={340} height={82} />
        </div>
      </div>
    </SkeletonTheme>
  );
}
