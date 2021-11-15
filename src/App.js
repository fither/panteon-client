import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/user';

import './App.css';
import { Table } from 'react-bootstrap';

function App(props) {
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const fetchUsers = () => {
    props.actions.fetch();
  }

  return (
    <div className="App">
      <div className="table-div">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>money</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              props.isLoading ?
              <tr>
                <td colSpan={ 4 }>
                  Loading...
                </td>
              </tr> :
              props.users && props.users.length ? 
              props.users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>
                      { user._id }
                    </td>
                    <td>
                      { user.name }
                    </td>
                    <td>
                      { user.money }
                    </td>
                    <td>
                      <button
                        className="action inc"
                        onClick={() => props.actions.increase(user._id)}
                      >
                        +
                      </button>
                      <button
                        className="action dec"
                        onClick={() => props.actions.decrease(user._id)}
                      >
                        -
                      </button>
                    </td>
                  </tr>
                )
              }) :
              <tr>
                <td colSpan={ 4 }>
                  No Data
                </td>
              </tr>
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    users: state.user.users,
    isLoading: state.user.isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetch: bindActionCreators(actions.fetch, dispatch),
      increase: bindActionCreators(actions.increase, dispatch),
      decrease: bindActionCreators(actions.decrease, dispatch)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
