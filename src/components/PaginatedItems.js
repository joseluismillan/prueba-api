import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function PaginatedItems({ itemsPerPage, resultados }) {
  const items = resultados.items;
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  function Items({ currentItems }) {
    
    // console.log(usuario)
    return (
      <>
        {currentItems &&
          currentItems.map((item) => {
            return (
              <div className="col-lg-4 mb-4 " key={item.id}>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={item.avatar_url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.login}</h5>
                    <p className="card-text">Descripción: </p>
                    <a
                      href={item.html_url}
                      target="_blank"
                      className="btn btn-primary"
                    >
                      Visitar
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;

    setItemOffset(newOffset);
  };
  // console.log(resultados)

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;
