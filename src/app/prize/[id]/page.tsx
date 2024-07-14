import { Suspense } from 'react';
// import PrizeLoading from './loading';

import FetchPrizeByID from "./fetchprizebyid";

export default function PrizePage({ params }: { params: { id: number } }) {
  return (
    <div className="flex justify-center w-full">
      {/* <Suspense fallback={<PrizeLoading />}> */}
      
        <FetchPrizeByID params={params} />
      {/* </Suspense> */}
    </div>
  );
}
// 0x9dF60EF0399Ad81A6C4AdAacc749Dc493563CF31