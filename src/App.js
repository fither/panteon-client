import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/player';
import Logo from './images/logo.png';

// import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Button } from "@progress/kendo-react-buttons";

import '@progress/kendo-theme-default/dist/all.css';

import './App.css';

function App(props) {
  useEffect(() => {
    fetchPlayers();
    // eslint-disable-next-line
  }, []);

  const fetchPlayers = () => {
    props.actions.fetch();
  }

  const increase = (id) => {
    props.actions.increase(id)
  }

  const decrease = (id) => {
    props.actions.decrease(id);
  }

  const LoadingPanel = 
    <div className="k-loading-mask">
      <span className="k-loading-text">Loading</span>
      <div className="k-loading-image" />
      <div className="k-loading-color" />
    </div>;

  return (
    <div className="App">
      <div className="header">
        <img src={Logo} alt="logo"></img>
      </div>
      <div className="content">
        { 
          props.isLoading ?
          LoadingPanel :
          <Grid
            data={props.players}
            style={{ height: '500px' }}
          >
            <GridColumn field="country"></GridColumn>
            <GridColumn field="name"></GridColumn>
            <GridColumn field="weeklyValue"></GridColumn>
            <GridColumn 
              field="dailyValue"
              cell={(data) => (
                <td 
                  style={{ 
                    'color': data.dataItem.weeklyValue > 0 ? 'green' :
                    data.dataItem.weeklyValue === 0 ? '#dece00' : 'red' 
                  }}
                >
                  { data.dataItem.weeklyValue }
                </td>
              )}
            ></GridColumn>
            <GridColumn 
              field="actions"
              cell={(data) => (
                <td>
                  <Button
                    icon="plus"
                    onClick={() => increase(data.dataItem._id)}
                  ></Button>
                  <Button
                    icon="minus"
                    onClick={() => decrease(data.dataItem._id)}
                  ></Button>
                </td>
              )}
            ></GridColumn>
          </Grid>
        }
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
