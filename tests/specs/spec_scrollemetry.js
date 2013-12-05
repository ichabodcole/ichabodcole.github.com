// Scrollemetry Test Specs
describe('Scrollemetry', function () {
  var el = document;

  // Scrollemetry Methods
  describe('methods', function() {
    var scroller = new Scrollemetry(el);

    // Getters
    describe('getters', function(){
      it('should respond to speed', function(){
        expect(scroller).to.respondTo('speed');
      });

      it('should respond to direction', function(){
        expect(scroller).to.respondTo('direction');
      });

      it('should respond to markers', function(){
        expect(scroller).to.respondTo('markers');
      });

      it('should respond to lastScroll', function(){
        expect(scroller).to.respondTo('lastScroll');
      });
    })

    it('should respond to addMarker', function(){
      expect(scroller).to.respondTo('addMarker');
    });

    describe('addMarker', function(){
      var scroller;

      beforeEach(function(done){
        scroller = new Scrollemetry(el);
        done();
      });

      it('should add a marker to the markers array', function(){
        var markerStartSize = scroller.markers().length;
        scroller.addMarker('m1', 10);
        var markerEndSize = scroller.markers().length;
        expect(markerEndSize).to.be.greaterThan(markerStartSize);
      });

      it('should replace a marker if the id already exists', function(){
        scroller.addMarker('m2', 10);
        scroller.addMarker('m2', 5);
        var markerSize = scroller.markers().length;
        expect(markerSize).to.equal(1);
      });

      it('should replace the values of a marker with the same id', function(){
        scroller.addMarker('m3', 10);
        scroller.addMarker('m3', 25);
        var marker = scroller.markers()[0];
        expect(marker.scrollPosition).to.equal(25);
      })
    });

    it('should respond to getMarkerById', function(){
      expect(scroller).to.respondTo('getMarkerById');
    });

    describe('getMarkerById', function(){
      var scroller = new Scrollemetry(el);

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

    describe('update', function(){
      var scroller;
      beforeEach(function(){
        scroller = new Scrollemetry(el);
      });

      it('should set speed to the difference between the last scroll position and the current scroll position', function(){
        scroller.update(50);
        expect(scroller.speed()).to.equal(50);
      });

      it('should set the lastScroll to the current scroll', function(){
        scroller.update(75);
        expect(scroller.lastScroll()).to.equal(75);
      });

      it('should set the direction property down when scrolling down', function(){
        scroller.update(50);
        expect(scroller.direction()).to.equal('down');
      });

      it('should set the direction property up when scrolling up', function(){
        scroller.update(50);
        scroller.update(20);
        expect(scroller.direction()).to.equal('up');
      });

      it('should set the direction to null if no change in scroll has happend', function(){
        scroller.update(50);
        scroller.update(50);
        expect(scroller.direction()).to.be.null;
      });

      it('should update markers past flags, when the scroll property is above the markers scrollPosition', function(){
        scroller.addMarker('m1', 40);
        scroller.update(50);
        var marker = scroller.getMarkerById('m1');
        expect(marker.past).to.be.true;
      });
    });
  });

  // Scrollemetry Events
  describe('events', function() {
    describe('marker event', function(){
      var scroller, scrollerSpy;

      beforeEach(function(){
        scroller = new Scrollemetry(el);
        scrollerSpy = sinon.spy();
      });

      it('should fire an event when the scroll passes a markers scrollPosition value', function(){
        scroller.addMarker('m1', 150);
        document.addEventListener('m1', scrollerSpy);
        scroller.update(200);
        expect(scrollerSpy).to.be.called;
      });

      it('should only fire an event once when the scroll passes a markers scrollPosition value', function(){
        scroller.addMarker('m1', 150);
        document.addEventListener('m1', scrollerSpy);
        scroller.update(200);
        scroller.update(210);
        expect(scrollerSpy).to.be.calledOnce;
      });

      it('should fire an event if the scroll prop goes above the marker position then below it again', function(){
        scroller.addMarker('m1', 150);
        document.addEventListener('m1', scrollerSpy);
        scroller.update(200);
        scroller.update(140);
        expect(scrollerSpy).to.be.calledTwice;
      });

      it('should fire an event thrice if the scroll passes a marker then repasses it', function(){
        scroller.addMarker('m1', 50);
        document.addEventListener('m1', scrollerSpy);
        scroller.update(70);
        scroller.update(20);
        scroller.update(100);
        expect(scrollerSpy).to.be.calledThrice;
      });
    })
  });
});
