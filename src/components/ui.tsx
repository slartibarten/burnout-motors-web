'use client';
import React from 'react';
import Link from 'next/link';

// Button
type ButtonVariant = 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export function Button({
  variant = 'accent',
  size = 'md',
  fullWidth,
  children,
  onClick,
  type = 'button',
  href,
  style,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  href?: string;
  style?: React.CSSProperties;
}) {
  const sizes: Record<ButtonSize, React.CSSProperties> = {
    sm: { padding: '7px 14px', fontSize: '12px' },
    md: { padding: '10px 20px', fontSize: '14px' },
    lg: { padding: '13px 26px', fontSize: '15px' },
  };

  const variants: Record<ButtonVariant, React.CSSProperties> = {
    accent: { background: 'var(--ember-500)', color: 'var(--ink-0)', border: 'none' },
    outline: { background: 'transparent', color: 'var(--ink-0)', border: '1.5px solid var(--ink-0)' },
    ghost: { background: 'transparent', color: 'var(--ink-200)', border: '1.5px solid var(--ink-700)' },
  };

  const shared: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    transition: 'background var(--dur-fast), color var(--dur-fast), border-color var(--dur-fast)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : undefined,
    textDecoration: 'none',
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  function hoverIn(el: HTMLElement) {
    if (variant === 'accent') el.style.background = 'var(--ember-400)';
    else el.style.background = 'rgba(255,255,255,0.12)';
  }
  function hoverOut(el: HTMLElement) {
    el.style.background = variant === 'accent' ? 'var(--ember-500)' : 'transparent';
  }

  if (href) {
    return (
      <Link
        href={href}
        style={shared}
        onMouseEnter={(e) => hoverIn(e.currentTarget)}
        onMouseLeave={(e) => hoverOut(e.currentTarget)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={shared}
      onMouseEnter={(e) => hoverIn(e.currentTarget)}
      onMouseLeave={(e) => hoverOut(e.currentTarget)}
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
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    padding: '4px 10px',
    borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-md)',
    display: 'inline-block',
  };

  if (tone === 'accent' && variant === 'solid') {
    return <span style={{ ...base, background: 'var(--ember-500)', color: 'var(--ink-0)' }}>{children}</span>;
  }
  if (tone === 'neutral' && variant === 'outline') {
    return <span style={{ ...base, background: 'transparent', color: 'var(--ink-200)', border: '1px solid var(--ink-500)' }}>{children}</span>;
  }
  return <span style={{ ...base, background: 'var(--ink-700)', color: 'var(--ink-200)' }}>{children}</span>;
}

// StatChip
export function StatChip({ label, value, unit, accent }: {
  label: string;
  value: string;
  unit: string;
  inverse?: boolean;
  accent?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', lineHeight: 1, color: accent ? 'var(--ember-500)' : 'var(--ink-0)' }}>{value}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-400)' }}>{unit}</span>
      </div>
    </div>
  );
}

// Card
export function Card({ children, inverse, stripe, interactive, padding }: {
  children: React.ReactNode;
  inverse?: boolean;
  stripe?: boolean;
  interactive?: boolean;
  padding?: string;
}) {
  return (
    <div
      style={{
        background: inverse ? 'var(--ink-900)' : 'var(--ink-0)',
        border: '1px solid var(--ink-700)',
        borderRadius: 'var(--radius-lg)',
        padding: padding ?? '28px',
        position: 'relative',
        overflow: 'hidden',
        transition: interactive ? 'border-color var(--dur-base)' : undefined,
        borderLeft: stripe ? '3px solid var(--ember-500)' : undefined,
      }}
    >
      {children}
    </div>
  );
}

// Input
export function Input({ label, placeholder, type = 'text', name }: {
  label: string;
  placeholder: string;
  type?: string;
  name?: string;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '12px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--ink-400)',
      }}>
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        style={{
          fontFamily: 'var(--font-text)',
          fontSize: '15px',
          color: 'var(--ink-0)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '2px solid var(--ink-700)',
          background: 'var(--ink-800)',
          outline: 'none',
          width: '100%',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--ember-500)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--ink-700)'; }}
      />
    </label>
  );
}
