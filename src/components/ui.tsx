'use client';
import React from 'react';
import Link from 'next/link';

// Button
type ButtonVariant = 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const buttonSize: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-[7px] text-[12px]',
  md: 'px-5 py-2.5 text-[14px]',
  lg: 'px-[26px] py-[13px] text-[15px]',
};

const buttonVariant: Record<ButtonVariant, string> = {
  accent: 'bg-[var(--ember-500)] text-[var(--ink-0)] border-none hover:bg-[var(--ember-400)]',
  outline: 'bg-transparent text-[var(--ink-0)] border-[1.5px] border-[var(--ink-0)] hover:bg-[rgba(255,255,255,0.12)]',
  ghost: 'bg-transparent text-[var(--ink-200)] border-[1.5px] border-[var(--ink-700)] hover:bg-[rgba(255,255,255,0.12)]',
};

export function Button({
  variant = 'accent',
  size = 'md',
  fullWidth,
  children,
  onClick,
  type = 'button',
  href,
  style,
  disabled,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  href?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  const cls = [
    'inline-flex items-center justify-center rounded-[var(--radius-md)] no-underline',
    'font-[family-name:var(--font-display)] font-bold uppercase tracking-[0.06em]',
    'transition-[background-color,color,border-color,opacity] duration-[var(--dur-fast)]',
    buttonSize[size],
    buttonVariant[variant],
    fullWidth ? 'w-full' : '',
    disabled ? 'cursor-not-allowed opacity-60 hover:bg-[var(--ember-500)]' : 'cursor-pointer',
  ].join(' ');

  if (href) {
    return (
      <Link href={href} className={cls} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-busy={disabled || undefined}
      className={cls}
      style={style}
    >
      {children}
    </button>
  );
}

// Badge
export function Badge({ children, tone = 'accent', variant = 'solid', shape = 'pill' }: {
  children: React.ReactNode;
  tone?: 'accent' | 'neutral';
  variant?: 'solid' | 'outline';
  shape?: 'pill' | 'default';
}) {
  const tint =
    tone === 'accent' && variant === 'solid'
      ? 'bg-[var(--ember-500)] text-[var(--ink-0)]'
      : tone === 'neutral' && variant === 'outline'
        ? 'border border-[var(--ink-500)] bg-transparent text-[var(--ink-200)]'
        : 'bg-[var(--ink-700)] text-[var(--ink-200)]';

  return (
    <span
      className={`inline-block px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] ${
        shape === 'pill' ? 'rounded-[var(--radius-pill)]' : 'rounded-[var(--radius-md)]'
      } ${tint}`}
    >
      {children}
    </span>
  );
}

// Card
export function Card({ children, inverse, stripe, padding }: {
  children: React.ReactNode;
  inverse?: boolean;
  stripe?: boolean;
  padding?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--ink-700)] ${
        inverse ? 'bg-[var(--ink-900)]' : 'bg-[var(--ink-0)]'
      } ${stripe ? 'border-l-[3px] border-l-[var(--ember-500)]' : ''}`}
      style={{ padding: padding ?? '28px' }}
    >
      {children}
    </div>
  );
}

// Input
export function Input({ label, placeholder, type = 'text', name, required, autoComplete }: {
  label: string;
  placeholder: string;
  type?: string;
  name?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-[family-name:var(--font-display)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--ink-300)]">
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-[var(--radius-md)] border-2 border-[var(--ink-700)] bg-[var(--ink-800)] px-3.5 py-3 font-[family-name:var(--font-text)] text-[15px] text-[var(--ink-0)] transition-colors focus:border-[var(--ember-500)]"
      />
    </label>
  );
}

export function Select({ label, name, options, defaultValue, required }: {
  label: string;
  name?: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-[family-name:var(--font-display)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--ink-300)]">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue ?? options[0]?.value}
        required={required}
        // Chevronen tegnes inline som data-URI slik at feltet ikke trenger et eget ikon-asset.
        className="w-full cursor-pointer appearance-none rounded-[var(--radius-md)] border-2 border-[var(--ink-700)] bg-[var(--ink-800)] bg-[length:12px] bg-[right_14px_center] bg-no-repeat py-3 pl-3.5 pr-10 font-[family-name:var(--font-text)] text-[15px] text-[var(--ink-0)] transition-colors focus:border-[var(--ember-500)]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238A8A94' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
