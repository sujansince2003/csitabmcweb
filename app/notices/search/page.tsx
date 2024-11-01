import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NoticeTypes } from "@/types/Notice";
import { Search } from "lucide-react";
import Form from "next/form";
import React from "react";

const NoticeSearch = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const query = (await searchParams).query;
  if (!query || query == "") return <QueryNotFound />;
};

export default NoticeSearch;

const QueryNotFound = () => {
  return (
    <div className="h-[50vh] flex flex-col items-center justify-center">
      <div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Search for Notices
          </h1>
          <p className="text-gray-700">
            Enter a keyword or phrase to search for notices.
          </p>
        </div>
        <div className="flex flex-1 pt-4 items-center justify-end space-x-4">
          <Form
            action="/notices/search"
            className="w-full flex items-center space-x-2"
          >
            <Input
              type="search"
              name="query"
              placeholder="Search notices..."
              className="hidden md:block w-full rounded-full shadow-lg"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="shrink-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
