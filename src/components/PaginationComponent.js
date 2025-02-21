import React, { useContext } from "react"; 
import { TranslatorContext } from "../context/Translator";
import ReactPaginate from "react-paginate";

export default function PaginationComponent({pagination,handlePageClick}) {
    const { t, n } = useContext(TranslatorContext);
    
    return (
        <div className="mc-paginate">
            <p className="mc-paginate-title">
                {t('showing')} 
                <b> {n(pagination.per_page<pagination.total?pagination.per_page:pagination.total)} </b> 
                {t('of')}
                <b> {n(pagination.total)} </b>
                {t('results')}
            </p>
          
            <ReactPaginate
                previousLabel={t("Previous")}
                nextLabel={t("Next")}
                breakLabel={"..."}
                pageCount={pagination.total_pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
           
        </div>
    )
}