/**
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

export const lambdaHandler = async (event, context,callback) => {
  // Extract the request from the CloudFront event
  const request = event.Records[0].cf.request;
    
  // Log the original request URI
  console.log('Original URI: ' + request.uri);

  try{
    // Check if the URL contains a dot "." (like file.js or file.json or file.css etc -> return the original request)
    if (request.uri.includes('.')) {
      return callback(null, event.Records[0].cf.request);
    }

    //split to parts to see which react index.html to serve
    const parts = request.uri.split('/');
    
    // Check if there are enough parts to return the first two segments
    // return default request otherwise
    if (parts.length < 3) {
      throw new Error('URL does not contain enough segments: [' + request.uri + ']');
    }
    
    request.uri = `/${parts[1]}/${parts[2]}/index.html`;
    console.log('Modified URI: ' + request.uri);
    
    // Return the modified request to CloudFront
    return callback(null,request);

  } catch (err) {
      console.error('Error modifying request URI:', err);
      // Return the mayhem page
      request.uri='/mayhem.html';
      callback(null, request);
  }
}

