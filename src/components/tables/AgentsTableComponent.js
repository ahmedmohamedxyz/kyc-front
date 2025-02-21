import React, { useState, useEffect } from "react";
import { ButtonComponent } from "../elements";

export default function AdminsTableComponent({ thead, tbody,refreshPage }) {


    const [data, setData] = useState([]);

    useEffect(()=> { setData(tbody) }, [tbody]);


    return (
        <div className="mc-table-responsive">
            <table className="mc-table">
                <thead className="mc-table-head primary">
                    <tr>
                        {thead.map((item, index) => (
                            <th key={ index }>{ item }</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="mc-table-body even">
                    {data?.map((item, index) => (
                        <tr key={ index }> 
                            <td title={ item.name }>
                                <div className="mc-table-profile">
                                    <p>{ item.name }</p>
                                </div>
                            </td>
                            <td title={ item.email }>{ item.email }</td>
                            <td title={ item.type }>{ item.type }</td>

                            <td title={ item.created }>{ item.created_at }</td>
                            <td>
                                <div className="mc-table-action">
                                    {/* <AnchorComponent to="/user-profile" title="View" className="material-icons view">{ "visibility" }</AnchorComponent> */}
                                    <ButtonComponent title="Edit" className="material-icons edit" onClick={()=> window.location.href="/user-account/"+item.id}>{ "edit" }</ButtonComponent>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}