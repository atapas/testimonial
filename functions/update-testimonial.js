const query = require("./utils/query");

const UPDATE_TESTIMONIAL = `
    mutation($id: ID!, $text: String!, $rating: Int!){
        updateMessage(id: $id, data: {text: $text, rating: $rating}){
            _id
            text
            rating
        }
    }
`;

exports.handler = async event => {
  const { id, text, rating } = JSON.parse(event.body);
  const { data, errors } = await query(UPDATE_TESTIMONIAL, { id, text, rating });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ updatedMessage: data.updateMessage })
  };
};