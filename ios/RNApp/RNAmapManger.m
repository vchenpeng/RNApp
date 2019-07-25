#import <React/RCTUIManager.h>
#import "AMapView.h"

#pragma ide diagnostic ignored "OCUnusedClassInspection"
#pragma ide diagnostic ignored "-Woverriding-method-mismatch"

@interface AMapViewManager : RCTViewManager <MAMapViewDelegate>
@end

@implementation AMapViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
  AMapView *mapView = [AMapView new];
  mapView.centerCoordinate = CLLocationCoordinate2DMake(31.282378, 121.353456);
  mapView.zoomLevel = 12;
  mapView.delegate = self;
  return mapView;
}

RCT_EXPORT_VIEW_PROPERTY(locationEnabled, BOOL)
RCT_REMAP_VIEW_PROPERTY(showsCompass, showCompass, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsScale, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsIndoorMap, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsLabels, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsTraffic, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsBuildings, BOOL)
RCT_EXPORT_VIEW_PROPERTY(zoomLevel, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(maxZoomLevel, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(minZoomLevel, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(scrollEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(rotateEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(tiltEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(mapType, MAMapType)
RCT_EXPORT_VIEW_PROPERTY(coordinate, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(limitRegion, MACoordinateRegion)
RCT_EXPORT_VIEW_PROPERTY(region, MACoordinateRegion)
RCT_EXPORT_VIEW_PROPERTY(tilt, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(rotation, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(distanceFilter, CLLocationDistance)
RCT_EXPORT_VIEW_PROPERTY(locationStyle, LocationStyle)

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLongPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLocation, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onStatusChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onStatusChangeComplete, RCTBubblingEventBlock)

- (void)mapView:(AMapView *)mapView didSingleTappedAtCoordinate:(CLLocationCoordinate2D)coordinate {
  if (mapView.onPress) {
    mapView.onPress(@{
                      @"latitude": @(coordinate.latitude),
                      @"longitude": @(coordinate.longitude),
                      });
  }
}

- (void)mapView:(AMapView *)mapView didLongPressedAtCoordinate:(CLLocationCoordinate2D)coordinate {
  if (mapView.onLongPress) {
    mapView.onLongPress(@{
                          @"latitude": @(coordinate.latitude),
                          @"longitude": @(coordinate.longitude),
                          });
  }
}

- (void)mapView:(AMapView *)mapView didUpdateUserLocation:(MAUserLocation *)userLocation updatingLocation:(BOOL)updatingLocation {
  if (mapView.onLocation) {
    mapView.onLocation(@{
                         @"latitude": @(userLocation.coordinate.latitude),
                         @"longitude": @(userLocation.coordinate.longitude),
                         @"accuracy": @((userLocation.location.horizontalAccuracy + userLocation.location.verticalAccuracy) / 2),
                         @"altitude": @(userLocation.location.altitude),
                         @"speed": @(userLocation.location.speed),
                         @"timestamp": @(userLocation.location.timestamp.timeIntervalSince1970),
                         });
  }
}

- (void)mapInitComplete:(AMapView *)mapView {
  mapView.loaded = YES;
  
  // struct 里的值会被初始化为 0，这里以此作为条件，判断 initialRegion 是否被设置过
  // 但实际上经度为 0 是一个合法的坐标，只是考虑到高德地图只在中国使用，就这样吧
  if (mapView.initialRegion.center.latitude != 0) {
    mapView.region = mapView.initialRegion;
  }
}

@end
