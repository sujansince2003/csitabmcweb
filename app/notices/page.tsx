import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NoticeTypes } from "@/types/Notice";
import { NoticeCardComponent } from "./components/NoticeCard";
import NoticeHeader from "./components/NoticeHeader";

async function getNotices(): Promise<NoticeTypes[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch notices");
  }
  return res.json();
}

export default async () => {
  const notices = await getNotices();
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
};
