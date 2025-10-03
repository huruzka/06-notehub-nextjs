import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import Link from "next/link";
import type { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
  onDeleted?: (note: Note) => void;
}

const NoteList = ({ notes, onDeleted }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteMutation= useMutation({
    mutationFn: deleteNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onDeleted?.(data);
    },
  });
  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <div>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{content}</p>
          </div>
          <div className={css.footer}>
                  <span className={css.tag}>{tag}</span>
                  <div className={css.actions}>
                      <Link href={`/notes/${id}`} className={css.link}>
                                View details
                            </Link>
            <button
              className={css.button}
              onClick={() => deleteMutation.mutate(id)}
              disabled={deleteMutation.isPending}
            >{deleteMutation.isPending ? "Delete..." : "Delete"}
                      </button>
                      </div>
          </div>
        </li>
      ))}
</ul>
  );
    
};

export default NoteList