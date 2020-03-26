const indexFunctions = {
    getHome: function(req, res, next) {
        res.send('Home Directory');
    },

    getAsdf: function(req, res, next) {
        res.send('Asdf Directory');
    },

    getSeats: function(req, res, next) {
    	res.render('seats', {
    	  header: 'seats'
    	})
    },

    getUserProfile: function(req, res, next) {
    	res.render('userprofile', {
    	  fname: req.params.fname,
    	  lname: req.params.lname,
    	  username: req.params.username,
    	  email: req.params.email,
    	  mobileNum: req.params.mobileNum,
    	  pic: '../../../../../../../assets/profpic.png'
    	})
    },

    getViewTicket: function(req, res, next) {
        res.render('ticket', {
            /*
            title: req.params.title,
            showDate: req.params.showDate,
            showTime: req.params.showTime,
            dateBooked: req.params.dateBooked,
            seatNum: req.params.seatNum,
            price: req.params.price
            */
            title: 'req.params.title',
            showDate: 'req.params.showDate',
            showTime: 'req.params.showTime',
            dateBooked: 'req.params.dateBooked',
            seatNum: 'req.params.seatNum',
            price: 'req.params.price'
        })
    }
};

module.exports = indexFunctions;