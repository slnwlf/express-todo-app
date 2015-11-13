var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();


chai.use(chaiHttp);

describe('todo', function() {
	it('should list ALL todos on /todos GET', function(done) {
		chai.request(server)
			.get('/todos')
			.end(function(err, res) {
				res.should.have.status(200);
				done();
			});
	});


	it('should list a SINGLE todo on /todos/<id> GET');
	it('should add a SINGLE todo on /todos POST');
	it('should update a SINGLE todo on /todos/<id> PUT');
	it('should delete a SINGLE todo on /todos/<id> DELETE');
});