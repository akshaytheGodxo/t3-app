import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";


const mockUrls = [
  "https://utfs.io/f/6YYJmdTwczhibGncD31D81TxWFAtsHoVbS6YqPN5BgnwfLOy",
  "https://utfs.io/f/6YYJmdTwczhipHSsIehh4NIvaJsZUt816zwVG05kjnXDplSM",
  "https://utfs.io/f/6YYJmdTwczhi4O1APWJbs9mHT6BxfEhCRKSPvWrzA74MjupY",
];


const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="">
        
        <div className="flex flex-wrap gap-4">{
          mockImages.map((image) => (
            <div key={image.id} className="w-48">
              <img src={image.url} alt="image"/>
            </div>
          ))}
        </div>
          
      </main>
    </HydrateClient>
  );
}
