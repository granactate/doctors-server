const should = require('should');
const request = require('request');
const _ = require('lodash');

console.log("\n\n\n");
describe('Auth login test', function () {
  let dataLoginSuccess = {
      type: 0,
      email: "admin@kubesoft.com",
      password: "12345"
  };

  let token = '';
  this.timeout(3000);


  it('should login admin account', function (done) {

    request.post({
      url : 'http://localhost:3000/auth/login',
      form : dataLoginSuccess
    }, function (err, httpResponse, body) {
      let response = JSON.parse(body);
      if (err) {
        return should.not.exist(err);
      }

      token =response.data.token || '';
      should(response.status).not.be.equals(-1);
      done();

    })
  });

  it('should can view the doctors if the admin is logged', function (done) {
    let options = {
      url : 'http://localhost:3000/doctor/',
      headers : { 'x-auth' : token }
    };

    request.get(options,function (err, httpResponse, body) {
      if (err) { return should.not.exist(err); }
      should(httpResponse).has.property('statusCode', 200);
      done();
    })
  });

  it('should logout admin account', function (done) {

    let options = {
      url : 'http://localhost:3000/auth/logout',
      headers : { 'x-auth' : token }
    };
    request.post(options, function (err, httpResponse, body) {
      let response = JSON.parse(body);
      if (err) { return should.not.exist(err); }

      should(response).has.property('status',1);
      done();

    })
  });

  it('should not can access to view the doctors if the admin is not logged', function (done) {
    let options = {
      url : 'http://localhost:3000/doctor/'
    };

    request.get(options,function (err, httpResponse, body) {
      if (err) { return should.not.exist(err); }

      should(httpResponse).has.property('statusCode', 401);
      done();
    })
  });

});
