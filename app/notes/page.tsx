import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';

const topic = '';
const page = 1;

export default async function Notes () {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', topic, page],
        queryFn: () => fetchNotes({ page, query: topic }),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
      </HydrationBoundary>
  );
};

