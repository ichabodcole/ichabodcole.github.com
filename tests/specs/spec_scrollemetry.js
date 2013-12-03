// Scrollemetry Test Specs
describe('Scrollemetry', function () {
  var Scrollemetry = ichaBlog.scroller;
  describe('properties', function(){
    var scroller = new Scrollemetry();

    it('should have a speed property', function(){
     expect(scroller).to.have.property('speed');
    });

    it('should have a lastScroll property', function(){
     expect(scroller).to.have.property('lastScroll');
    });

    it('should have a direction property', function(){
     expect(scroller).to.have.property('direction');
    });

    it('should have a scroll property', function(){
     expect(scroller).to.have.property('scroll');
    });

    it('should have a markers property', function(){
     expect(scroller).to.have.property('markers');
    });
  });

  describe('methods', function() {
    var scroller = new Scrollemetry();

    it('should respond to addMarker', function(){
      expect(scroller).to.respondTo('addMarker');
    });

    describe('addMarker', function(){
      var scroller;

      beforeEach(function(done){
        scroller = new Scrollemetry();
        done();
      });

      it('should add a marker to the markers array', function(){
        var markerStartSize = scroller.markers.length;
        scroller.addMarker('m1', 10);
        var markerEndSize = scroller.markers.length;
        expect(markerEndSize).to.be.greaterThan(markerStartSize);
      });

      it('should replace a marker if the id already exists', function(){
        scroller.addMarker('m2', 10);
        scroller.addMarker('m2', 5);
        var markerSize = scroller.markers.length;
        expect(markerSize).to.equal(1);
      });

      it('should replace the values of a marker with the same id', function(){
        scroller.addMarker('m3', 10);
        scroller.addMarker('m3', 25);
        var marker = scroller.markers[0];
        expect(marker.scrollPosition).to.equal(25);
      })
    });

    it('should respond to getMarkerById', function(){
      expect(scroller).to.respondTo('getMarkerById');
    });

    describe('getMarkerById', function(){
      var scroller = new Scrollemetry();

      it('should return a marker when given an id', function(){
        scroller.addMarker('mId', 32);
        var marker = scroller.getMarkerById('mId');
        expect(marker.id).to.equal('mId');
        expect(marker.scrollPosition).to.equal(32);
      });
    });

    it('should respond to update', function(){
      expect(scroller).to.respondTo('update');
    });

    // describe('events', function() {
    //   var scroller = new Scrollemetry();
    //   it('should fire an event when page scroll passes a markers scrollPosition value', function(){
    //     scroller.addMarker('m1', 150);
    //   });
    // });
  });
});
