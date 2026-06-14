import { useId } from "react";
import type {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

type CommonProps = {
  label: string;
  name: string;
  value: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
};

type InputVariantProps = CommonProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "name" | "value" | "onChange" | "className"
  > & {
    multiline?: false;
  };

type TextareaVariantProps = CommonProps &
  Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "name" | "value" | "onChange" | "className"
  > & {
    multiline: true;
  };

export type TextFieldProps = InputVariantProps | TextareaVariantProps;

const baseControlClass =
  "w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-[color:var(--paper)] disabled:opacity-50";

function Markers({
  required,
  optional,
}: {
  required?: boolean;
  optional?: boolean;
}): ReactNode {
  if (required) {
    return (
      <>
        {" "}
        <span style={{ color: "var(--accent)" }}>*</span>
      </>
    );
  }
  if (optional) {
    return (
      <>
        {" "}
        <span
          className="text-xs font-normal"
          style={{ color: "var(--ink-muted)" }}
        >
          (optional)
        </span>
      </>
    );
  }
  return null;
}

type RenderContext = {
  id: string;
  hasError: boolean;
  describedBy: string | undefined;
  controlStyle: { background: string; borderColor: string; color: string };
};

function InputField(
  props: InputVariantProps,
  { id, hasError, describedBy, controlStyle }: RenderContext,
) {
  const {
    id: _id,
    label: _label,
    name: _name,
    value: _value,
    onChange: _onChange,
    className: _className,
    error: _error,
    required: _required,
    optional: _optional,
    multiline: _multiline,
    ...nativeProps
  } = props;
  void [
    _id,
    _label,
    _name,
    _value,
    _onChange,
    _className,
    _error,
    _required,
    _optional,
    _multiline,
  ];
  return (
    <input
      {...nativeProps}
      id={id}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      aria-invalid={hasError || undefined}
      aria-describedby={describedBy}
      className={baseControlClass}
      style={controlStyle}
    />
  );
}

function TextareaField(
  props: TextareaVariantProps,
  { id, hasError, describedBy, controlStyle }: RenderContext,
) {
  const {
    id: _id,
    label: _label,
    name: _name,
    value: _value,
    onChange: _onChange,
    className: _className,
    error: _error,
    required: _required,
    optional: _optional,
    multiline: _multiline,
    rows: _rows,
    ...nativeProps
  } = props;
  void [
    _id,
    _label,
    _name,
    _value,
    _onChange,
    _className,
    _error,
    _required,
    _optional,
    _multiline,
    _rows,
  ];
  return (
    <textarea
      {...nativeProps}
      id={id}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      rows={props.rows ?? 4}
      aria-invalid={hasError || undefined}
      aria-describedby={describedBy}
      className={baseControlClass}
      style={{ ...controlStyle, resize: "vertical" }}
    />
  );
}

export default function TextField(props: TextFieldProps) {
  const reactId = useId();
  const id = props.id ?? `tf-${reactId}`;
  const errorId = `${id}-error`;
  const hasError = Boolean(props.error);
  const describedBy = hasError ? errorId : undefined;

  const borderColor = hasError ? "var(--accent)" : "var(--soft-border)";
  const ctx: RenderContext = {
    id,
    hasError,
    describedBy,
    controlStyle: {
      background: "var(--paper)",
      borderColor,
      color: "var(--ink)",
    },
  };

  return (
    <div className={props.className} style={{ color: "var(--ink)" }}>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium"
        style={{ color: "var(--ink)" }}
      >
        {props.label}
        <Markers required={props.required} optional={props.optional} />
      </label>

      {props.multiline ? TextareaField(props, ctx) : InputField(props, ctx)}

      {hasError && (
        <p
          id={errorId}
          className="mt-1 text-xs"
          style={{ color: "var(--accent)" }}
        >
          {props.error}
        </p>
      )}
    </div>
  );
}
