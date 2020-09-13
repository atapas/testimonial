const query = require("./utils/query");

const CREATE_TESTIMONIAL = `
  mutation($text: String!, $rating: Int!){
    createMessage(data: {text: $text, rating: $rating}){
      _id
      text
      rating
    }
  }
`;

exports.handler = async event => {
  const { text, rating } = JSON.parse(event.body);
  const { data, errors } = await query(CREATE_TESTIMONIAL, { text, rating });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ testimonial: data.createMessage })
  };
};