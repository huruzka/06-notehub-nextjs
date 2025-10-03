import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import App from './Notes.client';

const topic = '';
const page = 1;

export default async function Notes () {
    const QueryClient = new QueryClient();

    await QueryClient.prefetchQuery({
        queryKey: ['notes', topic, page],
        queryFn: () => fetchNotes(topic, page),
    });
    return (
        <HydrationBoundary state={dehydrate(QueryClient)}>
            <App />
      </HydrationBoundary>
  );
};

