import React from "react";

const Project = ({ list = [] }) => {
  return (
    <div>
      <h2>Project</h2>
      {list.map((item) => (
        <p>{item}</p>
      ))}
      <p style={{ textAlign: "right" }}>@toringo</p>
      <p style={{ textAlign: "right" }}>copy@right</p>
    </div>
  );
};

export default Project;
