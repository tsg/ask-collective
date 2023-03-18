import { AskOptions, BaseClient } from "@xata.io/client";

type Database = {
  id: string;
  name: string;
  client: BaseClient;
  lookupTable: string;
  options: AskOptions<any>;
};

export const getDatabases = (): Database[] => {
  const collectiveDocs = new BaseClient({
    databaseURL:
      "https://collective-website-t25gd5.us-east-1.xata.sh/db/website",
  });

  return [
    {
      id: "collectiveWebsite",
      client: collectiveDocs,
      name: "Collective blogs and guides",
      lookupTable: "content",
      options: {
        rules: [
          "You are a friendly chat bot that answers questions about running business, tax returns, and similar topics based on the data from collective.com.",
          'Only answer questions that are relating to the defined context or are general technical questions. If asked about a question outside of the context, you can respond with "It doesn\'t look like I have enough information to answer that. Check the documentation or contact support."',
          "Assume the same writing style as in the provided context.",
        ],
        searchType: "keyword",
        search: {
          fuzziness: 1,
          prefix: "phrase",
        },
      },
    },
  ];
};
