import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { FeedData, Secret } from "../types/feed"; // make sure these are defined
import FeedCard from "@/components/FeedCard";
import TutorialOverlay from "@/components/TutorialOverlay";
import PostComposer from "@/components/PostComposer";
// import ShimmerCard from "@/components/ShimmerCard";


export default function FeedPage() {
  const [feed, setFeed] = useState<FeedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const endMsg = document.getElementById("scrollEndMessage");
      if (!endMsg) return;
  
      const scrollY = window.scrollY + window.innerHeight;
      const height = document.body.offsetHeight;
  
      if (scrollY >= height - 50) {
        endMsg.style.opacity = "1";
      } else {
        endMsg.style.opacity = "0";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  

  useEffect(() => {
    let isMounted = true; // track mount status
    const controller = new AbortController();
  
    fetch("/api/feeds", {
      credentials: "include",
      signal: controller.signal,
    })
      .then(async (res) => {
        const text = await res.text();
        return JSON.parse(text);
      })
      .then((data: FeedData) => {
        if (isMounted) {
          setFeed(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch feed:", err);
        }
      });
  
    return () => {
      isMounted = false;           // prevent update after unmount
      controller.abort();          // cleanup fetch
    };
  }, []);
  


  return (
    <Layout userId={feed?.user?.id}>
    <main className="p-4 max-w-3xl mx-auto">
      <TutorialOverlay username={feed?.user.username ?? ""} />

      {/* Post composer */}
      {feed?.user && <PostComposer user={feed.user} />}


      {/* Shimmer */}
      {loading && (
        <div className="grid gap-4">
          {/* {Array.from({ length: 4 }).map((_, i) => (
            <ShimmerCard key={i} />
          ))} */}
        </div>
      )}

      {/* Real secrets */}
      {!loading && feed && (
        <div className="grid gap-4 mt-6">
          {feed.secrets.map((secret: Secret) => (
            <FeedCard key={secret.id} data={secret} />
          ))}
        </div>
      )}

      {/* End scroll message */}
      <div className="text-center text-muted mt-6">
        Reached the bottom. Scroll back to top 👆
      </div>
    </main>
    </Layout>
  );
}
