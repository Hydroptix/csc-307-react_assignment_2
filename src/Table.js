import React, { Component } from 'react';

class Table extends Component {
    render() {
        const { usersData, removeUser } = this.props

        return (
            <table>
                <TableHeader />
                <TableBody usersData={usersData} removeUser={removeUser}/>
            </table>
        );
    }
}

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Job</th>
        </tr>
        </thead>
    );
}

const TableBody = props => {
    const rows = props.usersData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>
                    <button onClick={() => props.removeUser(index)}>Delete</button>
                </td>
            </tr>
        );
    });
    return <tbody>{rows}</tbody>;
}

export default Table;