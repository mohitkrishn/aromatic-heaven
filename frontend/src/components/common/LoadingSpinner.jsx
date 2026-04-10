/**
* Optimized LoadingSpinner for button usage
* Accessible, minimal, and customizable via props
*/
const spinnerStyle = {
    display: 'inline-block',
    width: '1.5em',
    height: '1.5em',
    verticalAlign: 'middle',
};

const svgStyle = {
    width: '100%',
    height: '100%',
    animation: 'spin 0.8s linear infinite',
};

const LoadingSpinner = ({ size = 24, color = '#fff', ariaLabel = 'Loading...' }) => (
    <span
        style={{ ...spinnerStyle, width: size, height: size }}
        role="status"
        aria-label={ariaLabel}
    >
        <svg
            style={svgStyle}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke={color}
                strokeWidth="4"
                strokeDasharray="60 40"
                strokeLinecap="round"
                opacity="0.3"
            />
            <path
                d="M22 12a10 10 0 0 1-10 10"
                stroke={color}
                strokeWidth="4"
                strokeDasharray="30 70"
                strokeLinecap="round"
            />
        </svg>
        {/* Inline keyframes for spin animation */}
        <style>{`
      @keyframes spin {
        100% { transform: rotate(360deg); }
      }
    `}</style>
    </span>
);

export default LoadingSpinner;