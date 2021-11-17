import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/player';

import './App.css';
import { Table } from 'react-bootstrap';

function App(props) {
  useEffect(() => {
    fetchPlayers();
    // eslint-disable-next-line
  }, []);

  const fetchPlayers = () => {
    props.actions.fetch();
  }

  return (
    <div className="App">
      <div className="table-div">
        <Table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Username</th>
              <th>Rank</th>
              <th>Money</th>
              <th>Daily Diff</th>
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
              props.players && props.players.length ? 
              props.players.map((player, index) => {
                return (
                  <tr key={player._id}>
                    <td>
                      { player.country }
                    </td>
                    <td>
                      { player.name }
                    </td>
                    <td>
                      { index + 1 }
                    </td>
                    <td>
                      { player.weeklyValue }
                    </td>
                    <td>
                      { player.dailyValue }
                    </td>
                    <td>
                      <button
                        className="action inc"
                        onClick={() => props.actions.increase(player._id)}
                      >
                        +
                      </button>
                      <button
                        className="action dec"
                        onClick={() => props.actions.decrease(player._id)}
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
    players: state.player.players,
    isLoading: state.player.isLoading
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
