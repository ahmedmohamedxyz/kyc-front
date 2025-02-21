import React, { useContext, useEffect } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown } from "react-bootstrap";
import { PaginationComponent } from "../../components";
import LabelFieldComponent from "../../components/fields/LabelFieldComponent";
import AgentsTableComponent from "../../components/tables/AgentsTableComponent";
import PageLayout from "../../layouts/PageLayout";
import { listAgents } from "../../APIs/AgentRequests";
import { ButtonComponent } from "../../components/elements";

export default function AgentsListPage() {

    const { t } = useContext(TranslatorContext);
    const [agents, setAgents] = React.useState([]);
    const [pagination, setPagination] = React.useState({});
    const [perPage, setPerPage] = React.useState(10);
    const [searchFilter, setSearchFilter] = React.useState('');
    const [type, setType] = React.useState('');


    const listAgentsFunction = (page=1) => {
        listAgents(page,perPage,searchFilter,type).then((res) => {
            setAgents(res.data.data);
            setPagination(res.data.pagination);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        listAgentsFunction();
    }, [perPage,searchFilter,type]);
    const thead = [t("name"), t("email"),t("type"), t("created"), t("action")];

    const redirectToCreatePage = () => {
        window.location.href = '/user-account';
    };
    
    const handlePageClick = (selected) => {
        listAgentsFunction(selected.selected + 1);
    }
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">{t('agents_list')}</h3>
                            <ButtonComponent  className="btn btn-primary m-2" onClick={redirectToCreatePage}>{ t('Create New') }</ButtonComponent>                            
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
                                    label={t('show_by')}
                                    option={["all", "company", "individual"] }
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    onChange= {(e)=>{
                                        setType(e.target.value);
                                    }}
                                />
                            </Col>
                            
                            <Col>
                                <LabelFieldComponent
                                    type="search"
                                    label={t('search_by')}
                                    placeholder={t('id') + ' / ' + t('name') + ' / ' + t('email') + ' / ' + t('number')}
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    onChange={(e) => {
                                            setSearchFilter(e.target.value);
                                    }}
                                />
                            </Col>
                        </Row>
                        <AgentsTableComponent 
                            thead={ thead }
                            tbody={ agents }
                            refreshPage={ listAgentsFunction }

                        />
                        <PaginationComponent pagination={pagination} handlePageClick={handlePageClick}/>
                    </div>
                </Col>
            </Row>
        </PageLayout>
    );
}