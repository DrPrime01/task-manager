curl -H "Content-Type: application/json" \
     -H "Authorization: Bearer F393829C6BC73556AC286FA2E3EC7B8B3BBAA589B1CF067B67DEBB92C51A07FF" \
     -X POST "https://08481db0-f3d7-4f91-a1c6-547956916586.pushnotifications.pusher.com/publish_api/v1/instances/08481db0-f3d7-4f91-a1c6-547956916586/publishes" \
     -d '{"interests":["hello"],"web":{"notification":{"title":"Hello","body":"Hello, world!"}}}'