type FormFieldProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "tel" | "number";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
  error?: string;
};

export function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  max,
  required = false,
  error
}: FormFieldProps): JSX.Element {
  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    const current = parseInt(value || "0", 10);
    if (!isNaN(current) && (min === undefined || current > min)) {
      onChange(String(current - 1));
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    const current = parseInt(value || "0", 10);
    if (!isNaN(current) && (max === undefined || current < max)) {
      onChange(String(current + 1));
    }
  };

  const isDecrementDisabled = value !== "" && min !== undefined && parseInt(value, 10) <= min;
  const isIncrementDisabled = value !== "" && max !== undefined && parseInt(value, 10) >= max;

  return (
    <label htmlFor={id} className="group relative flex w-full flex-col gap-2">
      <span className="flex items-center text-sm font-medium tracking-wider text-white/80 transition-colors duration-300 group-focus-within:text-gold group-hover:text-white">
        {label}
        {required && (
          <span className="ml-2 inline-block h-1 w-1 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
        )}
      </span>
      {type === "number" ? (
        <div className="relative flex items-center w-full">
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            min={min}
            max={max}
            required={required}
            className="form-input-luxury w-full pr-16 text-center"
          />
          <div className="absolute right-0 top-0 flex h-full items-center gap-1 pb-2">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={isDecrementDisabled}
              className={`flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white transition-all 
                ${isDecrementDisabled ? "opacity-30 cursor-not-allowed" : "hover:bg-gold/20 hover:border-gold/30 hover:text-gold active:scale-95"}`}
              aria-label="Decrease value"
            >
              -
            </button>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={isIncrementDisabled}
              className={`flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white transition-all 
                ${isIncrementDisabled ? "opacity-30 cursor-not-allowed" : "hover:bg-gold/20 hover:border-gold/30 hover:text-gold active:scale-95"}`}
              aria-label="Increase value"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="form-input-luxury"
        />
      )}
      {error ? (
        <span className="min-h-4 text-xs tracking-[0.03em] text-amber-300/90">{error}</span>
      ) : null}
    </label>
  );
}
