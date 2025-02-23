import React, { useContext, useEffect } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Row, Col } from "react-bootstrap";
import { PaginationComponent } from "../../components";
import LabelFieldComponent from "../../components/fields/LabelFieldComponent";
import PageLayout from "../../layouts/PageLayout";
import { ButtonComponent } from "../../components/elements";
import { listSims } from "../../APIs/SimsRequests";
import SimsTableComponent from "../../components/tables/SimsTableComponent";

export default function SimsListPage() {

    const { t } = useContext(TranslatorContext);
    const [sims, setSims] = React.useState([]);
    const [pagination, setPagination] = React.useState({});
    const [perPage, setPerPage] = React.useState(10);
    const [searchFilter, setSearchFilter] = React.useState('');

    const listSimsFunction = (page=1) => {
        listSims(page,perPage,searchFilter).then((res) => {
            setSims(res.data.data);
            setPagination(res.data.pagination);
        }).catch((error) => {
            console.log(error);
        });
    }

    // const redirectToCreatePage = () => {
    //     window.location.href = '/user-account';
    // };
    useEffect(() => {
        listSimsFunction();
    }, [perPage,searchFilter]);
    const thead = [t("number"), t("serial"), t("customer_name"), t("status"), t("created"), t("action")];

    const handlePageClick = (selected) => {
        listSimsFunction(selected.selected + 1);
    }
    
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">{t('sims_list')}</h3>
                            {/* <ButtonComponent  className="btn btn-primary m-2" onClick={redirectToCreatePage}>{ t('Create New') }</ButtonComponent> */}
                        </div>
                    </div>
                </Col>
                
                <Col xl={12}>
                    <div className="mc-card">
                        
                        <Row xs={1} sm={2} xl={4}>
                            <Col>
                                <LabelFieldComponent
                                    label={t('show_by')}
                                    option={["10", "20", "50", "100"] }
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    onChange= {(e)=>{
                                        setPerPage(e.target.value);
                                    }}
                                />
                            </Col>
                            
                            
                            <Col>
                                <LabelFieldComponent
                                    type="search"
                                    label={t('search_by')}
                                    placeholder={''}
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    onChange={(e) => {
                                            setSearchFilter(e.target.value);
                                    }}
                                />
                            </Col>
                        </Row>
                        <SimsTableComponent
                            thead={ thead }
                            tbody={ sims }
                            refreshPage={ listSimsFunction }
                        />
                        <PaginationComponent pagination={pagination} handlePageClick={handlePageClick}/>
                    </div>
                </Col>
            </Row>
        </PageLayout>
    );
}