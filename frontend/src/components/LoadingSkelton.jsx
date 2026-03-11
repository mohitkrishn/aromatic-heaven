
import React from "react";

/**
 * Universal Skeleton Loader
 * Use for loading states in any page/component
 * Customizable via props: width, height, shape, count
 */
const shimmerStyle = {
	background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
	backgroundSize: "200% 100%",
	animation: "shimmer 1.2s infinite",
};

const LoadingSkelton = ({ width = "100%", height = 20, shape = "rect", count = 1, className = "" }) => {
	const style = {
		...shimmerStyle,
		width,
		height,
		borderRadius: shape === "circle" ? "50%" : "8px",
		marginBottom: 8,
		display: "block",
	};
	return (
		<>
			{[...Array(count)].map((_, i) => (
				<span
					key={i}
					className={className}
					style={style}
					aria-label="Loading..."
					role="status"
				/>
			))}
			<style>{`
				@keyframes shimmer {
					0% { background-position: -200% 0; }
					100% { background-position: 200% 0; }
				}
			`}</style>
		</>
	);
};

export default LoadingSkelton;
