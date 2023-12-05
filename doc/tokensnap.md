**ENDPOINT :** https://mandoor-backend-ewhqw2fqpq-uc.a.run.app

**ROUTE FOR GET TOKEN SNAP PAYMENT GATEWAY**

- **get token snap :**

method : **POST**

path : /payment/token

request body : content JSON
```
{
    "pesanan_id": "pesanan-gXPII-3rIh7CymLW"
}
```

response :
```
{
    "status": "success",
    "message": "Token berhasil dibuat",
    "token": "{tokenya disensor}"
}
```

statusCode : 201 (Created)