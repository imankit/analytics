var request   = require('request'),
    assert   = require('assert')

var baseUrl = 'http://localhost:5555';

describe("ANALYTICS SERVICE STATUS CHECK", function() {
  
  before(function(done){
    // initialize resources
    done();
  });

  after(function(done) {
    done();
  });

  it('API STATUS SHOULD RETURN 200', function (done) {
    this.timeout(15000);
    request.get({
        url:  baseUrl +'/status'
    }, function (err, resp, body) {
        if(err){
          console.log(err)
          done(err)
        }
        assert.equal(200, resp.statusCode);
        done()
    });
  });

});
