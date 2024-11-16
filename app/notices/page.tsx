"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NoticeTypes } from "@/types/Notice";
import { NoticeCardComponent } from "./components/NoticeCard";
import NoticeHeader from "./components/NoticeHeader";
import CSITLoader from "./loader";

export default function NoticePage() {
  const [notices, setNotices] = useState<NoticeTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletedNotice, setdeletedNotice] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("/api/notices"); // Uses relative path
        const data = await res.json();

        setNotices(data);
      } catch (error) {
        console.error("Failed to fetch notices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [deletedNotice]);

  if (loading) return <CSITLoader />;
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
                {notices?.map((notice) => {
                  return (
                    <NoticeCardComponent
                      key={notice.id}
                      notice={notice}
                      setdeletedNotice={setdeletedNotice}
                    />
                  );
                })}
              </TabsContent>
              <TabsContent
                value="administrative"
                className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {notices?.map((notice) => {
                  if (notice.category == "administrative")
                    return (
                      <NoticeCardComponent
                        key={notice.id}
                        notice={notice}
                        setdeletedNotice={setdeletedNotice}
                      />
                    );
                })}
              </TabsContent>
              <TabsContent
                value="events"
                className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {notices?.map((notice) => {
                  if (notice.category == "events")
                    return (
                      <NoticeCardComponent
                        key={notice.id}
                        notice={notice}
                        setdeletedNotice={setdeletedNotice}
                      />
                    );
                })}
              </TabsContent>
              <TabsContent
                value="academic"
                className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {notices?.map((notice) => {
                  if (notice.category == "academic")
                    return (
                      <NoticeCardComponent
                        key={notice.id}
                        notice={notice}
                        setdeletedNotice={setdeletedNotice}
                      />
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
