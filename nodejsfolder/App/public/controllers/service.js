
myApp.factory('commonService', function () {
	console.log('I loaded');
        var myValue;
        return {
            set: function (o) {
                this.myValue = o;
            },
            get: function () {
                return this.myValue;
            }
        };
});