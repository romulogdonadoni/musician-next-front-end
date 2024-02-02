import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default async function Loading() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="flex gap-3 items-center">
        <Skeleton count={1} width={256} height={256} inline />
        <div className="flex flex-col">
          <Skeleton count={1} width={256} height={20} />
          <Skeleton count={1} width={512} height={128} />
          <Skeleton count={1} width={256} height={20} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton count={8} height={50}/>
      </div>
    </SkeletonTheme>
  );
}
