import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

class App extends Component {
    state = {
        users : [],
    }

    removeUser = index => {
        const { users } = this.state

        this.setState({
            users: users.filter((user, i) => {
                return i !== index;
            }),
        })
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(res => {
                const users = [];

                //My backend responds with a dictionary of users keyed by ID instead of a list of users, so
                //I'm converting that dictionary to a list here. Probably will abstract this out somewhere later
                const resp_dict = res.data.users_list;
                for (var key in resp_dict) {
                    users.push(resp_dict[key])
                }

                this.setState({ users: users });
            })
            .catch(function (error) {
                //Not handling the error. Just logging into the console.
                console.log(error);
            });
    }

    handleSubmit = user => {
        this.setState({ users: [...this.state.users, user] })
    }

    render() {
        const {users} = this.state;

        return (
            <div className="container">
                <Table usersData={users} removeUser={this.removeUser} />
                <Form handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default App;