import React from 'react';
import {findDOMNode} from 'react-dom';
import _ from 'lodash';
import {Grid, Button, Col, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {regions, teams} from "../../config"

import FontAwesome from '../../common/components/FontAwesome';
import {fetchUsersWithAllData, updateUser} from "../actions";


class UsersAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "admin",
                password: "",
                email: "admin@mail.com",
                region: "Kraków",
                team: "Team A",
                role: "ADMIN",
                id: "0-0"
            }
        };
    }

    componentDidMount() {
        this.props.onLoad();
    }

    onCreateUser(e) {
        e.preventDefault();

        this.props.onUpdateUser(this.state.user);
    }

    setCurrentUser(userId) {
        let users = this.props.userAuthSession.users || [];
        let user = users.find(user => user.id === userId);

        this.setState({user});
    }

    render() {
        let users = this.props.userAuthSession.users || [];
        users = _.orderBy(users, ["username"]);
        let userItems = users.map( (user, idx) => {
            return <option value={user.id} key={idx}>{user.username}</option>;
        });

        let regionOptions = regions.map((region, idx) => <option key={idx}>{region}</option>);
        let teamOptions = teams.map((team, idx) => <option key={idx}>{team}</option>);

        return (
            <Grid>
                <PageHeader className="text-center">Users ({users.length})</PageHeader>
                <Col md={6}>
                    <form>
                        <div className="panel panel-danger">
                            <div className="panel-heading">
                                <h3 className="panel-title">Choose user</h3>
                            </div>
                            <div className="panel-body">
                                <select className="form-control" id="chosenUser"
                                        value="admin"
                                        onChange={(e) => this.setCurrentUser(e.target.value)}>
                                    {userItems}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="control-label">Username </label>
                            <input className="form-control" type="text" placeholder="Username" id="username"
                                   ref="username"
                                   value={this.state.user.username}
                                   readOnly="true"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userId" className="control-label">User ID</label>
                            <input className="form-control" type="text" placeholder="User ID" id="userId"
                                   ref="userId"
                                   value={this.state.user.id}
                                   readOnly="true"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="control-label">Email</label>
                            <input className="form-control" type="text" placeholder="Email" id="email"
                                   ref="email"
                                   value={this.state.user.email}
                                   readOnly="true"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role" className="control-label">Role</label>
                            <input className="form-control" type="text" placeholder="Role" id="role"
                                   ref="role"
                                   value={this.state.user.role}
                                   readOnly="true"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="region" className="control-label">Region</label>
                            <select className="form-control" ref="region" id="region"
                                    onChange={(e) => this.setState({
                                        user: Object.assign({}, this.state.user, {
                                            region: e.target.value
                                        })
                                    })}
                            >
                                {regionOptions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="team" className="control-label">Team</label>
                            <select className="form-control" ref="team" id="team"
                                    onChange={(e) => this.setState({
                                        user: Object.assign({}, this.state.user, {
                                            team: e.target.value
                                        })
                                    })}
                            >
                                {teamOptions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="control-label">Password</label>
                            <input className="form-control" type="text" placeholder="Password" id="password"
                                   ref="password"
                                   value={this.state.user.password}
                                   onChange={(e) => this.setState({
                                       user: Object.assign({}, this.state.user, {
                                           password: e.target.value
                                       })
                                   })}
                            />
                        </div>
                        <Button type="submit" bsStyle="success" block
                                onClick={(e) => this.onCreateUser(e)}>
                            <FontAwesome name="send"/> Update
                        </Button>
                    </form>
                </Col>
                <Col md={6}>
                    <div>
                        <h4>Username: {this.state.user.username}</h4>
                        <h4>ID: {this.state.user.id}</h4>
                        <h4>Email: {this.state.user.email}</h4>
                        <h4>Region: {this.state.user.region}</h4>
                        <h4>Team: {this.state.user.team}</h4>
                        <h4>Password: {this.state.user.password}</h4>
                    </div>
                    <div>
                        <PageHeader className="text-center">Result</PageHeader>
                        <span>
                            {JSON.stringify(this.props.userUpdated)}
                        </span>
                    </div>
                </Col>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userAuthSession: state.userAuthSession,
        userUpdated: state.userUpdated
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchUsersWithAllData());
        },
        onUpdateUser: (user) => {
            dispatch(updateUser(user));
        }
    }
};

const UsersAdminPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersAdmin);

export default UsersAdminPage;