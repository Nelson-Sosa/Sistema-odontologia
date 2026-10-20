/**
 * TOOTH ICON
 * Ícono de diente para sistema dental
 */

export function ToothIcon({ className = 'w-6 h-6', color = 'currentColor' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Diente"
    >
      <path
        d="M12 2C8.5 2 6 4.5 6 8C6 9.5 6 11 6 12.5C6 14.5 5.5 16 4.5 17.5C3.5 19 3 20.5 3 22H7C7 20 7.5 19 8.5 17.5C9 16.5 9.5 15.5 9.5 14V12.5C9.5 11.5 10 11 11 11C11.5 11 12 11.5 12 12.5V14C12 15.5 12.5 16.5 13 17.5C14 19 14.5 20 14.5 22H18.5C18.5 20.5 18 19 17 17.5C16 16 15.5 14.5 15.5 12.5C15.5 11 15.5 9.5 15.5 8C15.5 4.5 13 2 9.5 2H12Z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ToothIcon;
