import { useState } from "react";
import Post from "../components/Post";

export default function HomePage() {
  return (
    <>
      <section className="container-fluid" id="home-section">
        <div className="row">
          <Post />
        </div>
      </section>
    </>
  );
}
