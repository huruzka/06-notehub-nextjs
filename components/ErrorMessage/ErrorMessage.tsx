import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
    message?: string;
}
/**
 * Компонент для відображення повідомлення про помилку.
 * @param {ErrorMessageProps} props - Пропси компонента.
 */
 
const ErrorMessage = ({
    message = "Something went wrong. Please try again later.",
}: ErrorMessageProps) => {
    return (
        <div className={css.errorContainer}>
            <p className={css.errorMessage}>{message}</p>
        </div>
    );
};

export default ErrorMessage;