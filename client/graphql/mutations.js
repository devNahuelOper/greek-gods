import gql from "graphql-tag";

export default {
  DELETE_GOD: gql`
    mutation DeleteGod($id: ID!) {
      deleteGod(id: $id) {
        id
      }
    }
  `,
  NEW_GOD: gql`
    mutation NewGod($name: String, $type: String, $description: String) {
      newGod(name: $name, type: $type, description: $description) {
        id
        name
        description
      }
    }
  `,
  UPDATE_GOD_NAME: gql`
    mutation updateGodName($id: ID!, $name: String) {
      updateGod(id: $id, name: $name) {
        id
        name
      }
    }
  `,
  UPDATE_GOD_TYPE: gql`
    mutation updateGodType($id: ID!, $type: String) {
      updateGod(id: $id, type: $type) {
        id
        type
      }
    }
  `,
  UPDATE_GOD_DESCRIPTION: gql`
    mutation updateGodDescription($id: ID!, $description: String) {
      updateGod(id: $id, description: $description) {
        id
        description
      }
    }
  `,
  ADD_GOD_DOMAIN: gql`
    mutation addGodDomain($godId: ID!, $domain: String!) {
      addGodDomain(godId: $godId, domain: $domain) {
        id
        domains
      }
    }
  `,
  REMOVE_GOD_DOMAIN: gql`
    mutation removeGodDomain($godId: ID!, $domain: String!) {
      removeGodDomain(godId: $godId, domain: $domain) {
        id
        domains
      }
    }
  `,
  UPDATE_GOD_ABODE: gql`
    mutation updateGodAbode($godId: ID!, $abodeId: ID!) {
      updateGodAbode(godId: $godId, abodeId: $abodeId) {
        id
        abode {
          id
          name
          gods {
            id
          }
        }
      }
    }
  `,
  ADD_GOD_EMBLEM: gql`
    mutation addGodEmblem($godId: ID!, $emblemId: ID!) {
      addGodEmblem(godId: $godId, emblemId: $emblemId) {
        id
        emblems {
          id
          gods {
            id
          }
        }
      }
    }
  `,
  REMOVE_GOD_EMBLEM: gql`
    mutation removeGodEmblem($godId: ID!, $emblemId: ID!) {
      removeGodEmblem(godId: $godId, emblemId: $emblemId) {
        id
        emblems {
          id
          gods {
            id
          }
        }
      }
    }
  `,
  NEW_EMBLEM: gql`
    mutation NewEmblem($name: String) {
      newEmblem(name: $name) {
        id
        name
      }
    }
  `,
  NEW_ABODE: gql`
    mutation NewAbode($name: String, $coordinates: String) {
      newAbode(name: $name, coordinates: $coordinates) {
        id
        name
        coordinates
      }
    }
  `,
  UPDATE_ABODE_NAME: gql`
    mutation updateAbodeName($id: ID!, $name: String) {
      updateAbode(id: $id, name: $name) {
        id
        name
      }
    }
  `,
  UPDATE_EMBLEM_NAME: gql`
    mutation updateEmblemName($id: ID!, $name: String) {
      updateEmblem(id: $id, name: $name) {
        id
        name
      }
    }
  `,
  DELETE_EMBLEM: gql`
    mutation deleteEmblem($id: ID!) {
      deleteEmblem(id: $id) {
        id
      }
    }
  `
};
