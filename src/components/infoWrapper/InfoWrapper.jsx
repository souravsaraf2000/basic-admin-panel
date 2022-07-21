import React from 'react'

class InfoWrapper extends React.Component {
    render() { 
        let {activeRowData} = this.props;
        return (
            <div id="info-wrapper">
                <h1>Details</h1>
                <p>Click on a table item to get detailed information</p>
                <div id="info-content">
                    <div><b>User selected:</b> {activeRowData.firstName} {activeRowData.lastName}</div>
                    <div>
                        <b>Description: </b>
                        <textarea cols="50" rows="5" readonly>
                            {activeRowData.description}
                        </textarea>
                    </div>
                    <div><b>Address:</b> {activeRowData.address.streetAddress}</div>
                    <div><b>City:</b> {activeRowData.address.city}</div>
                    <div><b>State:</b> {activeRowData.address.state}</div>
                    <div><b>Zip:</b> {activeRowData.address.zip}</div>
                </div>
            </div>
        );
    }
}
 
export default InfoWrapper;