'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './Notes.module.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchForm/SearchForm';

function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const {
    data: notesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['notes', page, debouncedQuery],
    queryFn: () => fetchNotes({ page, query: debouncedQuery }),
    placeholderData: keepPreviousData,
  });

  const handlePageClick = (e: { selected: number }): void => {
    setPage(e.selected + 1);
  };

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  const handleCreated = () => {
    toast.success('Note created');
  };
  const handleDeleted = () => {
    toast.success('Note deleted');
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
        {notesData && notesData.totalPages > 1 && (
          <Pagination
            totalPages={notesData.totalPages}
            currentPage={page}
            onPageChange={handlePageClick}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      <main>
        {isLoading && <Loader />}
        {isError && (
          <ErrorMessage
            message={(error as Error)?.message || 'Something went wrong'}
          />
        )}
        {notesData && notesData.notes.length > 0 && (
          <NoteList notes={notesData.notes} onDeleted={handleDeleted} />
        )}
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <NoteForm onCancel={closeModal} onCreated={handleCreated} />
      </Modal>
    </div>
  );
}

export default App;