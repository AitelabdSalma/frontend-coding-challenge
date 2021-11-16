import React, { useState, useRef, useCallback, useEffect } from "react";
import useRepositorySearch from "./hooks/useRepositorySearch";
import Card from "./component/Card/Card";
import Loader from "./component/loader/loader";
import ErrorHandler from "./component/errorHandler/errorHandler";
import "./App.css";
export default function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const { repositories, hasMore, loading, error } =
    useRepositorySearch(pageNumber);

  const observer = useRef();
  const lastRepositoryElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setPageNumber(1);
  }, []);

  return (
    <>
      <div className="list__repositories">
        {repositories.map((repository, index) => {
          return repositories.length === index + 1 ? (
            <div ref={lastRepositoryElementRef} key={index}>
              <Card repository={repository} />
            </div>
          ) : (
            <div key={index}>
              <Card repository={repository} />
            </div>
          );
        })}
      </div>
      <Loader loading={loading} />
      <ErrorHandler error={error} />
    </>
  );
}
