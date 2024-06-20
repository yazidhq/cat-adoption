import React from "react";

export default function CircleImg({ img, width }) {
  return (
    <div
      className="position-relative"
      style={{ width, paddingTop: width, height: 0 }}
    >
      <img
        src={img}
        className="position-absolute top-0 start-0 w-100 h-100 rounded-circle"
        style={{ objectFit: "cover" }}
        alt="Profile"
      />
    </div>
  );
}
