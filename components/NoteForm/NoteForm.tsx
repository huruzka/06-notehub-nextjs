import css from "./NoteForm.module.css"
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";
import type { Note, NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, type NewNote } from "@/lib/api";

const validationSchema = Yup.object({
    title: Yup.string()
        .min(3, "Minimum 3 characters required")
        .max(50, "Maximum 50 characters required")
        .required("Title is required"),
    content: Yup.string().max(500, "Content must be at most 500 characters"),
    tag: Yup.mixed<NoteTag>()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
        .required("Tag is required")
});

const initialValues: NewNote = {
    title: "",
    content: "",
    tag: "Todo"
};

interface NoteFormProps{
    onCancel: () => void;
    onCreated?: (note: Note) => void;
}

function NoteForm({ onCancel, onCreated }: NoteFormProps) {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createNote,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onCancel();
            onCreated?.(data);
        },
    });
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                createMutation.mutate(values, {
                    onSuccess: () => {
                        actions.resetForm()
                    },
                });
            }}
        >
            {({ isValid }) => (
                <Form className={css.form}>
                    <div className={css.formGroup}>
                        <label htmlFor="title">Title</label>
                        <Field
                            id="title"
                            name="title"
                            type="text"
                            className={css.input}
                        />
                        <FormikErrorMessage
                            name="title"
                            component="span"
                            className={css.error}
                        />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="content">Content</label>
                        <Field
                            id="content"
                            name="content"
                            as="textarea"
                            rows={8}
                            className={css.textarea}
                        />
                        <FormikErrorMessage
                            name="content" className={css.error}
                        />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="tag">Tag</label>
                        <Field
                            id="tag"
                            name="tag"
                            as="select"
                            className={css.select}
                        >
                            <option value="Todo">Todo</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Shopping">Shopping</option>
                        </Field>
                        <FormikErrorMessage
                            name="tag"
                            className={css.error}
                        />
                    </div>

                    <div className={css.actions}>
                        <button type="button" className={css.cancelButton} onClick={onCancel}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={css.submitButton}
                            disabled={!isValid || createMutation.isPending}
                        >
                            {createMutation.isPending ? "Creating..." : "Create note"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default NoteForm