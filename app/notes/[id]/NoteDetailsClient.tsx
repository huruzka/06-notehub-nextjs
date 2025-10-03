'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchSingleNote } from '@/lib/api';
import css from './NoteDetailsClient.module.css'

function NoteDetailsClient() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const {
        data: note,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['note', id],
        queryFn: () => {
            if (!id) {
                throw new Error("Note ID is not available");
            }
            return fetchSingleNote(id);
        },
        enabled: !!id,
        refetchOnMount: false,
    });
    if (isLoading) {
        return <p>Loading, please wait...</p>
    }
    if (isError || !note) {
        return <p>Something went wrong</p>
    } 
            return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                            <h2>{note.title}</h2>
                </div>
                <p className={css.content}>{note.content}</p>
                        <p className={css.date}>Created: {new Date(note.createdAt).toLocaleString()}</p>
            </div>
        </div>
    )
};

export default NoteDetailsClient;