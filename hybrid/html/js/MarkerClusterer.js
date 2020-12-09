var BMapLib=window.BMapLib=BMapLib||{};!function(){function g(a){this._markerClusterer=a,this._map=a.getMap(),this._minClusterSize=a.getMinClusterSize(),this._isAverageCenter=a.isAverageCenter(),this._center=null,this._markers=[],this._gridBounds=null,this._isReal=!1,this._clusterMarker=new BMapLib.TextIconOverlay(this._center,this._markers.length,{styles:this._markerClusterer.getStyles()})}var a=function(a,c,d){var e,f,g,h;return c=b(c),e=a.pointToPixel(c.getNorthEast()),f=a.pointToPixel(c.getSouthWest()),e.x+=d,e.y-=d,f.x-=d,f.y+=d,g=a.pixelToPoint(e),h=a.pixelToPoint(f),new BMap.Bounds(h,g)},b=function(a){var b=c(a.getNorthEast().lng,-180,180),d=c(a.getSouthWest().lng,-180,180),e=c(a.getNorthEast().lat,-74,74),f=c(a.getSouthWest().lat,-74,74);return new BMap.Bounds(new BMap.Point(d,f),new BMap.Point(b,e))},c=function(a,b,c){return b&&(a=Math.max(a,b)),c&&(a=Math.min(a,c)),a},d=function(a){return"[object Array]"===Object.prototype.toString.call(a)},e=function(a,b){var f,e,c=-1;if(d(b))if(b.indexOf)c=b.indexOf(a);else for(e=0;f=b[e];e++)if(f===a){c=e;break}return c},f=BMapLib.MarkerClusterer=function(a,b){var c,e,f;a&&(this._map=a,this._markers=[],this._clusters=[],c=b||{},this._gridSize=c["gridSize"]||60,this._maxZoom=c["maxZoom"]||18,this._minClusterSize=c["minClusterSize"]||2,this._isAverageCenter=!1,void 0!=c["isAverageCenter"]&&(this._isAverageCenter=c["isAverageCenter"]),this._styles=c["styles"]||[],e=this,this._map.addEventListener("zoomend",function(){e._redraw()}),this._map.addEventListener("moveend",function(){e._redraw()}),f=c["markers"],d(f)&&this.addMarkers(f))};f.prototype.addMarkers=function(a){for(var b=0,c=a.length;c>b;b++)this._pushMarkerTo(a[b]);this._createClusters()},f.prototype._pushMarkerTo=function(a){var b=e(a,this._markers);-1===b&&(a.isInCluster=!1,this._markers.push(a))},f.prototype.addMarker=function(a){this._pushMarkerTo(a),this._createClusters()},f.prototype._createClusters=function(){var e,d,b=this._map.getBounds(),c=a(this._map,b,this._gridSize);for(d=0;e=this._markers[d];d++)!e.isInCluster&&c.containsPoint(e.getPosition())&&this._addToClosestCluster(e)},f.prototype._addToClosestCluster=function(a){var f,e,h,i,b=4e6,c=null;for(a.getPosition(),e=0;f=this._clusters[e];e++)h=f.getCenter(),h&&(i=this._map.getDistance(h,a.getPosition()),b>i&&(b=i,c=f));c&&c.isMarkerInClusterBounds(a)?c.addMarker(a):(f=new g(this),f.addMarker(a),this._clusters.push(f))},f.prototype._clearLastClusters=function(){for(var b,a=0;b=this._clusters[a];a++)b.remove();this._clusters=[],this._removeMarkersFromCluster()},f.prototype._removeMarkersFromCluster=function(){for(var b,a=0;b=this._markers[a];a++)b.isInCluster=!1},f.prototype._removeMarkersFromMap=function(){for(var b,a=0;b=this._markers[a];a++)b.isInCluster=!1,tmplabel=b.getLabel(),this._map.removeOverlay(b),b.setLabel(tmplabel)},f.prototype._removeMarker=function(a){var b=e(a,this._markers);return-1===b?!1:(tmplabel=a.getLabel(),this._map.removeOverlay(a),a.setLabel(tmplabel),this._markers.splice(b,1),!0)},f.prototype.removeMarker=function(a){var b=this._removeMarker(a);return b&&(this._clearLastClusters(),this._createClusters()),b},f.prototype.removeMarkers=function(a){var c,d,b=!1;for(c=0;c<a.length;c++)d=this._removeMarker(a[c]),b=b||d;return b&&(this._clearLastClusters(),this._createClusters()),b},f.prototype.clearMarkers=function(){this._clearLastClusters(),this._removeMarkersFromMap(),this._markers=[]},f.prototype._redraw=function(){this._clearLastClusters(),this._createClusters()},f.prototype.getGridSize=function(){return this._gridSize},f.prototype.setGridSize=function(a){this._gridSize=a,this._redraw()},f.prototype.getMaxZoom=function(){return this._maxZoom},f.prototype.setMaxZoom=function(a){this._maxZoom=a,this._redraw()},f.prototype.getStyles=function(){return this._styles},f.prototype.setStyles=function(a){this._styles=a,this._redraw()},f.prototype.getMinClusterSize=function(){return this._minClusterSize},f.prototype.setMinClusterSize=function(a){this._minClusterSize=a,this._redraw()},f.prototype.isAverageCenter=function(){return this._isAverageCenter},f.prototype.getMap=function(){return this._map},f.prototype.getMarkers=function(){return this._markers},f.prototype.getClustersCount=function(){var c,b,a=0;for(b=0;c=this._clusters[b];b++)c.isReal()&&a++;return a},g.prototype.addMarker=function(a){var b,c,d,e,f;if(this.isMarkerInCluster(a))return!1;if(this._center?this._isAverageCenter&&(b=this._markers.length+1,c=(this._center.lat*(b-1)+a.getPosition().lat)/b,d=(this._center.lng*(b-1)+a.getPosition().lng)/b,this._center=new BMap.Point(d,c),this.updateGridBounds()):(this._center=a.getPosition(),this.updateGridBounds()),a.isInCluster=!0,this._markers.push(a),e=this._markers.length,e<this._minClusterSize)return this._map.addOverlay(a),!0;if(e===this._minClusterSize)for(f=0;e>f;f++)tmplabel=this._markers[f].getLabel(),this._markers[f].getMap()&&this._map.removeOverlay(this._markers[f]),this._markers[f].setLabel(tmplabel);return this._map.addOverlay(this._clusterMarker),this._isReal=!0,this.updateClusterMarker(),!0},g.prototype.isMarkerInCluster=function(a){if(this._markers.indexOf)return-1!=this._markers.indexOf(a);for(var c,b=0;c=this._markers[b];b++)if(c===a)return!0;return!1},g.prototype.isMarkerInClusterBounds=function(a){return this._gridBounds.containsPoint(a.getPosition())},g.prototype.isReal=function(){return this._isReal},g.prototype.updateGridBounds=function(){var b=new BMap.Bounds(this._center,this._center);this._gridBounds=a(this._map,b,this._markerClusterer.getGridSize())},g.prototype.updateClusterMarker=function(){var b,a,c,d;if(this._map.getZoom()>this._markerClusterer.getMaxZoom())for(this._clusterMarker&&this._map.removeOverlay(this._clusterMarker),a=0;b=this._markers[a];a++)this._map.addOverlay(b);else{if(this._markers.length<this._minClusterSize)return this._clusterMarker.hide(),void 0;this._clusterMarker.setPosition(this._center),this._clusterMarker.setText(this._markers.length),c=this._map,d=this.getBounds(),this._clusterMarker.addEventListener("click",function(){c.setViewport(d)})}},g.prototype.remove=function(){var b,a,c;for(a=0;b=this._markers[a];a++)c=this._markers[a].getLabel(),this._markers[a].getMap()&&this._map.removeOverlay(this._markers[a]),this._markers[a].setLabel(c);this._map.removeOverlay(this._clusterMarker),this._markers.length=0,delete this._markers},g.prototype.getBounds=function(){var c,b,a=new BMap.Bounds(this._center,this._center);for(b=0;c=this._markers[b];b++)a.extend(c.getPosition());return a},g.prototype.getCenter=function(){return this._center}}();