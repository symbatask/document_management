import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { address } from './data/data';

export const DocumentComponents = ({ category_id }) => {

    const [document, setDocument] = useState([])

    useEffect(() => {
        if (category_id) {
            const config = {
                method: 'get',
                url: `${address.use}/v1/api/document/categories/${category_id}`,
                headers: {
                    'Authorization': localStorage.getItem("token")
                }
            };
            axios(config)
                .then(function (response) {
                    setDocument(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [])

    return (
        <div>
            {
                document.map((el, idx) => (
                    <NavLink to={`/document/${el.id}`} target="_blank" className="d-inline" key={idx}>
                        <div className="report" title={el.name}>
                            <div className="report-box">
                                {el.url ? <img src={el.url} />
                                    : <i className="fas fa-file-alt document__img"> </i>}
                            </div>
                            <h4 className="report-box-title" >
                                {
                                    el.name
                                }
                            </h4>
                        </div>
                    </NavLink>
                ))
            }
        </div>

    )
}