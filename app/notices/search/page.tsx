import searchResultByQuery from "@/app/api/notices/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Form from "next/form";
import React from "react";
import { NoticeCardComponent } from "../components/NoticeCard";

const NoticeSearch = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const query = (await searchParams).query;
  if (!query || query == "") return <QueryNotFound />;

  const searchResult = await searchResultByQuery(query);
  if (searchResult.length == 0) return <NoticeNotFoundForQuery query={query} />;

  return (
    <div className="container">
      <h3 className="py-4 text-xl font-medium">
        Search Result for : {query} ({searchResult.length})
      </h3>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {searchResult.map((notice) => {
          return <NoticeCardComponent key={notice.id} notice={notice} />;
        })}
      </div>
    </div>
  );
};

export default NoticeSearch;

const QueryNotFound = () => {
  return (
    <div className="container h-[50vh] flex flex-col items-center justify-center">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            Search for Notices
          </h1>
          <p className="text-gray-700">
            Enter a keyword or phrase to search for notices.
          </p>
        </div>
        <div className="flex flex-1 pt-4 items-center justify-end space-x-4">
          <Form
            action="/notices/search"
            className="w-full flex justify-center items-center space-x-2"
          >
            <div className="w-full max-w-[40rem]">
              <Input
                type="search"
                name="query"
                placeholder="Search notices..."
                className="w-full rounded-full shadow-md h-12 "
              />
            </div>
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="w-14 h-14 bg-primary text-white  rounded-full"
            >
              <Search className="scale-125" />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

const NoticeNotFoundForQuery = ({ query }: { query: string }) => {
  return (
    <div className="container h-[50vh] flex flex-col items-center justify-center">
      <div>
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            No Notice Found related to: {query}
          </h1>
          <p className="text-gray-700">
            Enter a keyword or phrase to search for notices.
          </p>
        </div>
        <div className="flex flex-1 pt-4 items-center justify-end space-x-4">
          <Form
            action="/notices/search"
            className="w-full flex justify-center items-center space-x-2"
          >
            <div className="w-full max-w-[40rem]">
              <Input
                type="search"
                name="query"
                placeholder="Search notices..."
                className="w-full rounded-full shadow-md h-12 "
              />
            </div>
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="w-14 h-14 bg-primary text-white  rounded-full"
            >
              <Search className="scale-125" />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
