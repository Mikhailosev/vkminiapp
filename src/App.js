import React from "react";
import connect from "@vkontakte/vk-connect";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import Persik from "./panels/Persik";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePanel: "home",
      fetchedUser: null,
      token: null,
      request: null,
      fetchedUsers: null,
      groups: null
    };
  }

  componentDidMount() {
    const fetchUser = new Promise((resolve, reject) => {
      connect.send("VKWebAppGetUserInfo", {});
      resolve(
        connect.send("VKWebAppGetAuthToken", {
          app_id: 7136184,
          scope: "groups"
        })
      );
      reject();
    });
    fetchUser.then(res => {
      console.log(res);
    });
    connect.subscribe(e => {
      switch (e.detail.type) {
        case "VKWebAppGetUserInfoResult":
          this.setState({ fetchedUser: e.detail.data });
          console.log(this.state.fetchedUser);
          break;
        case "VKWebAppAccessTokenReceived":
          if (this.state.fetchedUser !== null) {
            this.setState({ token: e.detail.data.access_token });
            connect.send("VKWebAppCallAPIMethod", {
              method: "groups.get",
              request_id: "getUserGroups",
              params: {
                user_id: this.state.fetchedUser.id,
                access_token: this.state.token.toString(),
                extended: 1,
                count: 999,
                v: "5.101"
              }
            });

            console.log(this.state.token.toString());
          }
          break;
        default:
          console.log(e.detail.data.error_data);
      }
      switch (e.detail.data.request_id) {
        case "getUserGroups":
          this.setState({ groups: e.detail.data.response });
          console.log(this.state.groups);
          break;
        default:
          console.log(e.detail.data.error_data);
      }
    });
  }
  getGroup() {
    if (this.state.token) {
    }
  }
  go = e => {
    this.setState({ activePanel: e.currentTarget.dataset.to });
  };

  render() {
    return (
      <View activePanel={this.state.activePanel}>
        <Home
          id="home"
          request={this.state.request}
          token={this.state.token}
          fetchedUser={this.state.fetchedUser}
          go={this.go}
          fetchedUsers={this.state.fetchedUsers}
          groups={this.state.groups}
        />
        <Persik id="persik" go={this.go} />
      </View>
    );
  }
}

export default App;
