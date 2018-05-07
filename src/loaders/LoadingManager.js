/**
 * @author mrdoob / http://mrdoob.com/
 */

function LoadingManager( onLoad, onProgress, onError ) {

	var scope = this;

	var isLoading = false;
	var itemsLoaded = 0;
	var itemsTotal = 0;
	var urlModifier = undefined;
	var loading = {};

	this.onStart = undefined;
	this.onLoad = onLoad;
	this.onProgress = onProgress;
	this.onError = onError;

	this.itemStart = function ( url, cancelLoading ) {

		itemsTotal ++;

		if ( isLoading === false ) {

			if ( scope.onStart !== undefined ) {

				scope.onStart( url, itemsLoaded, itemsTotal );

			}

		}

		loading[ url ] = {
			cancel: cancelLoading
		}

		isLoading = true;

	};

	this.itemEnd = function ( url ) {

		itemsLoaded ++;

		delete loading[ url ];

		if ( scope.onProgress !== undefined ) {

			scope.onProgress( url, itemsLoaded, itemsTotal );

		}

		if ( itemsLoaded === itemsTotal ) {

			isLoading = false;

			if ( scope.onLoad !== undefined ) {

				scope.onLoad();

			}

		}

	};

	this.itemError = function ( url ) {

		delete loading[ url ];

		if ( scope.onError !== undefined ) {

			scope.onError( url );

		}

	};

	this.resolveURL = function ( url ) {

		if ( urlModifier ) {

			return urlModifier( url );

		}

		return url;

	};

	this.setURLModifier = function ( transform ) {

		urlModifier = transform;
		return this;

	};

	this.cancelLoading = function() {
		for (var url in loading) {
			if (typeof loading[url].cancel === 'function') {
				loading[url].cancel();
			}
		}
		loading = {};
	};
}

var DefaultLoadingManager = new LoadingManager();


export { DefaultLoadingManager, LoadingManager };
