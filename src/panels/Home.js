import React, { Component } from "react";

import PropTypes from "prop-types";
import {
  Panel,
  ListItem,
  Button,
  Group,
  Div,
  Avatar,
  PanelHeader,
  Spinner,
  PanelSpinner
} from "@vkontakte/vkui";
import Icon28SettingsOutline from "@vkontakte/icons/dist/28/settings_outline";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: null,
      admin: false,
      active: false
    };
  }
  switchTheme = () => {
    let theme = localStorage.getItem("theme");
    localStorage.setItem(
      "theme",
      `${theme === "client-dark" ? "client-light" : "client-dark"}`
    );
    this.setState({
      switched: "The mode is now switched, please reload the page"
    });
  };

  handleGroups = () => {
    if (this.state.admin === true) {
      // eslint-disable-next-line
      return this.props.groups.items.map(group => {
        if (group.is_admin === 1) {
          return (
            <ListItem
              data={group}
              onClick={this.props.go}
              data-to="group"
              key={group.id}
              before={group.photo_200 ? <Avatar src={group.photo_200} /> : null}
              description={
                group.is_admin === 1 ? <p>Администратор</p> : <p>Читатель</p>
              }
            >
              {`${group.name}`}
            </ListItem>
          );
        }
      });
    } else {
      return this.props.groups.items.map(group => {
        return (
          <ListItem
            onClick={e => {
              this.props.go(e, group);
            }}
            data-to="group"
            key={group.id}
            before={group.photo_200 ? <Avatar src={group.photo_200} /> : null}
            description={
              group.is_admin === 1 ? <p>Администратор</p> : <p>Читатель</p>
            }
          >
            {`${group.name}`}
          </ListItem>
        );
      });
    }
  };
  render() {
    const buttons = () => {
      if (this.state.admin === true) {
        return (
          <Div style={{ display: "flex" }}>
            <Button
              size="l"
              level="secondary"
              onClick={() => {
                this.setState({ admin: false });
              }}
              stretched
            >
              All
            </Button>
            <Button
              size="l"
              onClick={() => {
                this.setState({ admin: true });
              }}
              stretched
              level="primary"
            >
              Admin
            </Button>
          </Div>
        );
      } else {
        return (
          <Div style={{ display: "flex" }}>
            <Button
              style={{
                marginRight: "10px"
              }}
              size="l"
              level="primary"
              onClick={() => {
                this.setState({ admin: false });
              }}
              stretched
            >
              All
            </Button>
            <Button
              style={{
                marginLeft: "10px"
              }}
              size="l"
              onClick={() => {
                this.setState({ admin: true });
              }}
              stretched
              level="secondary"
            >
              Admin
            </Button>
          </Div>
        );
      }
    };

    return (
      <Panel id={this.props.id}>
        <PanelHeader>Example</PanelHeader>
        {this.props.fetchedUser && (
          <Group title="User Data Fetched with VK Connect">
            <ListItem
              before={
                this.props.fetchedUser.photo_200 ? (
                  <Avatar src={this.props.fetchedUser.photo_200} />
                ) : (
                  <PanelSpinner></PanelSpinner>
                )
              }
              description={
                this.props.fetchedUser.city && this.props.fetchedUser.city.title
                  ? this.props.fetchedUser.city.title
                  : ""
              }
            >
              {`${this.props.fetchedUser.first_name} ${this.props.fetchedUser.last_name}`}
              <Icon28SettingsOutline
                data-to="settings"
                onClick={this.props.go}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "20px"
                }}
              ></Icon28SettingsOutline>
            </ListItem>
          </Group>
        )}
        <Group title="Navigation Example">
          <Div>
            <Button
              size="xl"
              level="2"
              onClick={this.props.go}
              data-to="persik"
            >
              Show me the Persik, please
              <br></br>
              {this.props.token}
            </Button>
          </Div>
        </Group>
        <Button size="xl" level="2" onClick={this.switchTheme}>
          {!this.state.switched
            ? "Click here to switch Mode"
            : this.state.switched}
        </Button>
        {this.props.groups ? (
          <Group title={`All Groups : ${this.props.groups.count}`}>
            {buttons()}
            {this.handleGroups()}
          </Group>
        ) : (
          <Spinner
            style={{
              marginTop: "50px"
            }}
          ></Spinner>
        )}
      </Panel>
    );
  }
}

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string
    })
  })
};

export default Home;
