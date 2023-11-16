# Mandoor-API
route for Users Registration:
add User :
method : POST
http://localhost:8080/users
request : content JSON
{
    "email": "{{$timestamp}}-{{newEmail}}",
    "username": "{{$timestamp}}-{{newUsername}}",
    "fullname": "{{newFullname}}",
    "password": "{{newPassword}}",
    "nomorwa": "{{newNomorwa}}",
    "alamat": "{{newAlamat}}"
}

get user by email :
method : GET
http://localhost:8080/users/{email}

get user by username : 
method : GET
http://localhost:8080/users/{username}/username

route for Mitra Registration :
add Mitra :
method : POST
http://localhost:8080/mitras
request payload : content JSON
{
    "email": "{{$timestamp}}-{{newEmail}}",
    "mitraname": "{{$timestamp}}-{{newMitraname}}",
    "fullname": "{{newFullname}}",
    "password": "{{newPassword}}",
    "noKTP": "{{$timestamp}}",
    "nomorwa": "{{$timestamp}}-{{newNomorwa}}",
    "alamat": "{{newAlamat}}"
}

get mitra by email :
method : GET
http://localhost:8080/mitras/{email}

get mitra by mitraname :
method : GET
http://localhost:8080/mitras/{mitraname}/mitraname
