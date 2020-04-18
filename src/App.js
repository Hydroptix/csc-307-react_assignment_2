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

        const userId = users[index]['id']
        console.log(userId)

        this.makeDeleteCall(userId).then(response => {
            console.log(response.status)

            if (response.status === 200) {
                this.setState({
                    users: users.filter((user, i) => {
                        return i !== index;
                    }),
                })
            }
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

    makePostCall(user){
        return axios.post('http://localhost:5000/users', user)
            .then(function (response) {
                console.log(response);
                return(response);
            })
            .catch(function (error) {
                console.log(error);
                return false;
            });
    }

    makeDeleteCall(userId) {
        return axios.delete(`http://localhost:5000/users/${userId}`)
            .then(function (response) {
                console.log("makeDeleteCall: ")
                console.log(response);
                return(response);
            })
            .catch(function (error) {
                console.log(error);
                return false;
            });
    }

    handleSubmit = user => {
        console.log(user)
        this.makePostCall(user).then( response => {
            if (response.status === 201) {

                this.setState( {users : [...this.state.users, response.data]});
            }
        });

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