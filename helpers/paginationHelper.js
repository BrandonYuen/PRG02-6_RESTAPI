
exports.currentItems = function(total, start = 1, limit = 0) {
	var items = 0;

	if (limit == 0) {
		items = total;
	} else if (total < limit) {
		items = total;
	} else {
		items = limit;
	}

	return parseInt(items);
}

// get list of all Projects
exports.numberOfPages = function(total, start = 1, limit = 0) {
	var pages =  1;

	if (limit > 0) {
		pages = Math.ceil(total / limit);
	}

	return pages;
}

exports.currentPage = function(total, start = 1, limit = 0) {
	// Default start 1
	var page = 1;

	// If limit is less than start
	if (limit == 0) {
		page = 2;
	// If start is not 1, calculate page
	} else if (start != 1) {
		page = Math.ceil(start / limit);
	}

	return parseInt(page);
}

//Get query string for after the uri to the FIRST page.
exports.getFirstQueryString = function(total, start = 1, limit = 0) {
	var string = '';

	// If start and limit are given
	if (limit != 0 || start > 1) {
		string = '?start=1&limit='+limit
	}

	return string;
}

//Get query string for after the uri to the FIRST page.
exports.getLastQueryString = function(total, start = 1, limit = 0) {
	var string = '';

	// If start and limit are given
	if (limit != 0 || start > 1) {
		var lastPageStart = (exports.numberOfPages(total, start, limit) - 1) * limit + 1;
		string = '?start='+lastPageStart+'&limit='+limit
	}

	return string;
}

//Get query string for after the uri to the FIRST page.
exports.getPreviousQueryString = function(total, start = 1, limit = 0) {
	var string = '';

	// If start or limit are given
	if (limit != 0 || start > 1) {
		var previousPageStart = (exports.currentPage(total, start, limit) - 2) * limit + 1;
		if (previousPageStart < 0) {
			previousPageStart = 1;
		}
		string = '?start='+previousPageStart+'&limit='+limit
	}

	return string;
}

//Get query string for after the uri to the FIRST page.
exports.getNextQueryString = function(total, start = 1, limit = 0) {
	var string = '';

	// If start or limit are given
	if (limit != 0 || start > 1) {
		var nextPageStart = exports.currentPage(total, start, limit) * limit + 1;
		if (nextPageStart > total) {
			nextPageStart = total;
		}
		string = '?start='+nextPageStart+'&limit='+limit
	}

	return string;
}
