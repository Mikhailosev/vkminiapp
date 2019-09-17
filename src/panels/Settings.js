import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Panel,
  PanelHeader,
  HeaderButton,
  platform,
  IOS,
  Group,
  ListItem,
  PanelSpinner,
  Avatar
} from "@vkontakte/vkui";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";

const osname = platform();

class Settings extends Component {
  componentWillMount() {
    console.log("Opened");
    console.log(this.props);
  }
  render() {
    console.log(this.props);

    return (
      <Panel id={this.props.id}>
        <PanelHeader
          left={
            <HeaderButton onClick={this.props.go} data-to="home">
              {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
            </HeaderButton>
          }
        >
          Settings
        </PanelHeader>
        <Group title="User settings">
          <ListItem
            data-to="settings"
            onClick={this.props.go}
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
      </Panel>
    );
  }
}
Settings.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
};
export default Settings;
