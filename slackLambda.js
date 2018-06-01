console.log('Loading function')

exports.handler = async (event, context) => {
  // Load the AWS SDK for Node.js
  var AWS = require('aws-sdk')

  AWS.config.update({region: 'eu-central-1'})

  const userId = event.userId
  const messageLength = event.messageLength

  // Create the DynamoDB service object
  const ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'})

  var params = {
    TableName: 'workshopSlack',
    Item: {
      userId: userId,
      messageLegth: messageLength
    }
  }

  // Call DynamoDB to add the item to the table
  ddb.putItem(params, (err, data) => {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Success', data)
    }
  })
}

// todo: check error logs and refactor with async/await
