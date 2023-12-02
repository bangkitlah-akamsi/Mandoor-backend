class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const {
      email, username, fullname, password, nomorwa, alamat,
    } = request.payload;

    const datauser = await this._service.addUser({
      email, username, fullname, password, nomorwa, alamat,
    });
    console.log(datauser);

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        datauser,
      },
    });
    response.code(201);
    return response;
  }

  async getAllUsersHandler() {
    // to do : validation credential admin
    const dataUsers = await this._service.getAllUsers();
    return {
      status: 'success',
      data: {
        dataUsers,
      },
    };
  }

  async getUserByIdHandler(request) {
    const { id } = request.params;

    const User = await this._service.getUserById(id);

    return {
      status: 'success',
      data: {
        User,
      },
    };
  }

  async getUserByEmailHandler(request) {
    const { email } = request.params;

    const user = await this._service.getUserByEmail(email);

    return {
      status: 'success',
      data: {
        user,
      },
    };
  }

  async getUserByUsernameHandler(request) {
    const { username } = request.params;

    const user = await this._service.getUserByUsername(username);

    return {
      status: 'success',
      data: {
        user,
      },
    };
  }

  async putUserByIdHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const {
      email, username, fullname, password, nomorwa, alamat,
    } = request.payload;
    const { id } = request.params;

    await this._service.editUserById(id, {
      email, username, fullname, password, nomorwa, alamat,
    });

    const response = h.response({
      status: 'success',
      message: `data ${username} berhasil diperbarui`,
    });
    response.code(200);
    return response;
  }

  async deleteUserByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteUserById(id);
    const response = h.response({
      status: 'success',
      message: 'User berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = UsersHandler;
