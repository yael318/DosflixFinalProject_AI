import React from 'react';
import clsx from 'clsx';
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border rounded-lg p-4 shadow-lg ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={clsx("text-xl font-bold mb-2", className)}>
      {children}
    </div>
  );
}

// export function CardContent({ children }: { children: React.ReactNode }) {
//   return <div className="text-sm text-gray-700">{children}</div>;
// }

// export function CardTitle({ children }: { children: React.ReactNode }) {
//   return <h3 className="text-lg font-semibold">{children}</h3>;
// }
export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`text-sm text-gray-700 ${className}`}>{children}</div>;
}

export function CardTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}
// export function CardButton({
//   children,
//   onClick,
//   className = '',
//   type = 'button',
// }: {
//   children: React.ReactNode;
//   onClick?: () => void;
//   className?: string;
//   type?: 'button' | 'submit' | 'reset';
// }) {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${className}`}
//     >
//       {children}
//     </button>
//   );
// }
type Variant = 'primary' | 'outline' | 'danger';

export function CardButton({
  children,
  onClick,
  className = '',
  type = 'button',
  variant = 'primary',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
}) {
  const baseClasses = 'px-4 py-2 rounded-lg transition';
  const variantClasses =
    variant === 'outline'
      ? 'border border-blue-600 text-blue-600 bg-white hover:bg-blue-50'
      : variant === 'danger'
      ? 'bg-red-600 text-white hover:bg-red-700'
      : 'bg-blue-600 text-white hover:bg-blue-700';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
}
