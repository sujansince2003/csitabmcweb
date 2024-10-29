import { NoticesList } from "./_components";

// app/notices/page.tsx (Server Component)

async function getNotices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch notices");
  }
  return res.json();
}

export default async function CollegeNotices() {
  const notices = await getNotices();

  return <NoticesList notices={notices} />;
}
