import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { DELETE_GOD } = Mutations;

const DeleteGod = (props) => {
  return (
    <Mutation mutation={DELETE_GOD}>{(deleteGod, { data }) => {}}</Mutation>
  );
};

export default DeleteGod;