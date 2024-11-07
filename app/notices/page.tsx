"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NoticeTypes } from "@/types/Notice";
import { NoticeCardComponent } from "./components/NoticeCard";
import NoticeHeader from "./components/NoticeHeader";

export default function NoticePage() {
  const [notices, setNotices] = useState<NoticeTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("/api/notices");
        const data = await res.json();

        if (Array.isArray(data)) {
          setNotices(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setNotices([]);
        }
      } catch (error) {
        console.error("Failed to fetch notices:", error);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <NoticeHeader />
      <div className="min-h-screen bg-gray-50/50">
        <main className="container py-8">
          <div className="flex flex-col gap-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Notices</TabsTrigger>
                  <TabsTrigger value="administrative">
                    Administrative
                  </TabsTrigger>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent
                value="all"
                className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {notices.map((notice) => {
                  return (
                    <NoticeCardComponent key={notice.id} notice={notice} />
                  );
                })}
              </TabsContent>
              <TabsContent
                value="administrative"
                className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {notices.map((notice) => {
                  if (notice.category == "administrative")
                    return (
                      <NoticeCardComponent key={notice.id} notice={notice} />
                    );
                })}
              </TabsContent>
              <TabsContent
                value="events"
                className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {notices.map((notice) => {
                  if (notice.category == "events")
                    return (
                      <NoticeCardComponent key={notice.id} notice={notice} />
                    );
                })}
              </TabsContent>
              <TabsContent
                value="academic"
                className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {notices.map((notice) => {
                  if (notice.category == "academic")
                    return (
                      <NoticeCardComponent key={notice.id} notice={notice} />
                    );
                })}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
}
