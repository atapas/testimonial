const query = require("./utils/query");

const GET_TESTIMONIALS = `
    query {
        allMessages {
        data {
            _id
            text
            rating
        }
        }
    }
`;

exports.handler = async () => {
  const { data, errors } = await query(GET_TESTIMONIALS);

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ messages: data.allMessages.data })
  };
};