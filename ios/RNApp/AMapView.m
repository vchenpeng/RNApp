#import <React/UIView+React.h>
#import "AMapView.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapView {
  NSMutableDictionary *_markers;
  MAUserLocationRepresentation *_locationStyle;
  BOOL _isBoundsInit;
}

- (instancetype)init {
  _isBoundsInit = NO;
  _markers = [NSMutableDictionary new];
  self = [super init];
  return self;
}

- (void)setFrame:(CGRect)frame {
  if (!_isBoundsInit) {
    [super setFrame:frame];
  }
}

- (void)setBounds:(CGRect)bounds {
  _isBoundsInit = YES;
  [super setBounds:bounds];
}

- (void)setShowsTraffic:(BOOL)shows {
  self.showTraffic = shows;
}

- (void)setLocationEnabled:(BOOL)enabled {
  self.showsUserLocation = enabled;
}

- (void)setShowCompass:(BOOL)enabled {
  self.showsCompass = enabled;
}

- (void)setCoordinate:(CLLocationCoordinate2D)coordinate {
  self.centerCoordinate = coordinate;
}

// 如果在地图未加载的时候调用改方法，需要先将 region 存起来，等地图加载完成再设置
- (void)setRegion:(MACoordinateRegion)region {
  if (self.loaded) {
    super.region = region;
  } else {
    self.initialRegion = region;
  }
}

- (AMapMarker *)getMarker:(id <MAAnnotation>)annotation {
  return _markers[[@(annotation.hash) stringValue]];
}

@end
