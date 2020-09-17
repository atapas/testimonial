# Testimonial

This app demonstrates the ease of building a `serverless app` using Gatsby, Netlify and FaunaDB.

<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1600313249501/cZ51Ca49H.gif?border=1,CCCCCC&auto=compress" alt="testimonial-app " />

# Install dependencies

- `npm install -g gatsby-cli`: Install gatsby-cli globally
- `npm install netlify-cli -g`: Install netlify-cli globally
- `yarn install` or `npm install`: Install the dependencies

# Run the app locally

- Create a `.env` file and provide the API secret key in the format,
 ```shell
 FAUNA_SERVER_SECRET=<your secret fauna key>
 ```
- `netlify dev`: Run it in the dev mode.

# Step-by-Step articles to follow

Follow these articles to build the app along side:
- [How to build a serverless app with Gatsby, Netlify and FaunaDB - Part 1](https://blog.greenroots.info/how-to-build-a-serverless-app-with-gatsby-netlify-and-faunadb-part-1-ckf2dpwy200idbns1fbgpg7kx)
- [How to build a serverless app with Gatsby, Netlify and FaunaDB - Part 2](https://blog.greenroots.info/how-to-build-a-serverless-app-with-gatsby-netlify-and-faunadb-part-2-ckf3xvyo000x1bos16t415jy7)

## Other good reads
- [Getting started with FaunaDB](https://docs.fauna.com/fauna/current/start/cloud)
- [Netlify's AWS lambda functions](https://www.netlify.com/blog/2018/03/20/netlifys-aws-lambda-functions-bring-the-backend-to-your-frontend-workflow/)
- [Deploy Gatsby to Netlify](https://www.netlify.com/with/gatsby/)
- [Netlify Identity](https://docs.netlify.com/visitor-access/identity/)
