// Updated Zeller API to support server-side filtering with parameterized GraphQL queries

const axios = require('axios');

const ZellerApi = {
  fetchData: async (filterParams) => {
    try {
      // Construct your GraphQL query dynamically based on filterParams
      const query = `query($filter: FilterInput) {\n  items(filter: $filter) {\n    id\n    name\n    value\n  }\n}`;

      const variables = { filter: filterParams };

      const response = await axios.post('https://your-graphql-endpoint.com/graphql', { query, variables });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Zeller API:', error);
      throw error;
    }
  },
};

module.exports = ZellerApi;