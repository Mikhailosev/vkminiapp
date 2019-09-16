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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: null
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
  render() {
    let allGroups = null;
    if (this.props.groups) {
      allGroups = this.props.groups.items.map(group => {
        return (
          <ListItem
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
            {allGroups}
          </Group>
        ) : (
          <Spinner size="large"></Spinner>
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
