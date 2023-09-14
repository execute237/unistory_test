#UNISTORY TEST TASK
---
**Документация api предоставлена в качестве документа .json в insomnia или ниже**

```
Для начала нужно установить пакеты и накатить миграцию

npm i
npm run migration:run
npm start
```


```
Register user *POST*

http://localhost:3000/user/register
Headers: Content-type application/json
{
  "name": string
  "email": string email
  "password": string
}

return 201:
{
  "name": string
  "email": string email
}
```

```
Login user *POST*

http://localhost:3000/user/login
Headers: Content-type application/json
{
  "email": string email
  "password": string
}

return 200:
{
  accessToken: string
}
```

```
Update user *PATCH*

http://localhost:3000/user
Headers: 
Content-type application/json
Authorization Bearer {$TOKEN}
{
  "name": string
}

return 200:
{
	"generatedMaps": array,
	"raw": array,
	"affected": number
}
```

```
Subscription user *PATCH*

http://localhost:3000/user/subscription
Headers: 
Content-type application/json
Authorization Bearer {$TOKEN}
{
  "subscription": boolean
}

return 200:
{
  "generatedMaps": array,
  "raw": array,
  "affected": number
}
```

```
Subscription user *DELETE*

http://localhost:3000/user
Headers: 
Authorization Bearer {$TOKEN}

return 200:
{
  "generatedMaps": array,
  "raw": array,
  "affected": number
}
```


```
All users *GET*

http://localhost:3000/user/all
Headers: Content-type application/json
{
  "limit": number
  "offset": number
}

return 200:
[
  {
    "id": number
    "name": string
    "email": string email
    "subscription": boolean
  }
]
```

```
Find user *GET*

http://localhost:3000/user/{$USER ID}

return 200:
{
  "user": {
    "name": string
    "email": string email
    "subscription": boolean
  },
  "books": {
    "isbn": string ISBN
    "title": string
    "author": string
  }
}
```



###book routes
```
Create Book *POST*

http://localhost:3000/book
Headers: Content-type application/json
{
  "title": string
  "author": string
  "isbn": string ISBN
}

return 201:
{
  "id": number
  "title": string
  "author": string
  "isbn": string ISBN
  "userId": null
}
```

```
Add Book to user *PATCH*

http://localhost:3000/book/{$BOOK ID}
Headers: Authorization Bearer {$TOKEN}

return 200:
{
  "generatedMaps": array,
  "raw": array,
  "affected": number
}
```

```
Add Book to user *PATCH*

http://localhost:3000/book/return/{$BOOK ID}
Headers: Authorization Bearer {$TOKEN}

return 200:
{
  "generatedMaps": array,
  "raw": array,
  "affected": number
}
```