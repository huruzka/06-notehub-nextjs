import css from "./SearchForm.module.css"

interface SearchBoxProps{
    value: string;
    onChange: (newValue: string) => void;
}

const SearchBox=({ value, onChange }: SearchBoxProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            value={value}
            onChange={handleChange}
        />
    );
};

export default SearchBox