import type { ITool } from "@/types";
import Container from "@/components/container";
import Title from "@/components/title";
import { Metadata } from "next";
import Tool from "@/components/tool-card";
import { groupBy } from "lodash";

export const metadata: Metadata = {
  title: "Araçlar",
  description: `Gün içinde ve çalışma hayatında sürekli kullandığım araçların listesi. 
    Bana yaşattıkları deneyim üzerinden puan ve yorumumu ekledim.`,
};

async function fetchData() {
  const response = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Tools`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  return data.records.filter((r: ITool) => !r.fields.draft);
}

export default async function ToolsPage() {
  const data: ITool[] = await fetchData();
  const groupByCategory = groupBy(data, (item) => {
    return item.fields.category;
  });
  const keys = Object.keys(groupByCategory);

  return (
    <>
      <Container>
        <Title>{metadata.description}</Title>
      </Container>

      <Container className="mt-10">
        <div className="grid gap-4">
          {keys.map((category) => {
            return (
              <details
                key={category}
                className="open:bg-zinc-50 open:border-transparent dark:open:bg-zinc-800
                border border-zinc-200 dark:border-zinc-800 rounded-xl py-4 px-6"
              >
                <summary className="flex items-center gap-2 select-none cursor-pointer opacity-60">
                  <h4 className="uppercase text-lg font-medium leading-none grow">
                    {category}
                  </h4>
                  {CategoryIcons[category]}
                </summary>

                <div className="mt-4 grid">
                  {groupByCategory[category].map((tool: ITool) => {
                    return <Tool key={tool.id} tool={tool} />;
                  })}
                </div>
              </details>
            );
          })}
        </div>
      </Container>
    </>
  );
}

const CategoryIcons = {
  desk: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-lamp-2"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.4"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 21h9" />
      <path d="M10 21l-7 -8l8.5 -5.5" />
      <path d="M13 14c-2.148 -2.148 -2.148 -5.852 0 -8c2.088 -2.088 5.842 -1.972 8 0l-8 8z" />
      <path d="M11.742 7.574l-1.156 -1.156a2 2 0 0 1 2.828 -2.829l1.144 1.144" />
      <path d="M15.5 12l.208 .274a2.527 2.527 0 0 0 3.556 0c.939 -.933 .98 -2.42 .122 -3.4l-.366 -.369" />
    </svg>
  ),
  coffee: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-coffee"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.4"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" />
      <path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
      <path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
      <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z" />
      <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" />
    </svg>
  ),
  backpack: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-backpack"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.4"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 18v-6a6 6 0 0 1 6 -6h2a6 6 0 0 1 6 6v6a3 3 0 0 1 -3 3h-8a3 3 0 0 1 -3 -3z" />
      <path d="M10 6v-1a2 2 0 1 1 4 0v1" />
      <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
      <path d="M11 10h2" />
    </svg>
  ),
  photo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-camera"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.4"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
      <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    </svg>
  ),
  home: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-home"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.4"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </svg>
  ),
};
