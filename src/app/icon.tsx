import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0e455b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          AV
        </span>
      </div>
    ),
    { ...size }
  );
}
