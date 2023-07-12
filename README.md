Install these depandancy packages from npm 
```json
npm install --save @liaoliaots/nestjs-redis ioredis
```

Spin up this application using docker-compose orcastration tool
`docker-compose up --build`

**request these endpoint to test**

post request 
`http://localhost:3000/demo`
```
body: {
  "name":"test name",
  "age":4,
  "gender":"women",
  "email":"test@gmail.com"
}
```

get request
`http://localhost:3000/demo`

response should getting data from redis caching server