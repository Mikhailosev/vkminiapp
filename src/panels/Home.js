import React from "react";
import PropTypes from "prop-types";
import {
  Panel,
  ListItem,
  Button,
  Group,
  Div,
  Avatar,
  PanelHeader
} from "@vkontakte/vkui";

const Home = ({ id, go, fetchedUser, token, request, groups }) => {
  var allGroups = null;
  if (groups) {
    allGroups = groups.items.map(group => {
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
  } else {
    return <p>Groups Loading</p>;
  }

  return (
    <Panel id={id}>
      <h2>{localStorage.getItem("user")}</h2>

      <PanelHeader>Example</PanelHeader>
      {fetchedUser && (
        <Group title="User Data Fetched with VK Connect">
          <ListItem
            before={
              fetchedUser.photo_200 ? (
                <Avatar src={fetchedUser.photo_200} />
              ) : null
            }
            description={
              fetchedUser.city && fetchedUser.city.title
                ? fetchedUser.city.title
                : ""
            }
          >
            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
          </ListItem>
        </Group>
      )}

      <Group title="Navigation Example">
        <Div>
          <Button size="xl" level="2" onClick={go} data-to="persik">
            Show me the Persik, please
            <br></br>
            {token}
          </Button>
        </Div>
      </Group>
      <Group title={`All Groups : ${groups.count}`}>{allGroups}</Group>
    </Panel>
  );
};

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
