interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: 'default' | 'gradient' | 'outlined';
}

export default function Card({ 
  children, 
  className = '', 
  title,
  variant = 'default'
}: CardProps) {
  const baseStyles = 'rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg';
  
  const variantStyles = {
    default: 'bg-white',
    gradient: 'bg-gradient-to-br from-blue-600 to-blue-700 text-white',
    outlined: 'bg-transparent border border-gray-200',
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {title && (
        <h3 className={`text-lg font-semibold ${variant === 'gradient' ? 'text-white' : 'text-gray-900'} mb-4`}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
