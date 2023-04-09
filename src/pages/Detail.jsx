import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

export default function Detail({ setActive }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
    setActive(null);
  };
  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
            <span>{blog?.timestamp.toDate().toLocaleString()}</span>
            <h2>{blog?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
            <div className="row mx-0">
                <div className="col-md-8">
                    <span className="meta-info text-start">
                        Par <p className="author">{blog?.author}</p> -&nbsp;
                        {blog?.timestamp.toDate().toLocaleString()}
                    </span>
                    <p className="text-start">{blog?.description}</p>
                </div>
                <div className="col-md-3">
                    <h2>Tags</h2>
                    <h2>Les plus populaires</h2>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
