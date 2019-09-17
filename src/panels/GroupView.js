import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Panel,
  PanelHeader,
  HeaderButton,
  platform,
  IOS
} from "@vkontakte/vkui";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";

const osname = platform();

class GroupView extends Component {
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
          {this.props.data ? this.props.data.name : null}
        </PanelHeader>
      </Panel>
    );
  }
}
GroupView.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
};
export default GroupView;
